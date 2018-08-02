'use strict';

const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const http = require('http');
const fs = require('fs');
//allows us to read stuff off the file system
const app = express();
const server = http.createServer(app);
//takes a request handler function. app receives a req and res object and returns a function that returns
//a request for you.

function getImageList() {
  return fs.readdirSync(path.join(__dirname, 'static/img'));
}

app.set('view engine','pug');
//tells view engine to use pug
app.set('views', path.join(__dirname, 'views'));
//views are located relative to where we are locally

app.use(function(req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline';"
    //content security policy tells browser not to load resources we didnt tell it to load
    //all scripts, images, and styles need to be sourced from self
  );
  next();
});

app.use(serveStatic(path.join(__dirname, 'static')));
//finds out what the request is for and executes the middleware stack for it

app.get('/', (req, res) => {
  res.render('slideshow', {
    images: getImageList()
  });
});

const port = 8080;

server.listen(port, function() {
  console.log(`\n=== Slideshow running on http://localhost:${port} ===\n`);
});
