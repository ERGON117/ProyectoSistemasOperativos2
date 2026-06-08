import { useState, useEffect } from "react";
import "../styles/Welcome.css";

function Welcome({ user }) {
  const [form, setForm] = useState({ username: "", email: "", password_hash: "" });
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      const res = await fetch(`/api/users/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(users.map((u) => (u.id === editing ? updated : u)));
        setEditing(null);
        setForm({ username: "", email: "", password_hash: "" });
        alert("Usuario actualizado");
      } else {
        alert("Error al actualizar usuario");
      }
    } else {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newUser = await res.json();
        setUsers([...users, newUser]);
        setForm({ username: "", email: "", password_hash: "" });
        alert("Usuario creado exitosamente");
      } else {
        alert("Error al crear usuario");
      }
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers(users.filter((u) => u.id !== id));
      alert("Usuario eliminado");
    } else {
      alert("Error al eliminar usuario");
    }
  };

  const startEdit = (u) => {
    setForm({ username: u.username, email: u.email, password_hash: "" });
    setEditing(u.id);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2 className="welcome-title">Bienvenido {user?.username}</h2>
        <p className="welcome-subtitle">Has iniciado sesión correctamente.</p>

        <hr />

        <h3 className="form-title">{editing ? "Editar usuario" : "Agregar nuevo usuario"}</h3>
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="form-input"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password_hash}
            onChange={(e) => setForm({ ...form, password_hash: e.target.value })}
            className="form-input"
          />
          <button type="submit" className="form-button">
            {editing ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
        </form>

        <hr />

        <h3 className="list-title">Usuarios registrados</h3>
        <ul className="user-list">
          {users.map((u) => (
            <li key={u.id} className="user-item">
              <span>
                <strong>{u.username}</strong> - {u.email}
              </span>
              <div className="user-actions">
                <button className="edit-button" onClick={() => startEdit(u)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(u.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Welcome;
