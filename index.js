const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const PORT = require("config").get('PORT');
const morgan = require('morgan');
///connecting to MONGODB
connectDB();

app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});
/// initializing middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/confirmation', require('./api/confirmation'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/locality', require('./api/locality'));
app.use('/api/user', require('./api/user'));
app.use('/api/post', require('./api/post'));
app.use('/api/animals', require('./api/animals'));
app.use('/api/street', require('./api/street'));

if (process.env.NODE_ENV === 'production') {
  ///set Static Folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
