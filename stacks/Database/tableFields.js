import * as sst from "@serverless-stack/resources";

const fields = {
	mailId: sst.TableFieldType.STRING,
	provider: sst.TableFieldType.STRING,
	timestamp: sst.TableFieldType.NUMBER,
	type: sst.TableFieldType.STRING,
	createdAt: sst.TableFieldType.NUMBER,
};

export default fields;