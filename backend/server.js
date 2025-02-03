const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const studentRegister = require('./routes/register/studentregister');
const studentLogin = require('./routes/login/studentLoginRoute');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.options('*', cors());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

mongoose
  .connect(
    'mongodb+srv://taran1508:john1508@cluster1508.q0lfcwg.mongodb.net/PEG?retryWrites=true&w=majority&appName=Cluster1508'
  )
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/register/student', studentRegister);

app.use('/login/student', studentLogin);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.post('/login', (req, res) => {
  const data = req.body;
  console.log('hii', data);
  res.send(data);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
