const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);

exports.suscribe = functions.https.onRequest((request, response) => {
	cors(request, response, function () {
		let token = request.body && request.body.token;
		if (token) {
			admin.messaging().subscribeToTopic([token], 'general')
				.then(function () {
					let notification = {
						"data": {
							"title" : "Bienvenido",
							"body" : "Centraal Academy te recibe"
						}
					};
					return admin.messaging().sendToDevice([token], notification)
				})
				.then(function () {
					response.status(200).end();
				})
				.catch(function (error) {
					response.status(500).end();
					console.error("Hubo un error", error);
				});
		} else {
			response.status(403).send('Bad Request');
		}
	})
});
