const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.get('/api/students', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'data', 'studentdata.json');
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return res.status(500).json({ error: 'Failed to read student data' });
    }
    try {
      const studentsData = JSON.parse(data);
      res.json(studentsData);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
