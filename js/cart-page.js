document.addEventListener("DOMContentLoaded", render);
window.addEventListener("cart:updated", render);

function render() {
  const el = document.getElementById("cartContent");
  if (!el) return;
  const lines = cartLines();

  if (!lines.length) {
    el.innerHTML = `
      <div class="cart-empty">
        <div class="big">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p style="color:var(--text-dim); margin: 10px 0 26px;">Explora el catálogo y añade motos, equipación o recambios.</p>
        <a href="tienda.html" class="btn btn-primary">Ir a la tienda</a>
      </div>`;
    return;
  }

  const rows = lines
    .map(
      (l) => `
    <tr data-line="${l.id}">
      <td>
        <div class="cart-item">
          <div class="thumb">${l.product.icon}</div>
          <div>
            <h4><a href="producto.html?id=${l.id}">${l.product.name}</a></h4>
            <span>${l.product.brand} · ${l.product.categoria}</span>
          </div>
        </div>
      </td>
      <td>${formatPrice(l.product.precio)}</td>
      <td>
        <div class="qty-stepper">
          <button type="button" data-qty-minus="${l.id}">−</button>
          <span>${l.qty}</span>
          <button type="button" data-qty-plus="${l.id}">+</button>
        </div>
      </td>
      <td class="cart-line-total">${formatPrice(l.product.precio * l.qty)}</td>
      <td><button class="cart-remove" data-remove="${l.id}">Quitar</button></td>
    </tr>`
    )
    .join("");

  const total = cartTotal();

  el.innerHTML = `
    <table class="cart-table">
      <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div style="display:flex; justify-content:flex-end; margin-bottom:24px;">
      <span class="cart-remove" id="clearCartBtn" style="font-size:13px;">Vaciar carrito</span>
    </div>
    <div class="cart-summary">
      <div class="row"><span>Subtotal</span><span>${formatPrice(total)}</span></div>
      <div class="row"><span>Envío / recogida</span><span>Se calcula en el pago</span></div>
      <div class="row total"><span>Total</span><span>${formatPrice(total)}</span></div>
      <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:18px;">Tramitar pedido</a>
      <p class="note">Este es un borrador — el pedido no se envía todavía a ningún sistema real.</p>
    </div>`;

  el.querySelectorAll("[data-qty-minus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const line = cartLines().find((l) => l.id === btn.dataset.qtyMinus);
      if (line) updateCartQty(line.id, line.qty - 1);
    });
  });
  el.querySelectorAll("[data-qty-plus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const line = cartLines().find((l) => l.id === btn.dataset.qtyPlus);
      if (line) updateCartQty(line.id, line.qty + 1);
    });
  });
  el.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
  });
  document.getElementById("clearCartBtn")?.addEventListener("click", () => {
    if (confirm("¿Vaciar todo el carrito?")) clearCart();
  });
}
