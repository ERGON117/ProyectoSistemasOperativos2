import { useEffect, useState } from "react";
import { getUsers, createUser } from "../services/api";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password_hash: "" });

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await createUser(form);
    setUsers([...users, newUser]);
    setForm({ username: "", email: "", password_hash: "" });
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.username} - {u.email}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          value={form.password_hash}
          onChange={e => setForm({ ...form, password_hash: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default UsersList;
