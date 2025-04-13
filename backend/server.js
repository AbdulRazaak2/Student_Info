const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));


const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  email: String,
  mob: String,
});

const Student = mongoose.model('Student', studentSchema);


app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error saving student data' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error fetching student data' });
  }
});

app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(student);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error updating student data' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: 'Deleted Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error deleting student data' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
