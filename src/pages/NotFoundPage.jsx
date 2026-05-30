import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <p>Halaman yang Anda cari tidak tersedia.</p>
      <Link to="/">Kembali ke catatan aktif</Link>
    </section>
  );
}

export default NotFoundPage;
