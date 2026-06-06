import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak sama.');
      return;
    }

    setLoading(true);
    const { error } = await register({ name, email, password });
    setLoading(false);

    if (!error) {
      navigate('/login');
    }
  };

  return (
    <section className="auth-page">
      <h1>Daftar</h1>
      <form className="auth-form" onSubmit={onSubmit}>
        <label htmlFor="name">Nama</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />
        <label htmlFor="confirm-password">Konfirmasi Password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />
        {errorMessage && <p className="form-error">{errorMessage}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
      <p className="auth-page__helper">
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
