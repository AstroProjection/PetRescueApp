const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');

///connecting to MONGODB
connectDB();

app.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});
// console.log(__dirname);
/// initializing middleware
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static('uploads'));
// app.use(express.static(path.join(__dirname, 'client', 'public')));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use('/confirmation', require('./api/confirmation'));
app.use('/api/auth', require('./api/auth'));
// app.use('/api/file/', require('./api/file-uploader'));
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
