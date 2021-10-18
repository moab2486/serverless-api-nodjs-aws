import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * req {id}
 * */
export async function main(event){
	const params = {
		TableName: process.env.tableName,

		key: {
			mailId: event.pathParameters.id,
		},
	};

	try{
		const results = await dynamoDb.delete(params).promise();

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