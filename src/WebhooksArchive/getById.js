import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * req {id}
 * */
export async function main(event){
	const formData = decodeURIComponent(event.pathParameters);
	const data = JSON.parse(formData);

	const params = {
		TableName: process.env.tableName,

		key: {
			type: data.id,
		},
	};

	try{
		const results = await dynamoDb.get(params).promise();

		return {
			statusCode: 200,
			message: "succesfully completed",
			body: JSON.stringify(results.Items),
		};
	} catch(err) {
		return err
	}
}