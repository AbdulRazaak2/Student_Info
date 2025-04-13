import { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function StudentForm() {
  const [form, setForm] = useState({ name: '', rollNumber: '', email: '', mob: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/students`, form);
      alert("Student info saved!");
      setForm({ name: '', rollNumber: '', email: '', mob: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      alert("Failed to save student info.");
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to top right, #22d3ee, #3b82f6)', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#1d4ed8', fontSize: '24px', fontWeight: 'bold' }}>Student Information Form</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginTop: '1rem' }}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={inputStyle} />
          <input name="rollNumber" placeholder="Roll Number" value={form.rollNumber} onChange={handleChange} required style={inputStyle} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
          <input name="mob" placeholder="Mobile" value={form.mob} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonStyle = {
  backgroundColor: '#2563eb',
  color: 'white',
  padding: '0.6rem',
  fontWeight: 'bold',
  borderRadius: '6px',
  cursor: 'pointer',
  border: 'none',
};
