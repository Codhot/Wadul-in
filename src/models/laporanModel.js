const db = require('../db'); // koneksi mysql2 yang kamu punya

function createLaporan(data) {
    return db.query(' INSERT INTO laporan (judul, deskripsi, lokasi, foto_url, user_id) VALUES (?, ?, ?, ?, ?)', 
    [data.judul, data.deskripsi, data.lokasi, data.foto_url, data.user_id]);
}

function getAllLaporan(){
    return db.query('SELECT * FROM laporan');
}

function getLaporan(id){
    return db.query('SELECT * FROM laporan WHERE id = ?', [id]);
}

function updateLaporan(id, data){
    return db.query('UPDATE laporan SET judul = ?, deskripsi = ?, lokasi = ?, foto_url = ? WHERE id = ?',
    [data.judul, data.deskripsi, data.lokasi, data.foto_url, id]);
}

function deleteLaporan(id){
    return db.query('DELETE FROM laporan WHERE id = ?', [id]);
}

module.exports = { createLaporan, getAllLaporan, getLaporan, updateLaporan, deleteLaporan };
