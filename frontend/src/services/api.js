// services/api.js
const API_URL = "http://localhost:3000";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function createUser(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function createProduct(product) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}
