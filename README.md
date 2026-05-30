# Aplikasi Catatan Pribadi

Aplikasi Catatan Pribadi adalah Single Page Application berbasis React untuk membuat, membaca, mencari, mengarsipkan, dan menghapus catatan. Aplikasi ini menggunakan data awal dari `src/utils/local-data.js` dan menyimpan perubahan di memori aplikasi.

## Fitur Utama

- Menampilkan daftar catatan aktif berisi judul, tanggal pembuatan, dan isi singkat catatan.
- Menampilkan detail catatan melalui path `/notes/:id`, sehingga halaman detail dapat dibuka langsung dari URL.
- Menambahkan catatan baru melalui halaman `/notes/new`.
- Menghapus catatan dari halaman detail catatan.
- Mengarsipkan catatan aktif dan mengembalikan catatan dari arsip.
- Menampilkan daftar catatan terarsip melalui halaman `/archives`.
- Mencari catatan berdasarkan judul dengan query parameter `?keyword=`.
- Menampilkan pesan kosong saat daftar aktif atau arsip tidak memiliki catatan.
- Menampilkan halaman 404 untuk alamat yang tidak dikenali.

## Alur Penggunaan

1. Buka halaman utama untuk melihat catatan aktif.
2. Gunakan kolom pencarian untuk memfilter catatan berdasarkan judul.
3. Pilih judul catatan untuk membuka detailnya.
4. Dari halaman detail, gunakan tombol arsip untuk memindahkan catatan ke arsip atau tombol hapus untuk menghapus catatan.
5. Buka menu Arsip untuk melihat catatan yang sudah diarsipkan.
6. Gunakan tombol tambah pada halaman utama untuk membuat catatan baru.

## Route Aplikasi

| Route | Fungsi |
| --- | --- |
| `/` | Menampilkan daftar catatan aktif. |
| `/?keyword=react` | Menampilkan catatan aktif yang judulnya memuat kata kunci. |
| `/archives` | Menampilkan daftar catatan terarsip. |
| `/archives?keyword=react` | Menampilkan catatan terarsip yang judulnya memuat kata kunci. |
| `/notes/new` | Menampilkan form tambah catatan baru. |
| `/notes/:id` | Menampilkan detail catatan berdasarkan `id`. |
| route lain | Menampilkan halaman 404. |

## Teknologi

- React 18
- Vite
- React Router DOM
- html-react-parser
- PropTypes

## Struktur Proyek

| Path | Tanggung Jawab |
| --- | --- |
| `src/App.jsx` | Mengatur route, state catatan, dan handler tambah, hapus, arsip, serta batal arsip. |
| `src/index.jsx` | Entry point React dan konfigurasi `BrowserRouter`. |
| `src/pages` | Komponen halaman utama, arsip, tambah catatan, detail catatan, dan 404. |
| `src/components` | Komponen reusable untuk daftar catatan, item catatan, pencarian, dan tombol aksi. |
| `src/utils/local-data.js` | Data awal dan fungsi pengelolaan catatan lokal. |
| `src/utils/index.js` | Helper untuk format tanggal Indonesia. |
| `src/styles/style.css` | Styling global aplikasi. |

## Perilaku Data

Setiap catatan memiliki struktur berikut.

```js
{
  id: 'notes-1',
  title: 'Judul catatan',
  body: 'Isi catatan',
  archived: false,
  createdAt: '2022-04-14T04:27:34.572Z',
}
```

Catatan baru dibuat dengan `id` unik berbasis timestamp, tanggal pembuatan dalam format ISO string, dan status awal `archived: false`. Perubahan catatan hanya disimpan di memori, sehingga data akan kembali ke kondisi awal setelah browser di-refresh.

## Detail Implementasi

- Form tambah catatan memakai controlled component untuk input judul.
- Isi catatan memakai `contentEditable` agar body dapat menyimpan HTML sederhana.
- Body catatan dirender dengan `html-react-parser`.
- Pencarian memakai controlled input dan disimpan pada search parameter agar URL dapat dibagikan.
- Komponen memakai PropTypes untuk memvalidasi bentuk props.
- Navigasi halaman memakai `react-router-dom` dan path parameter untuk detail catatan.

## Menjalankan Proyek

Instal dependency proyek terlebih dahulu, lalu jalankan server pengembangan.

```bash
npm install
npm run dev
```

Membuat build produksi:

```bash
npm run build
```

Meninjau hasil build produksi:

```bash
npm run preview
```

## Verifikasi

Pemeriksaan yang disarankan sebelum pengumpulan:

- Jalankan `npm run build` dan pastikan proses build berhasil.
- Buka halaman utama, arsip, tambah catatan, detail catatan, dan halaman 404.
- Pastikan pencarian aktif pada daftar aktif dan arsip.
- Pastikan catatan baru dapat ditambahkan, diarsipkan, dikembalikan dari arsip, dan dihapus.
