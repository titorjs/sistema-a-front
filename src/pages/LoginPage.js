import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:8080/api/v1/auth/login', form);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('nombre', res.data.nombre);
    navigate('/productos');
  } catch (err) {
    alert('Credenciales inválidas');
  }
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input name="username" placeholder="Usuario" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
