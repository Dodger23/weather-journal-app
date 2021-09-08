// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

const port = 5000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

// Initialize the main project folder
app.use(express.static('website'));
app.use(cors())


// Setup Server
function serverCallBack() {
    console.log('Server is running on : http://127.0.0.1:' + port)
}

/**
 * @description Starting the server
 */
app.listen(port, serverCallBack);

/**
 * @description GET to get last entry from projectData
 */
app.get('/getData', function(req, res) {
    res.send(projectData);
});


/**
 * @description POST function to put request data in projectData
 */
app.post('/addData', function(req, res) {
    let newData = {
        temprature: req.body.temprature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    projectData = newData;
});