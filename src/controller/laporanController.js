const laporan = require('../models/laporanModel');

exports.create = async (req, res) => {
    try {
        const { judul, deskripsi, lokasi, foto_url } = req.body;
        const userId = req.user.id;
        await laporan.createLaporan({ judul, deskripsi, lokasi, foto_url, user_id: userId });
        res.json({ message:'Laporan berhasil dibuat!' });
    } catch (err) {
        res.status(500).json({ error:'Gagal membuat laporan', details:err });
    }
};

exports.getAll = async (req, res) => {
    try {
        const [rows] = await laporan.getAllLaporan();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error:'Gagal mendapatkan laporan', details:err });
    }
};

exports.get = async (req, res) => {
    try {
        const [rows] = await laporan.getLaporan(req.params.id);
        if (rows.length) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message:'Laporan tidak ditemukan!' });
        }
    } catch (err) {
        res.status(500).json({ error:'Gagal menemukan laporan', details:err });
    }
};

exports.update = async (req, res) => {
    try {
        const { judul, deskripsi, lokasi, foto_url } = req.body;
        await laporan.updateLaporan(req.params.id, { judul, deskripsi, lokasi, foto_url });
        res.json({ message:'Laporan berhasil diupdate!' });
    } catch (err) {
        res.status(500).json({ error:'Gagal mengupdate laporan', details:err });
    }
};

exports.delete = async (req, res) => {
    try {
        await laporan.deleteLaporan(req.params.id);
        res.json({ message:'Laporan berhasil dihapus!' });
    } catch (err) {
        res.status(500).json({ error:'Gagal menghapus laporan', details:err });
    }
};

