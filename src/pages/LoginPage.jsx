import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';

function LoginPage() {
  const navigate = useNavigate();
  const { onLoginSuccess } = useAuth();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, data } = await login({ email, password });

    if (!error) {
      const loginResult = await onLoginSuccess(data.accessToken);

      if (!loginResult.error) {
        navigate('/');
      }
    }

    setLoading(false);
  };

  return (
    <section className="auth-page">
      <h1>Masuk</h1>
      <form className="auth-form" onSubmit={onSubmit}>
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
          autoComplete="current-password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
      <p className="auth-page__helper">
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </section>
  );
}

export default LoginPage;
