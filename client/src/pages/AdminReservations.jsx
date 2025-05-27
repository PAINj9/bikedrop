import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet"; 

const estados = ["Todos", "Pendiente", "En progreso", "Completada"];

function prettyDate(dateStr) {
  if (!dateStr) return "-";
  let d;
  if (dateStr.length === 10) {
    d = new Date(dateStr + "T12:00:00Z");
  } else {
    d = new Date(dateStr.replace(" ", "T"));
  }
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "Europe/Copenhagen",
  });
}

function prettyDateTime(dtStr) {
  if (!dtStr) return "-";
  let normalized = dtStr.replace(" ", "T");
  if (!/\d{2}:\d{2}:\d{2}$/.test(normalized)) normalized += ":00";
  const d = new Date(normalized);
  if (isNaN(d)) return dtStr;
  return d.toLocaleString("es-AR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Copenhagen",
  });
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterEstado, setFilterEstado] = useState("Todos");

  const fetchReservations = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const filteredReservations =
    filterEstado === "Todos"
      ? reservations
      : reservations.filter((r) => r.status === filterEstado);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      } else {
        alert("Error al actualizar el estado");
      }
    } catch {
      alert("Error de conexión al servidor");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Querés eliminar esta reserva?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Error al eliminar la reserva");
      }
    } catch {
      alert("Error de conexión al servidor");
    }
  };

  return (
    <>
      <Helmet>
        <title>BikeDrop | Admin</title>
      </Helmet>

      <div className="min-h-screen bg-blue-50 p-6">
        <Navbar />
        <h1 className="text-2xl font-bold text-center mb-6 mt-2">
          Admin - All Reservations
        </h1>

        <div className="max-w-md mx-auto mb-4">
          <label htmlFor="filterEstado" className="mr-2 font-medium">
            Filtrar por estado:
          </label>
          <select
            id="filterEstado"
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {estados.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando reservas...</p>
        ) : filteredReservations.length === 0 ? (
          <p className="text-center text-gray-600">No hay reservas para mostrar.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
              <thead className="bg-blue-100 text-left">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Dirección</th>
                  <th className="px-4 py-2">Piso</th>
                  <th className="px-4 py-2">Ciudad</th>
                  <th className="px-4 py-2">Código Postal</th>
                  <th className="px-4 py-2">Teléfono</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Servicios</th>
                  <th className="px-4 py-2">Nota</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2">Creado</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="border-t hover:bg-blue-50">
                    <td className="px-4 py-2">{res.id}</td>
                    <td className="px-4 py-2">{res.name}</td>
                    <td className="px-4 py-2">{res.address}</td>
                    <td className="px-4 py-2">{res.floor}</td>
                    <td className="px-4 py-2">{res.city}</td>
                    <td className="px-4 py-2">{res.postalCode}</td>
                    <td className="px-4 py-2">{res.phone}</td>
                    <td className="px-4 py-2">{res.email}</td>
                    <td className="px-4 py-2">{prettyDate(res.date)}</td>
                    <td className="px-4 py-2">{res.time}</td>
                    <td className="px-4 py-2">{res.service}</td>
                    <td className="px-4 py-2">{res.note}</td>
                    <td className="px-4 py-2">
                      <select
                        value={res.status}
                        onChange={(e) => handleStatusChange(res.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Completada">Completada</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">{prettyDateTime(res.created_at)}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(res.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
