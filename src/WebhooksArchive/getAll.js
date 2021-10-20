import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(){
	const params = {
		TableName: process.env.tableName,
	};

	try{
		const results = await dynamoDb.query(params).promise();

		return {
			statusCode: 200,
			message: "succesfully completed",
			body: JSON.stringify(results.Items),
		};
	} catch(err) {
		return err;
	}
}