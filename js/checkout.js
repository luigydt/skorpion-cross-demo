document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("checkoutContent");
  const lines = cartLines();

  if (!lines.length) {
    el.innerHTML = `
      <div class="cart-empty">
        <div class="big">🛒</div>
        <h3>No tienes productos en el carrito</h3>
        <p style="color:var(--text-dim); margin: 10px 0 26px;">Añade algo desde la tienda antes de finalizar un pedido.</p>
        <a href="tienda.html" class="btn btn-primary">Ir a la tienda</a>
      </div>`;
    return;
  }

  const total = cartTotal();
  const orderLines = lines
    .map((l) => `<div class="order-line"><span class="name">${l.qty} × ${l.product.name}</span><span>${formatPrice(l.product.precio * l.qty)}</span></div>`)
    .join("");

  el.innerHTML = `
    <div class="checkout-layout">
      <div class="checkout-form-card">
        <h3>Datos de contacto y entrega</h3>
        <form id="checkoutForm">
          <div class="field-row">
            <div class="field"><label>Nombre</label><input type="text" required placeholder="Tu nombre"></div>
            <div class="field"><label>Apellidos</label><input type="text" required placeholder="Tus apellidos"></div>
          </div>
          <div class="field-row">
            <div class="field"><label>Email</label><input type="email" required placeholder="tu@email.com"></div>
            <div class="field"><label>Teléfono</label><input type="tel" required placeholder="600 000 000"></div>
          </div>

          <div class="field">
            <label>Entrega</label>
            <select id="entregaSelect">
              <option value="tienda">Recogida gratis en tienda (C/ Azuela, 56)</option>
              <option value="domicilio">Envío a domicilio</option>
            </select>
          </div>
          <div class="field" id="direccionField">
            <label>Dirección de envío</label>
            <input type="text" placeholder="Calle, número, piso">
          </div>
          <div class="field-row">
            <div class="field"><label>Población</label><input type="text" placeholder="Población"></div>
            <div class="field"><label>Código postal</label><input type="text" placeholder="28400"></div>
          </div>

          <label style="display:block; font-size:12.5px; font-weight:700; letter-spacing:0.4px; text-transform:uppercase; color:var(--text-dim); margin: 22px 0 10px;">Método de pago</label>
          <div class="pay-options">
            <label class="pay-option"><input type="radio" name="pago" value="contrareembolso" checked> Contrareembolso al recoger / recibir</label>
            <label class="pay-option"><input type="radio" name="pago" value="transferencia"> Transferencia bancaria</label>
            <label class="pay-option"><input type="radio" name="pago" value="tarjeta"> Tarjeta (simulada — sin pasarela real)</label>
          </div>

          <button type="submit" class="btn btn-primary btn-block">Confirmar pedido — ${formatPrice(total)}</button>
          <p class="form-note-small">Al confirmar no se realiza ningún cargo real; es solo una maqueta del flujo de compra.</p>
        </form>
      </div>

      <div class="order-summary-card">
        <h3>Resumen del pedido</h3>
        ${orderLines}
        <div class="row"><span>Subtotal</span><span>${formatPrice(total)}</span></div>
        <div class="row"><span>Envío</span><span>Gratis (recogida en tienda)</span></div>
        <div class="row total"><span>Total</span><span>${formatPrice(total)}</span></div>
      </div>
    </div>`;

  document.getElementById("entregaSelect").addEventListener("change", (e) => {
    document.getElementById("direccionField").style.display = e.target.value === "domicilio" ? "block" : "none";
  });
  document.getElementById("direccionField").style.display = "none";

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const orderNum = "SK-" + Math.floor(100000 + Math.random() * 900000);
    document.querySelector(".checkout-layout").outerHTML = `
      <div class="checkout-success">
        <div class="big">✅</div>
        <h2>¡Pedido recibido!</h2>
        <p>Tu número de pedido simulado es <span class="order-num">${orderNum}</span>.<br>
        Te contactaremos para confirmar disponibilidad y forma de entrega.<br>
        <strong>Recuerda: esto es una maqueta, no se ha realizado ningún cobro real.</strong></p>
        <a href="index.html" class="btn btn-primary">Volver al inicio</a>
      </div>`;
    clearCart();
  });
});
