import * as sst from "@serverless-stack/resources";
import fields from "./Database/tableFields";
import routes from "./Api/routes";

export default class MyStack extends sst.Stack {
	constructor(scope, id, props) {
		super(scope, id, props);
		

		// Table schema for storing mail webhooks
		const table = new sst.Table(this, "MailEvent", {
			fields,

			primaryIndex: {partitionKey: "provider", sortKey: "timestamp"}
		});

		//sns setup
		const topic = new sst.Topic(this, "Ordered", {
			subscribers: ["src/Mail/mailEvent.main"],
		});


		// Declaring Http Api endpoint
		const api = new sst.Api(this, "Api", {
			defaultFunctionProps: {
				environment: {
					tableName: table.dynamodbTable.tableName,
					topicArn: topic.snsTopic.topicArn,
				},
			},

			routes
		});


		api.attachPermissions([table, topic]);
				
		this.addOutputs({
			ApiEndpoint: api.url,
		});
	}
}
