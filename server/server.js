const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

app.get('/students', (req, res) => {
  connection.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/student-result', (req, res) => {
  const { hallTicketNumber } = req.body;
  connection.query('SELECT * FROM students WHERE hall_ticket_number = ?', [hallTicketNumber], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
