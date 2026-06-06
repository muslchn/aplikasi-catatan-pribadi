# Aplikasi Catatan Pribadi

Aplikasi Catatan Pribadi adalah Single Page Application berbasis React untuk mengelola catatan pribadi melalui Dicoding Notes API. Aplikasi ini mendukung registrasi, login, proteksi halaman catatan, daftar catatan aktif, daftar arsip, detail catatan, tambah catatan, arsip/batal arsip, hapus catatan, pencarian berdasarkan judul, indikator loading, dan pilihan tema gelap/terang.

## Fitur Utama

- Registrasi pengguna dengan input nama, email, password, dan konfirmasi password.
- Login pengguna dengan email dan password.
- Penyimpanan access token di `localStorage` setelah login berhasil.
- Pengambilan data pengguna terautentikasi dari API dan penampilan nama pengguna pada header.
- Tombol logout untuk menghapus sesi autentikasi dari aplikasi.
- Proteksi halaman catatan sehingga pengguna yang belum login hanya dapat mengakses halaman masuk dan daftar.
- Daftar catatan aktif milik pengguna terautentikasi.
- Daftar catatan arsip milik pengguna terautentikasi.
- Detail catatan berdasarkan `id` dari URL.
- Tambah catatan baru melalui halaman form.
- Hapus catatan dari halaman detail.
- Arsipkan catatan aktif dan kembalikan catatan arsip.
- Pencarian catatan aktif dan arsip berdasarkan judul.
- Penyimpanan kata kunci pencarian pada query parameter `keyword`.
- Indikator loading saat aplikasi, daftar catatan, arsip, detail, login, registrasi, atau penyimpanan catatan sedang diproses.
- Ubah tema gelap/terang menggunakan React Context dan simpan pilihan tema di `localStorage`.
- Halaman 404 untuk route tidak tersedia ketika pengguna sudah login.

## Alur Penggunaan

1. Buka aplikasi dan pilih halaman Daftar untuk membuat akun baru, atau Masuk jika sudah memiliki akun.
2. Setelah login berhasil, aplikasi menyimpan access token dan menampilkan nama pengguna pada header.
3. Halaman utama menampilkan daftar catatan aktif dari API.
4. Gunakan kolom pencarian untuk memfilter catatan berdasarkan judul. Kata kunci akan muncul di URL sebagai `keyword`.
5. Pilih judul catatan untuk membuka halaman detail.
6. Pada halaman detail, gunakan tombol arsip untuk memindahkan catatan ke arsip, tombol kembalikan untuk membatalkan arsip, atau tombol hapus untuk menghapus catatan.
7. Buka menu Arsip untuk melihat catatan yang sudah diarsipkan.
8. Gunakan tombol tambah pada halaman utama untuk membuat catatan baru.
9. Gunakan tombol tema pada header untuk mengganti tema gelap atau terang.
10. Gunakan tombol Keluar untuk mengakhiri sesi.

## Route Aplikasi

| Route | Akses | Fungsi |
| --- | --- | --- |
| `/login` | Publik | Menampilkan form login. Pengguna yang sudah login akan diarahkan ke halaman utama. |
| `/register` | Publik | Menampilkan form registrasi. Pengguna yang sudah login akan diarahkan ke halaman utama. |
| `/` | Terproteksi | Menampilkan daftar catatan aktif. |
| `/?keyword=react` | Terproteksi | Menampilkan catatan aktif yang judulnya cocok dengan kata kunci. |
| `/archives` | Terproteksi | Menampilkan daftar catatan arsip. |
| `/archives?keyword=react` | Terproteksi | Menampilkan catatan arsip yang judulnya cocok dengan kata kunci. |
| `/notes/new` | Terproteksi | Menampilkan form tambah catatan. |
| `/notes/:id` | Terproteksi | Menampilkan detail catatan berdasarkan `id`. |
| Route lain | Terproteksi | Menampilkan halaman 404 jika pengguna sudah login, atau diarahkan ke `/login` jika belum login. |

## Sumber Data

Aplikasi menggunakan RESTful API berikut sebagai sumber data utama.

```text
https://notes-api.dicoding.dev/v1
```

Fungsi transaksi API berada di `src/utils/network-data.js` dan mencakup:

- `register({ name, email, password })`
- `login({ email, password })`
- `getUserLogged()`
- `addNote({ title, body })`
- `getActiveNotes()`
- `getArchivedNotes()`
- `getNote(id)`
- `archiveNote(id)`
- `unarchiveNote(id)`
- `deleteNote(id)`

Setiap request yang membutuhkan autentikasi memakai header `Authorization: Bearer <accessToken>` melalui helper `fetchWithToken`.

## Perilaku Data

Data catatan berasal dari API dan terikat pada akun pengguna yang sedang login. Dengan begitu, daftar catatan, arsip, detail catatan, dan aksi hapus hanya berlaku untuk resource milik pengguna terautentikasi.

Struktur catatan yang digunakan aplikasi mengikuti respons API:

```js
{
  id: 'notes-abc123',
  title: 'Judul catatan',
  body: 'Isi catatan',
  owner: 'user-abc123',
  archived: false,
  createdAt: '2022-07-28T10:12:12.396Z',
}
```

Data yang disimpan di `localStorage`:

- `accessToken` untuk menjaga sesi login.
- `theme` untuk menyimpan pilihan tema `dark` atau `light`.

## Detail Implementasi

- `src/index.jsx` memasang `BrowserRouter`, `ThemeProvider`, dan `AuthProvider` sebelum merender `App`.
- `src/App.jsx` mengatur layout utama, navigasi, tombol tema, status pengguna, logout, proteksi route, dan fallback route.
- `src/contexts/AuthContext.jsx` mengelola status autentikasi, pemulihan sesi dari token, pengambilan data pengguna login, dan logout.
- `src/contexts/ThemeContext.jsx` mengelola tema gelap/terang dengan React Context dan menyimpan preferensi ke `localStorage`.
- `src/pages/LoginPage.jsx` dan `src/pages/RegisterPage.jsx` memakai Hooks untuk controlled form, loading state, submit handler, dan navigasi setelah proses berhasil.
- `src/pages/HomePage.jsx` mengambil catatan aktif dari API, menampilkan loading, dan melakukan pencarian berdasarkan judul.
- `src/pages/ArchivedNotesPage.jsx` mengambil catatan arsip dari API, menampilkan loading, dan melakukan pencarian berdasarkan judul.
- `src/pages/AddNotePage.jsx` mengirim catatan baru ke API dan kembali ke halaman utama setelah berhasil.
- `src/pages/NoteDetailPage.jsx` mengambil detail catatan dari API serta menangani arsip, batal arsip, dan hapus catatan.
- `src/components/NotesList.jsx`, `src/components/NoteItem.jsx`, `src/components/SearchBar.jsx`, dan `src/components/NoteActionButton.jsx` berisi komponen presentasional reusable.
- `src/utils/index.js` menyediakan helper format tanggal Indonesia.
- `src/styles/style.css` menyimpan styling global, layout responsif, state tombol, halaman autentikasi, dan variabel tema.

## Validasi dan UX

- Registrasi membutuhkan nama, email, password minimal 6 karakter, dan konfirmasi password.
- Registrasi menolak submit jika password dan konfirmasi password tidak sama.
- Login membutuhkan email dan password.
- Form tambah catatan tidak mengirim data jika judul dan isi sama-sama kosong setelah dipangkas.
- Judul dan isi catatan dipangkas sebelum dikirim ke API.
- Body catatan memakai `contentEditable` agar pengguna dapat menulis isi catatan dengan format HTML sederhana.
- Isi catatan dirender dengan `html-react-parser`.
- Tombol aksi memakai `aria-label` dan `title` untuk membantu aksesibilitas.
- Tombol yang sedang memproses request dibuat disabled agar pengguna tidak mengirim aksi berulang.
- Daftar kosong menampilkan pesan yang sesuai untuk catatan aktif atau arsip.

## Teknologi

- React 18
- Vite 4
- React Router DOM
- Context API
- React Hooks
- Fetch API
- html-react-parser
- PropTypes
- CSS custom properties

## Struktur Proyek

| Path | Tanggung jawab |
| --- | --- |
| `src/index.jsx` | Entry point React dan pemasangan provider global. |
| `src/App.jsx` | Shell aplikasi, navigasi, proteksi route, dan route utama. |
| `src/contexts/AuthContext.jsx` | State autentikasi, pemulihan sesi, login success, dan logout. |
| `src/contexts/ThemeContext.jsx` | State tema dan persistensi tema. |
| `src/pages` | Halaman login, registrasi, daftar aktif, arsip, tambah catatan, detail, dan 404. |
| `src/components` | Komponen reusable untuk daftar catatan, item catatan, pencarian, dan tombol aksi. |
| `src/utils/network-data.js` | Helper komunikasi dengan Dicoding Notes API. |
| `src/utils/index.js` | Helper format tanggal. |
| `src/styles/style.css` | Styling global dan tema aplikasi. |

## Kebutuhan Sistem

- Node.js versi LTS yang kompatibel dengan Vite 4.
- npm untuk memasang dependency dan menjalankan script proyek.
- Koneksi internet saat menjalankan aplikasi karena data diambil dari Dicoding Notes API.

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

Sebelum dinilai atau dibagikan, pastikan hal berikut berjalan:

- Pengguna dapat melakukan registrasi.
- Pengguna dapat login dan nama pengguna tampil pada header.
- Token tersimpan setelah login dan sesi dapat dipulihkan saat halaman dimuat ulang.
- Tombol logout menghapus sesi dan mengarahkan pengguna kembali ke akses publik.
- Halaman catatan tidak dapat diakses sebelum login.
- Halaman utama menampilkan catatan aktif dari API.
- Halaman arsip menampilkan catatan arsip dari API.
- Detail catatan dapat dibuka dari judul catatan.
- Catatan baru dapat ditambahkan dari halaman `/notes/new`.
- Catatan aktif dapat dipindahkan ke arsip.
- Catatan arsip dapat dikembalikan ke daftar aktif.
- Catatan dapat dihapus dari halaman detail.
- Pencarian bekerja pada halaman aktif dan arsip.
- Tema gelap/terang dapat diganti dan tetap tersimpan setelah halaman dimuat ulang.
- Indikator loading muncul ketika aplikasi atau data catatan sedang dimuat.
- `npm run build` berhasil tanpa error.

## Status Verifikasi

Verifikasi terakhir yang dijalankan:

```bash
npm run build
git diff --check
```
