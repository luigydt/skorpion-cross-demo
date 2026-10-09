/* Tarjeta de producto reutilizable en home, tienda y relacionados */
function productCardHTML(p) {
  const agotado = p.stock === 0;
  const badge = p.badge
    ? `<span class="badge-tag${p.condicion === "Ocasión" ? " ocasion" : ""}">${p.badge}</span>`
    : p.condicion === "Ocasión"
    ? `<span class="badge-tag ocasion">Ocasión</span>`
    : "";
  return `
    <div class="product-card">
      <a href="producto.html?id=${p.id}" aria-label="${p.name}">
        <div class="product-thumb">${agotado ? '<span class="badge-tag agotado">Agotado</span>' : badge}${p.icon}</div>
      </a>
      <div class="product-body">
        <div class="pkind">${p.brand} · ${p.categoria}</div>
        <h3><a href="producto.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-foot">
          <span class="product-price">${formatPrice(p.precio)}${p.precioAntes ? `<span class="old">${formatPrice(p.precioAntes)}</span>` : ""}</span>
          <button class="add-btn" data-add="${p.id}" ${agotado ? "disabled" : ""} aria-label="Añadir ${p.name} al carrito">+</button>
        </div>
      </div>
    </div>`;
}

function bindAddButtons(container) {
  container.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(btn.dataset.add, 1);
      const original = btn.textContent;
      btn.textContent = "✓";
      setTimeout(() => (btn.textContent = original), 900);
    });
  });
}
