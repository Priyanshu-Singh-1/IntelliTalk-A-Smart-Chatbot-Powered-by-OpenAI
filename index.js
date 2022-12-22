// This will be the backend web server

// A express seerver which will handle API request 
// coming in and respond back in JSON. It will use body parser
// as well as cors

//We will import the open.ai for the node package
const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

//Here you have to take care of the credentials, for every user they will have their own
//organization ID - https://beta.openai.com/account/org-settings
//And can make an API key using - https://beta.openai.com/account/api-keys
//Create once api key and paste below

//Make sure to change the configurations, before you run the web server.
const configuration = new Configuration({
        organization: "YOUR_ORGAN_KEY",
        apiKey: "YOUR_API_KEY",
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors())

//Defining the first route

//Asyn will allow the function to run the function without frrzzing the entire program
app.post('/', async(req, res)=>{

        //OpenAI documentation - https://beta.openai.com/docs/api-reference/completions/create?lang=node.js
        
        //This is the message that is passed from the App.js (frontend)
        const {message} = req.body;

        //await is used inside async functions, which makes the program wait until the return resolves.
        const response = await openai.createCompletion({
                model: "text-davinci-003",

                //Here we are basically doing the prompr engineering, 
                //https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
                //This will help the model, on how to answer the questions, that is asked by the user
                prompt: `Pretend you are ELon Musk. Answer with professional and motivational
                content.
                Elon Musk: How can I help you?
                Person: I want to have some motivation.
                Elon Musk: You are amazing, you can create any type of bussiness you want.
                Person: ${message}?
                Elon Musk: `,

                //If you want your answers should be more elaborate, you can change the max_tokens
                //Keep in mind that OpenAI uses credits as per the uses, and the amount will be deducted from the payment method specified.
                max_tokens: 10,
                temperature: 0,
        });
        console.log(response.data)

        //We will fetch the data from the client to server to API

        //When OpenAI comes with the implementation of the above response, it will check for the data
        //We will now choose the choices, and then, we will pass the text inside that choices
        //After quering the API request to the backend, we will show the content in the front end
        if(response.data.choices[0].text){
                res.json({
                        message: response.data.choices[0].text
                }); 
        }       
});

app.listen(port, ()=>{
        console.log('Example app listening')
});
