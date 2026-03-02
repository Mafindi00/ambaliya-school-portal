const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// ✅ Temporary in-memory storage for students
let students = [];

// Register student
app.post('/register', (req, res) => {
  const student = { ...req.body, id: Date.now().toString() };
  students.push(student);
  res.json({ message: "Student registered successfully" });
});

// Get all students (Admin)
app.get('/students', (req, res) => {
  res.json(students);
});

// Delete student
app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id !== req.params.id);
  res.json({ message: "Student deleted successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
