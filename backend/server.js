//App config.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('./config/passportConfig');
//Import Routes
const studentRegister = require('./routes/register/studentregister');
const studentLogin = require('./routes/login/studentLoginRoute');
const investorRegister = require('./routes/register/investorRegisterRoute');
const investorLogin = require('./routes/login/investorLoginRoute');
const companyRegister = require('./routes/register/companyRegisterRoute');
const companyLogin = require('./routes/login/companyLoginRoute');
const jobseekerRegister = require('./routes/register/jobseekerRegisterRoute');
const jobseekerLogin = require('./routes/login/jobseekerLoginRoute');
const founderRegister = require('./routes/register/founderRegisterRouter');
const founderLogin = require('./routes/login/founderLoginRoute');
const studentProfile = require('./routes/profiles/studentProfileRoute');
const investorProfile = require('./routes/profiles/investorProfileRoute');
const companyProfile = require('./routes/profiles/companyProfileRoute');
const jobseekerProfile = require('./routes/profiles/jobseekerProfileRoute');
const founderProfile = require('./routes/profiles/founderProfileRoute');
const oAuthRoutes = require('./routes/oAuthRoutes');
const logOut = require('./routes/logout');
const getHome = require('./routes/home');

//dotenv config.
dotenv.config();

//Initialize APP
const app = express();

//Application Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Log all requests to check if your server is receiving them
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

//Database Connectivity
mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_URI}`)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

//Routes
app.use('/register/student', studentRegister);
app.use('/login/student', studentLogin);
app.use('/profile/student', studentProfile);

app.use('/register/investor', investorRegister);
app.use('/login/investor', investorLogin);
app.use('/profile/investor', investorProfile);

app.use('/register/company', companyRegister);
app.use('/login/company', companyLogin);
app.use('/profile/company', companyProfile);

app.use('/register/jobseeker', jobseekerRegister);
app.use('/login/jobseeker', jobseekerLogin);
app.use('/profile/jobseeker', jobseekerProfile);

app.use('/register/founder', founderRegister);
app.use('/login/founder', founderLogin);
app.use('/profile/founder', founderProfile);

app.use('/logout', logOut);
app.use('/home', getHome);

app.use('/auth', oAuthRoutes);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//Server setup
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
