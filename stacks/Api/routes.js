const routes = {
	"POST    /mails": "src/Mail/newMail.main",
	"POST    /mail-event": "src/Mail/mailEvent.main",
	"GET     /mail": "src/WebhooksArchive/getAll.main",
	"Get     /mail/{id}": "src/WebhooksArchive/getById.main",
	"DELETE  /mail/{id}": "src/WebhooksArchive/deleteWebhookById.main",
};

export default routes;