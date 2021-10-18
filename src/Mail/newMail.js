var Mailgun = require('mailgun-js')

/**
 * req {to, subject, text}
 * */
export async function main(event){
	const data = JSON.parse(event.body)

	const {to, subject, text} = data;

	const mailgun = new Mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.SENDER_EMAIL_DOMAIN});

	const mailBody = {
		from: process.env.EMAIL_FROM,
		to: to, 
		subject: subject,
		text : text
	}

	try{
		mailgun.messages().send(mailBody, function (err, body) {
			if (err) {
				return {
					statusCode: 400,
					message: err
				};
			}else{
				return {
					statusCode: 201,
					message: "succesfully completed",
					body: JSON.stringify(body)
				}
			}
		});
	} catch {
		return{
			statusCode: 400,
			message: 'Bad request'
		}
	}
}