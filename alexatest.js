const express = require("express");
const bodyParser = require("body-parser");
let alexaVerifier = require('alexa-verifier');

var app = express();

app.use(
		bodyParser.urlencoded(
		{ extended: true })
	);
app.use(bodyParser.json());

function requestVerifier(req, res, next) {
  alexaVerifier(
    req.headers.signaturecertchainurl,
    req.headers.signature,
    req.rawBody,
    function verificationCallback(err) {
      if (err) {
        res.status(401).json({
          message: 'Verification Failure',
          error: err
        });
      } else {
        next();
      }
    }
  );
}

app.post('/alexa', requestVerifier, function (req, res) {
	
	var ans;
	var v = req.body.request;
	
	try
	{
		if (v.type === 'LaunchRequest') {
			if(v != null)
			{
				ans = "Greetings! Welcome to test app. How can i assist you?";
				res.json({
						"version": "1.0",
						"response": {
						  "shouldEndSession": false,
						  "outputSpeech": {
							"type": "SSML",
							"ssml": "<speak>" + ans + "</speak>"
						  }
						}
					   });
			}
			else{
				ans = "Can you say again?";
				res.json({
							"version": "1.0",
							"response": {
							  "shouldEndSession": false,
							  "outputSpeech": {
								"type": "SSML",
								"ssml": "<speak>" + ans + "</speak>"
							  }
							}
						   });
			}	
		}
		
		else if (v.type === 'IntentRequest') {
			
			if (v.intent.name == 'onoffac')
			{
				ans = "Okay ac turned on by alexa test";
				res.json({
							"version": "1.0",
							"response": {
							  "shouldEndSession": false,
							  "outputSpeech": {
								"type": "SSML",
								"ssml": "<speak>" + ans + "</speak>"
							  }
							}
						   });
			}
			else if (v.intent.name == 'modechange')
			{
				ans = "Okay mode changed by alexa test";
				res.json({
							"version": "1.0",
							"response": {
							  "shouldEndSession": false,
							  "outputSpeech": {
								"type": "SSML",
								"ssml": "<speak>" + ans + "</speak>"
							  }
							}
						   });
			}
		}
	}
	catch(e)
	{
		ans = "Exception occurred";
				res.json({
							"version": "1.0",
							"response": {
							  "shouldEndSession": false,
							  "outputSpeech": {
								"type": "SSML",
								"ssml": "<speak>" + ans + "</speak>"
							  }
							}
						   });
	}
});

app.listen(process.env.PORT||9879);
console.log('Server running');
	