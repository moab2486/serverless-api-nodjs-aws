import AWS from "aws-sdk";
import * as uuid from "uuid";
const crypto = require('crypto');

const sns = new AWS.SNS();

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * req {provider, timestamp, type}
 * */
export async function main(event){
	const formData = decodeURIComponent(event.body);
	const data = JSON.parse(formData);

	try{
		const value = data.timestamp + data.token;

		const hash = crypto.createHmac('sha256', process.env.MAILGUN_API_KEY).update(value).digest('hex');

		if (hash !== data.signature) {
			return{
				statusCode: 400,
				message: 'Invalid signature'
			}
		} else {
			const params = {
				TableName: process.env.tableName,

				Item: {
					id: uuid.v1(),
					webhooks: JSON.stringify(data),
					createdAt: Date.now()
				},
			};

			try{
				const results = await dynamoDb.post(params).promise();

				await sns.publish({
					TopicArn: process.env.topicArn,
					Message: JSON.stringify({provider: "mailgun", timestamp: data.timestamp, type: data.event}),
					MessageStructure: "string",
				}).promise();

				return {
					statusCode: 201,
					message: "successfully created",
					body: JSON.stringify(results.Items),
				};
			} catch {
				return{
					statusCode: 400,
					message: 'Bad request'
				}
			}
		}
	} catch {
		return{
			statusCode: 400,
			message: 'Bad request'
		}
	}
}
