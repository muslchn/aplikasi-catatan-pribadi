import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';

function RegisterPage() {
  const navigate = useNavigate();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
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
          onChange={onNameChange}
          autoComplete="name"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          autoComplete="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          autoComplete="new-password"
          minLength={6}
          required
        />
        <label htmlFor="confirm-password">Konfirmasi Password</label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
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
