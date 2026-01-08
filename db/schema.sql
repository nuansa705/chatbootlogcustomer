-- Tiket Keluhan Database Schema
-- Generated from Excel Customer Log

-- Drop existing table if exists
DROP TABLE IF EXISTS tiket_keluhan;

-- Create tiket_keluhan table
CREATE TABLE tiket_keluhan (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tanggal DATE NOT NULL,
    kode_tiket TEXT NOT NULL UNIQUE,
    kode_customer TEXT,
    customer TEXT,
    platform TEXT,
    menu TEXT,
    jenis TEXT,
    keluhan_permintaan TEXT,
    lampiran TEXT,
    status_keluhan TEXT,
    remarks TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tanggal ON tiket_keluhan(tanggal);
CREATE INDEX IF NOT EXISTS idx_kode_tiket ON tiket_keluhan(kode_tiket);
CREATE INDEX IF NOT EXISTS idx_kode_customer ON tiket_keluhan(kode_customer);
CREATE INDEX IF NOT EXISTS idx_status_keluhan ON tiket_keluhan(status_keluhan);
CREATE INDEX IF NOT EXISTS idx_created_at ON tiket_keluhan(created_at);
