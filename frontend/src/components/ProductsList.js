import { useState, useEffect } from "react";
import "../styles/Welcome.css"; // reutilizamos los mismos estilos

function ProductsList() {
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  // Cargar productos al montar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      }
    };
    fetchProducts();
  }, []);

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      // Actualizar producto
      const res = await fetch(`/api/products/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(products.map((p) => (p.id === editing ? updated : p)));
        setEditing(null);
        setForm({ name: "", description: "", price: "" });
        alert("Producto actualizado");
      } else {
        alert("Error al actualizar producto");
      }
    } else {
      // Crear producto
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newProduct = await res.json();
        setProducts([...products, newProduct]);
        setForm({ name: "", description: "", price: "" });
        alert("Producto creado exitosamente");
      } else {
        alert("Error al crear producto");
      }
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(products.filter((p) => p.id !== id));
      alert("Producto eliminado");
    } else {
      alert("Error al eliminar producto");
    }
  };

  // Iniciar edición
  const startEdit = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price });
    setEditing(p.id);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2 className="welcome-title">Gestión de productos</h2>
        <p className="welcome-subtitle">Aquí puedes crear, editar y eliminar productos.</p>

        <hr />

        <h3 className="form-title">{editing ? "Editar producto" : "Agregar nuevo producto"}</h3>
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="form-input"
          />
          <button type="submit" className="form-button">
            {editing ? "Actualizar Producto" : "Crear Producto"}
          </button>
        </form>

        <hr />

        <h3 className="list-title">Productos registrados</h3>
        <ul className="user-list">
          {products.map((p) => (
            <li key={p.id} className="user-item">
              <span>
                <strong>{p.name}</strong> - {p.description} - ${p.price}
              </span>
              <div className="user-actions">
                <button className="edit-button" onClick={() => startEdit(p)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductsList;
