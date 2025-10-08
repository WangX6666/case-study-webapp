const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WX20031004wx',
  database: 'case_study_db'
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connection successful');
  }
});

app.get('/api/activities', (req, res) => {
  connection.query('SELECT * FROM activities', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/activities/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM activities WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Activity not found' });
    } else {
      res.json(results[0]);
    }
  });
});

app.listen(PORT, () => {
  console.log(`The server has started, port ${PORT}`);
});
