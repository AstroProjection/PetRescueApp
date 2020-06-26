const express = require('express');
const app = express();
const connectDB = require('./config/db');

///connecting to MONGODB
connectDB();

/// initializing middleware
app.use('/uploads', express.static('uploads'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', require('./api/auth'));
app.use('/api/user', require('./api/user'));
app.use('/api/post', require('./api/post'));
app.use('/api/animals', require('./api/animals'));
app.use('/api/street', require('./api/street'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));
