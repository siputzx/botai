# WhatsApp Bot AI - Baileys + LuminAI

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📖 Deskripsi Proyek

Proyek ini adalah **WhatsApp Bot** yang terintegrasi dengan **Artificial Intelligence (AI)**. Bot ini dikembangkan menggunakan **Baileys** sebagai pustaka untuk berinteraksi dengan WhatsApp Web API dan **LuminAI** sebagai penyedia kecerdasan buatan untuk merespons pesan secara otomatis. Bot ini dapat menjalankan perintah berbasis teks dan bahkan memungkinkan pengguna untuk mengaktifkan mode **AutoAI**, yang memanfaatkan kemampuan AI untuk merespons pesan dengan berbagai layanan seperti **LuminAI**, **DuckDuckGo**, dan **Google Bard**.

## 🚀 Fitur Utama

- **AutoAI Mode**: Bot dapat diaktifkan dalam mode AI otomatis untuk merespons percakapan secara cerdas.
- **Dukungan Berbagai AI**: Memilih AI yang diinginkan, seperti LuminAI, DuckDuckGo, atau Google Bard.
- **Penggunaan Baileys**: Menggunakan pustaka Baileys untuk berinteraksi dengan WhatsApp Web secara langsung.
- **Multi-File Auth**: Mendukung sistem otentikasi multi-file untuk penyimpanan kredensial.
- **Kustomisasi Pesan**: Mengirim balasan pesan otomatis dengan opsi personalisasi.
- **Kelola Grup**: Bot mampu bekerja dalam obrolan pribadi dan grup.

## 🛠️ Instalasi

### Prasyarat

Sebelum menginstal dan menjalankan bot, pastikan Anda memiliki hal-hal berikut:

- **Node.js** v14 atau lebih tinggi
- **npm** atau **yarn** sebagai manajer paket
- WhatsApp yang aktif dengan **QR Code** untuk koneksi
- **API Key LuminAI** atau akun penyedia AI lainnya

### Langkah Instalasi

1. **Clone** repositori ini ke lokal Anda:

   ```bash
   git clone https://github.com/siputzx/botai.git
   cd botai
   ```

2. **Install dependencies** yang diperlukan untuk menjalankan bot:

   ```bash
   npm install
   ```

3. **Setup Konfigurasi**:
   - Siapkan **Session Baileys**. Ketika pertama kali menjalankan bot, **Baileys** akan meminta Anda memindai kode QR untuk menyambungkan akun WhatsApp Anda.
   - Pastikan Anda telah menyiapkan **API Key** dari **LuminAI**, jika Anda memilih menggunakan layanan ini.

4. **Jalankan Bot** dengan perintah berikut:

   ```bash
   node index.js
   ```

5. Pindai **QR Code** yang muncul di terminal Anda menggunakan WhatsApp Anda untuk menghubungkan bot.

6. Bot sekarang siap digunakan! Anda dapat mulai mengirim pesan ke bot dan menggunakan fitur **AutoAI**.

## 📋 Penggunaan

Setelah bot aktif, Anda dapat menggunakan berbagai perintah sebagai berikut:

### Mengaktifkan **AutoAI**:

Untuk mengaktifkan mode AutoAI, gunakan perintah:

```text
.autoai on [bard/duckduckgo/luminai]
```

Contoh: 

```text
.autoai on luminai
```

Bot akan mulai merespons pesan secara otomatis menggunakan **LuminAI**. Jika Anda tidak menggunakan bot selama lebih dari 10 menit, mode AI akan dinonaktifkan secara otomatis.

### Mematikan **AutoAI**:

Untuk mematikan mode AI, gunakan perintah:

```text
.autoai off
```

### Mengirim Pesan Otomatis:

Anda juga dapat mengirim pesan otomatis kepada pengguna atau grup menggunakan fitur built-in. Bot akan membalas dengan teks yang telah dikonfigurasi.

### Mengelola Grup:

Bot dapat mengelola pesan grup dan merespons secara otomatis berdasarkan konfigurasi.

### Mendownload Media:

Jika pesan berisi gambar, video, atau dokumen, Anda dapat mengunduh konten tersebut dengan fungsi **downloadMediaMessage** yang disediakan.

## 📄 Struktur Proyek

- `index.js`: File utama yang berisi logika bot, termasuk koneksi WhatsApp dan pengelolaan pesan.
- `session/`: Direktori penyimpanan kredensial otentikasi multi-file.
- `node_modules/`: Direktori yang berisi semua dependensi yang diinstall melalui npm.
- `package.json`: File konfigurasi npm untuk mengelola dependensi proyek.

## ⚙️ Konfigurasi

### Menyesuaikan AI

Anda dapat menyesuaikan **AutoAI** dengan memilih penyedia AI yang diinginkan dalam file `index.js` pada bagian perintah:

```js
const aiChoice = args[1] ? args[1].toLowerCase() : 'luminai';
if (!['bard', 'duckduckgo', 'luminai'].includes(aiChoice)) {
    return reply('Pilih AI yang valid: bard, duckduckgo, atau luminai');
}
```

AI yang tersedia:
- **LuminAI** (default)
- **DuckDuckGo**
- **Google Bard**

Anda juga dapat menambahkan penyedia AI baru dengan memperluas bagian ini dan melakukan request ke API mereka.

### Otomatisasi dan Timeout

Bot akan secara otomatis menonaktifkan **AutoAI** setelah 10 menit tidak ada aktivitas untuk mencegah penggunaan sumber daya yang tidak perlu. Timer ini dapat diubah dalam interval yang ditentukan di kode.

```js
setInterval(async () => {
    if (ptz.ai && ptz.ai[m.sender]) {
        const now = Date.now();
        const lastActive = ptz.ai[m.sender].lastactive;
        if (now - lastActive > 10 * 1000) {
            delete ptz.ai[m.sender];
            await reply('[ ✓ ] AutoAI dinonaktifkan otomatis karena tidak digunakan selama 10 menit.');
        }
    }
}, 1000);
```

## 🧪 Pengujian

Untuk menguji fitur bot ini, Anda dapat menggunakan WhatsApp pribadi atau grup yang Anda kelola. Kirim pesan dengan perintah yang tersedia, dan lihat respons dari bot secara langsung.

Pastikan untuk memeriksa kembali setiap respon AI apakah sesuai dengan ekspektasi, terutama saat menggunakan berbagai penyedia AI.

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi dari siapa pun. Jika Anda ingin berkontribusi, silakan buat **Pull Request** atau laporkan masalah melalui **Issues** di GitHub. Berikut langkah kontribusi yang bisa diikuti:

1. Fork repositori ini.
2. Buat branch baru: `git checkout -b feature/nama-fitur`.
3. Lakukan perubahan.
4. Push branch ke repo Anda.
5. Buat **Pull Request** ke repositori utama.

## ⚠️ Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT**. Silakan baca file [LICENSE](LICENSE) untuk detail lebih lanjut.

## 📞 Dukungan

Jika Anda membutuhkan bantuan atau memiliki pertanyaan mengenai proyek ini, jangan ragu untuk menghubungi kami melalui fitur **Issues** di GitHub, atau langsung menghubungi melalui email: [siputzx@gmail.com](mailto:siputzx@gmail.com).
