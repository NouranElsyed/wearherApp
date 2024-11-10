
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('website'));

// App API endpoint
projectData = {};


const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.get('/all', (req, res) => {
    res.send(projectData);
  });
  app.post('/add', (req, res) => {
    projectData = {
      date: req.body.date,
      temp: req.body.temp,
      feel: req.body.feel,
      cityName: req.body.cityName,
      iconUrl: req.body.iconUrl
    };
    res.send(projectData);
  });
