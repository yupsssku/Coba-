const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
// Middleware untuk file statis
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint untuk konfigurasi API
app.get('/api-config.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`
        // --- KONFIGURASI API ---
        window.API_KEY = "ftS3uUCMOz71uxhWp9MsVQchbBNQXLOcLJpkQW1W9aQgQkHW7bV54P6fKeWrzIWJf44nuuUhPTMQHY8lCtslMfez";//ganti apikey kamu
        window.API_BASE_URL = "https://atlantich2h.com";//Jangan diganti kalau gamau error
        window.NOMOR_WHATSAPP = "6289525036410";//ganti no wa cs. no wa ini berfungsi untuk method pembayaran lain
    `);
});

// Route khusus untuk halaman produk
app.get('/product/games/freefire', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'freefire', 'index.html'));
});

app.get('/product/games/mobilelegends', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'mobilelegends', 'index.html'));
});

// Redirect untuk URL yang salah
app.get('/freefire', (req, res) => {
    res.redirect('/product/games/freefire');
});

app.get('/mobilelegends', (req, res) => {
    res.redirect('/product/games/mobilelegends');
});

// Handler untuk halaman utama (root)
app.get('/', (req, res) => {
    // Jika ada index.html di public, akan otomatis dilayani oleh express.static
    // Tapi kita bisa tambahkan custom logic di sini jika perlu
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 Handler - HARUS di paling akhir
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Error handler untuk server errors (500)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

// Ekspor app untuk Vercel
module.exports = app;
