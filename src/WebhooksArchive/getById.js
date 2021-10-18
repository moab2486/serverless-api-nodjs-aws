import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * req {id}
 * */
export async function main(event){
	const params = {
		TableName: process.env.tableName,

		key: {
			type: event.pathParameters.id,
		},
	};

	try{
		const results = await dynamoDb.get(params).promise();

		return {
			statusCode: 200,
			message: "succesfully completed",
			body: JSON.stringify(results.Items),
		};
	} catch {
		return{
			statusCode: 400,
			message: 'Bad request'
		}
	}
}