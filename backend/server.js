const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const studentRegister = require('./routes/register/studentregister');
const studentLogin = require('./routes/login/studentLoginRoute');
const investorRegister = require('./routes/register/investorRegisterRoute');
const investorLogin = require('./routes/login/investorLoginRoute');
const companyRegister = require('./routes/register/companyRegisterRoute');
const companyLogin = require('./routes/login/companyLoginRoute');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.options('/register/investor', cors());
// Log all requests to check if your server is receiving them
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

mongoose
  .connect(
    `mongodb+srv://taran1508:john1508@cluster1508.q0lfcwg.mongodb.net/PEG?retryWrites=true&w=majority&appName=Cluster1508`
  )
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/register/student', studentRegister);
app.use('/login/student', studentLogin);

app.use('/register/investor', investorRegister);
app.use('/login/investor', investorLogin);

app.use('/register/company', companyRegister);
app.use('/login/company', companyLogin);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
