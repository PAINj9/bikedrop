const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("reservations.db");

// Crear tabla con created_at en formato texto (hora Dinamarca)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      address TEXT,
      floor TEXT,
      city TEXT,
      postalCode TEXT,
      phone TEXT,
      email TEXT,
      date TEXT,
      time TEXT,
      service TEXT,
      note TEXT,
      status TEXT DEFAULT 'Pendiente',
      created_at TEXT
    )
  `, (err) => {
    if (err) {
      console.error("Error creando la tabla:", err);
    } else {
      console.log("Tabla 'reservations' lista.");
    }
  });
});

// POST - Crear nueva reserva
app.post("/api/reservations", (req, res) => {
  const {
    name, address, floor, city, postalCode,
    phone, email, date, time, service, note
  } = req.body;

  if (!name || !address || !city || !phone || !email || !date || !time || !service) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Comprobar si ya hay una reserva en ese día y horario
  db.get(
    `SELECT * FROM reservations WHERE date = ? AND time = ?`,
    [date, time],
    (err, row) => {
      if (err) {
        console.error("Error DB al chequear duplicados:", err);
        return res.status(500).json({ error: "DB error" });
      }
      if (row) {
        // Ya existe esa reserva
        return res.status(400).json({ error: "Ese horario ya está reservado. Elegí otro." });
      }

      // Obtener fecha y hora actual en Dinamarca (Europe/Copenhagen)
      const nowDK = new Date().toLocaleString("sv-SE", {
        timeZone: "Europe/Copenhagen",
        hour12: false,
      }); // "2025-05-27 18:08:45"
      const created_at = nowDK.replace(",", "");

      db.run(
        `INSERT INTO reservations
        (name, address, floor, city, postalCode, phone, email, date, time, service, note, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, address, floor, city, postalCode, phone, email, date, time, service, note, created_at],
        function (err) {
          if (err) {
            console.error("Error DB al insertar reserva:", err);
            return res.status(500).json({ error: "DB error" });
          }
          res.status(201).json({ success: true, id: this.lastID });
        }
      );
    }
  );
});

// GET - Obtener todas las reservas
app.get("/api/reservations", (req, res) => {
  db.all(`SELECT * FROM reservations ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      console.error("Error DB al obtener reservas:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(rows);
  });
});

// PUT - Actualizar estado de una reserva
app.put("/api/reservations/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Missing status" });
  }

  db.run(
    `UPDATE reservations SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (err) {
        console.error("Error DB al actualizar estado:", err);
        return res.status(500).json({ error: "DB error" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Reservation not found" });
      }

      res.json({ success: true });
    }
  );
});

// DELETE - Eliminar reserva por id
app.delete("/api/reservations/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM reservations WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        console.error("Error DB al eliminar reserva:", err);
        return res.status(500).json({ error: "DB error" });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Reservation not found" });
      }

      res.json({ success: true });
    }
  );
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
