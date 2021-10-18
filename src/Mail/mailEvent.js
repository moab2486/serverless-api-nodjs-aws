import AWS from "aws-sdk";
import * as uuid from "uuid";
const crypto = require('crypto');

const sns = new AWS.SNS();

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * req {provider, timestamp, type}
 * */
export async function main(event){
	const data = JSON.parse(event.body);

	const {provider, timestamp, type} = data;

	try{
		const value = data.timestamp+data.token;

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
					mailId: uuid.v1(),
					provider: provider,
					timestamp: timestamp,
					type: type,
					createdAt: Date.now()
				},
			};

			try{
				const results = await dynamoDb.post(params).promise();

				await sns.publish({
					TopicArn: process.env.topicArn,
					Message: JSON.stringify(process.env.SNS_MSSG),
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
