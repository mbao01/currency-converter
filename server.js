/**
 * Simple HTTP Server
 * Author: Check Annotation
 */

const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use('/', express.static(path.join(__dirname, process.env.BUILD_DIR)));

app.listen(process.env.PORT, function () {
    console.log('Server listening on port ' + process.env.PORT);
});