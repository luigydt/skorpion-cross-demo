document.addEventListener("DOMContentLoaded", () => {
  const detail = document.getElementById("productDetail");
  const related = document.getElementById("relatedGrid");
  const breadcrumbs = document.getElementById("breadcrumbs");
  const id = new URLSearchParams(location.search).get("id");
  const p = findProduct(id);

  if (!p) {
    detail.innerHTML = `
      <div class="empty-state">
        <div class="big">🔧</div>
        <h3>Producto no encontrado</h3>
        <p>Puede que el enlace esté mal o que ya no esté disponible.</p>
        <br><a href="tienda.html" class="btn btn-primary">Volver a la tienda</a>
      </div>`;
    return;
  }

  document.title = `${p.name} — Skorpion Cross`;
  breadcrumbs.innerHTML = `<a href="index.html">Inicio</a><span>/</span><a href="tienda.html">Tienda</a><span>/</span><a href="tienda.html?categoria=${encodeURIComponent(p.categoria)}">${p.categoria}</a><span>/</span>${p.name}`;

  const agotado = p.stock === 0;
  const specsRows = Object.entries(p.specs || {})
    .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
    .join("");

  detail.innerHTML = `
    <div class="product-detail">
      <div class="pd-gallery">${p.icon}</div>
      <div>
        <div class="pd-kind">${p.brand} · ${p.categoria}${p.condicion ? " · " + p.condicion : ""}</div>
        <h1 class="pd-title">${p.name}</h1>
        <div class="pd-price-row">
          <span class="pd-price">${formatPrice(p.precio)}</span>
          ${p.precioAntes ? `<span class="pd-price-old">${formatPrice(p.precioAntes)}</span>` : ""}
        </div>
        <div class="pd-stock ${agotado ? "out" : "in"}">${agotado ? "✕ Agotado" : `✓ Disponible (${p.stock} uds.)`}</div>
        <p class="pd-desc">${p.desc}</p>
        ${specsRows ? `<table class="pd-specs">${specsRows}</table>` : ""}

        <div class="qty-row">
          <div class="qty-stepper">
            <button type="button" id="qtyMinus">−</button>
            <span id="qtyValue">1</span>
            <button type="button" id="qtyPlus">+</button>
          </div>
          <button class="btn btn-primary" id="addToCartBtn" ${agotado ? "disabled" : ""}>
            ${agotado ? "No disponible" : "Añadir al carrito"}
          </button>
        </div>
        <a href="index.html#contacto" class="btn btn-outline btn-block">Consultar por teléfono o WhatsApp</a>
      </div>
    </div>`;

  let qty = 1;
  const qtyValue = document.getElementById("qtyValue");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    qty = Math.min(p.stock || 99, qty + 1);
    qtyValue.textContent = qty;
  });
  document.getElementById("addToCartBtn")?.addEventListener("click", (e) => {
    addToCart(p.id, qty);
    e.target.textContent = "✓ Añadido al carrito";
    setTimeout(() => (e.target.textContent = "Añadir al carrito"), 1200);
  });

  const relatedItems = PRODUCTS.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);
  if (relatedItems.length) {
    related.innerHTML = relatedItems.map(productCardHTML).join("");
    bindAddButtons(related);
  } else {
    document.querySelector(".pd-related").style.display = "none";
  }
});
