# Aplikasi Catatan Pribadi

Aplikasi Catatan Pribadi adalah Single Page Application berbasis React untuk mengelola catatan sederhana. Pengguna dapat melihat daftar catatan aktif, membuka detail catatan, menambahkan catatan baru, mengarsipkan atau mengembalikan catatan, menghapus catatan, dan mencari catatan berdasarkan judul.

Data awal aplikasi berasal dari `src/utils/local-data.js`. Perubahan data berjalan di memori aplikasi, sehingga catatan yang ditambahkan, dihapus, atau dipindahkan ke arsip akan kembali ke data awal setelah halaman dimuat ulang.

## Fitur Utama

- Menampilkan daftar catatan aktif pada halaman utama.
- Menampilkan daftar catatan arsip pada halaman khusus arsip.
- Membuka detail catatan berdasarkan `id` dari URL.
- Menambahkan catatan baru melalui halaman form.
- Menghapus catatan dari halaman detail.
- Mengarsipkan catatan aktif dan mengembalikan catatan dari arsip.
- Mencari catatan aktif dan arsip berdasarkan judul.
- Menyimpan kata kunci pencarian pada query parameter `keyword`.
- Menampilkan pesan daftar kosong ketika hasil catatan tidak tersedia.
- Menampilkan halaman 404 untuk route yang tidak dikenali.

## Alur Penggunaan

1. Buka halaman utama untuk melihat catatan aktif.
2. Gunakan kolom pencarian untuk memfilter catatan berdasarkan judul.
3. Pilih judul catatan untuk membuka halaman detail.
4. Pada halaman detail, gunakan tombol arsip untuk memindahkan catatan ke arsip atau tombol hapus untuk menghapus catatan.
5. Buka menu Arsip untuk melihat catatan yang sudah diarsipkan.
6. Dari detail catatan arsip, gunakan tombol kembalikan untuk memindahkan catatan ke daftar aktif.
7. Gunakan tombol tambah pada halaman utama untuk membuat catatan baru.

## Route Aplikasi

| Route | Fungsi |
| --- | --- |
| `/` | Menampilkan daftar catatan aktif. |
| `/?keyword=react` | Menampilkan catatan aktif yang judulnya cocok dengan kata kunci. |
| `/archives` | Menampilkan daftar catatan yang diarsipkan. |
| `/archives?keyword=react` | Menampilkan catatan arsip yang judulnya cocok dengan kata kunci. |
| `/notes/new` | Menampilkan form tambah catatan. |
| `/notes/:id` | Menampilkan detail catatan berdasarkan `id`. |
| Route lain | Menampilkan halaman 404. |

## Teknologi

- React 18
- Vite
- React Router DOM
- html-react-parser
- PropTypes

## Struktur Proyek

| Path | Tanggung jawab |
| --- | --- |
| `src/index.jsx` | Entry point React, memasang `BrowserRouter`, dan memuat stylesheet global. |
| `src/App.jsx` | Mengatur layout utama, navigasi, route, state catatan, dan handler perubahan data. |
| `src/pages/HomePage.jsx` | Menampilkan daftar catatan aktif, pencarian, dan tombol tambah catatan. |
| `src/pages/ArchivedNotesPage.jsx` | Menampilkan daftar catatan arsip dan pencarian arsip. |
| `src/pages/AddNotePage.jsx` | Menampilkan form tambah catatan baru. |
| `src/pages/NoteDetailPage.jsx` | Menampilkan detail catatan serta aksi arsip, kembalikan, dan hapus. |
| `src/pages/NotFoundPage.jsx` | Menampilkan halaman fallback untuk route yang tidak tersedia. |
| `src/components` | Berisi komponen reusable untuk daftar catatan, item catatan, pencarian, dan tombol aksi. |
| `src/utils/local-data.js` | Berisi data awal dan fungsi operasi catatan lokal. |
| `src/utils/index.js` | Berisi helper format tanggal Indonesia. |
| `src/styles/style.css` | Berisi styling global aplikasi. |

## Perilaku Data

Setiap catatan memiliki struktur data berikut.

```js
{
  id: 'notes-1',
  title: 'Judul catatan',
  body: 'Isi catatan',
  createdAt: '2022-04-14T04:27:34.572Z',
  archived: false,
}
```

Operasi data yang tersedia:

- `getAllNotes()` mengambil seluruh catatan.
- `getActiveNotes()` mengambil catatan yang belum diarsipkan.
- `getArchivedNotes()` mengambil catatan yang sudah diarsipkan.
- `addNote({ title, body })` membuat catatan baru dengan `id` berbasis timestamp, `createdAt` baru, dan `archived: false`.
- `deleteNote(id)` menghapus catatan berdasarkan `id`.
- `archiveNote(id)` memindahkan catatan aktif ke arsip.
- `unarchiveNote(id)` mengembalikan catatan arsip ke daftar aktif.

## Detail Implementasi

- Routing memakai `react-router-dom` dengan `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useNavigate`, `useParams`, dan `useSearchParams`.
- Halaman utama hanya menerima catatan aktif dari `App.jsx`; halaman arsip hanya menerima catatan berstatus `archived`.
- Pencarian dilakukan berdasarkan judul catatan secara case-insensitive.
- Kata kunci pencarian disimpan pada URL agar halaman hasil pencarian dapat dibuka ulang atau dibagikan.
- Form tambah catatan memakai controlled state untuk judul dan body.
- Body catatan memakai `contentEditable` agar pengguna dapat menulis isi catatan dengan format HTML sederhana.
- Isi catatan dirender dengan `html-react-parser`.
- Tombol aksi menggunakan `aria-label` dan `title` agar lebih mudah dipahami oleh pembaca layar dan pengguna keyboard.
- Bentuk props divalidasi dengan PropTypes pada komponen yang menerima data atau handler.

## Validasi Form

- Catatan tidak akan disimpan jika judul dan isi sama-sama kosong setelah dipangkas.
- Judul dan isi catatan dipangkas sebelum dikirim ke fungsi tambah catatan.
- Jika judul kosong tetapi isi tersedia, data lokal akan menggunakan judul bawaan `(untitled)`.

## Kebutuhan Sistem

- Node.js versi LTS yang kompatibel dengan Vite 4.
- npm untuk memasang dependency dan menjalankan script proyek.

## Menjalankan Proyek

Pasang dependency:

```bash
npm install
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buat build produksi:

```bash
npm run build
```

Tinjau build produksi secara lokal:

```bash
npm run preview
```

## Checklist Pemeriksaan

Sebelum dinilai atau dibagikan, pastikan hal berikut sudah berjalan:

- Halaman utama menampilkan daftar catatan aktif.
- Halaman arsip menampilkan daftar catatan arsip.
- Detail catatan dapat dibuka dari judul catatan.
- Catatan baru dapat ditambahkan dari halaman `/notes/new`.
- Catatan dapat dihapus dari halaman detail.
- Catatan aktif dapat dipindahkan ke arsip.
- Catatan arsip dapat dikembalikan ke daftar aktif.
- Pencarian bekerja pada halaman aktif dan arsip.
- Route yang tidak dikenali menampilkan halaman 404.
- `npm run build` berhasil tanpa error.

## Status Verifikasi

Verifikasi terakhir yang dijalankan:

```bash
npm run build
git diff --check
```
