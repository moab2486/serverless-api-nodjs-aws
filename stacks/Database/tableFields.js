import * as sst from "@serverless-stack/resources";

const fields = {
	id: sst.TableFieldType.STRING,
	webhooks: sst.TableFieldType.STRING,
	createdAt: sst.TableFieldType.NUMBER,
};

export default fields;