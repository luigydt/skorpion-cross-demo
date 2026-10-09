document.addEventListener("DOMContentLoaded", () => {
  const filtersPanel = document.getElementById("filtersPanel");
  const grid = document.getElementById("productGrid");
  const chipsBox = document.getElementById("activeChips");
  const countEl = document.getElementById("resultCount");
  const sortSelect = document.getElementById("sortSelect");
  const filtersTrigger = document.getElementById("filtersTrigger");
  const filtersCountBadge = document.getElementById("filtersCount");
  const filtersOverlay = document.getElementById("filtersOverlay");
  const filtersDrawer = document.getElementById("filtersDrawer");
  const filtersClose = document.getElementById("filtersClose");

  const SECTION_LABELS = { motos: "Motos", equipacion: "Equipación", recambios: "Recambios" };

  const state = readStateFromURL();
  sortSelect.value = state.sort;

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    writeStateToURL();
    render();
  });

  const openDrawer = () => {
    filtersOverlay.classList.add("open");
    filtersTrigger.setAttribute("aria-expanded", "true");
  };
  const closeDrawer = () => {
    filtersOverlay.classList.remove("open");
    filtersTrigger.setAttribute("aria-expanded", "false");
  };
  filtersTrigger.addEventListener("click", openDrawer);
  filtersClose.addEventListener("click", closeDrawer);
  filtersOverlay.addEventListener("click", (e) => {
    if (e.target === filtersOverlay) closeDrawer();
  });

  render();

  function readStateFromURL() {
    const p = new URLSearchParams(location.search);
    return {
      seccion: p.get("seccion") || "",
      categorias: new Set((p.get("categoria") || "").split(",").filter(Boolean)),
      marcas: new Set((p.get("marca") || "").split(",").filter(Boolean)),
      condiciones: new Set((p.get("condicion") || "").split(",").filter(Boolean)),
      sort: p.get("sort") || "relevancia",
    };
  }

  function writeStateToURL() {
    const p = new URLSearchParams();
    if (state.seccion) p.set("seccion", state.seccion);
    if (state.categorias.size) p.set("categoria", [...state.categorias].join(","));
    if (state.marcas.size) p.set("marca", [...state.marcas].join(","));
    if (state.condiciones.size) p.set("condicion", [...state.condiciones].join(","));
    if (state.sort !== "relevancia") p.set("sort", state.sort);
    const qs = p.toString();
    history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
  }

  function matches(p, exclude) {
    if (state.seccion && p.section !== state.seccion) return false;
    if (exclude !== "categoria" && state.categorias.size && !state.categorias.has(p.categoria)) return false;
    if (exclude !== "marca" && state.marcas.size && !state.marcas.has(p.brand)) return false;
    if (exclude !== "condicion" && state.condiciones.size && !state.condiciones.has(p.condicion)) return false;
    return true;
  }

  function countBy(field, exclude) {
    const map = new Map();
    PRODUCTS.filter((p) => matches(p, exclude)).forEach((p) => {
      const val = p[field];
      if (!val) return;
      map.set(val, (map.get(val) || 0) + 1);
    });
    return map;
  }

  function sortProducts(list) {
    const arr = [...list];
    if (state.sort === "precio-asc") arr.sort((a, b) => a.precio - b.precio);
    else if (state.sort === "precio-desc") arr.sort((a, b) => b.precio - a.precio);
    else if (state.sort === "nombre-asc") arr.sort((a, b) => a.name.localeCompare(b.name));
    else arr.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0));
    return arr;
  }

  function toggleSetValue(set, value) {
    if (set.has(value)) set.delete(value);
    else set.add(value);
  }

  function render() {
    renderFilters();
    renderChips();
    const activeCount = (state.seccion ? 1 : 0) + state.categorias.size + state.marcas.size + state.condiciones.size;
    filtersCountBadge.textContent = activeCount;
    filtersCountBadge.hidden = activeCount === 0;
    filtersTrigger.classList.toggle("has-active", activeCount > 0);

    const results = sortProducts(PRODUCTS.filter((p) => matches(p, null)));
    countEl.textContent = `${results.length} producto${results.length === 1 ? "" : "s"}`;

    grid.innerHTML = results.length
      ? results.map(productCardHTML).join("")
      : `<div class="empty-state">
           <h3>No hay productos con estos filtros</h3>
           <p>Prueba a quitar alguno de los filtros activos.</p>
         </div>`;
    bindAddButtons(grid);
  }

  function renderChips() {
    const chips = [];
    if (state.seccion) chips.push({ label: SECTION_LABELS[state.seccion], onRemove: () => (state.seccion = "") });
    state.categorias.forEach((c) => chips.push({ label: c, onRemove: () => state.categorias.delete(c) }));
    state.marcas.forEach((m) => chips.push({ label: m, onRemove: () => state.marcas.delete(m) }));
    state.condiciones.forEach((c) => chips.push({ label: c, onRemove: () => state.condiciones.delete(c) }));

    chipsBox.innerHTML = chips
      .map((c, i) => `<span class="chip" data-chip="${i}">${c.label}<button aria-label="Quitar filtro">✕</button></span>`)
      .join("");

    chipsBox.querySelectorAll("[data-chip]").forEach((el, i) => {
      el.querySelector("button").addEventListener("click", () => {
        chips[i].onRemove();
        writeStateToURL();
        render();
      });
    });
  }

  function renderFilters() {
    const sectionCounts = countBy("section", "seccion");
    const categoriaCounts = countBy("categoria", "categoria");
    const marcaCounts = countBy("brand", "marca");
    const condicionCounts = countBy("condicion", "condicion");

    let html = `
      <h3>Filtros</h3>
      <div class="facet-group">
        <h4>Sección</h4>
        <label class="facet-option">
          <span class="fname"><input type="radio" name="seccion" ${!state.seccion ? "checked" : ""} data-seccion=""> Todo</span>
        </label>
        ${Object.entries(SECTION_LABELS)
          .map(
            ([key, label]) => `
          <label class="facet-option${!sectionCounts.get(key) && state.seccion !== key ? " disabled" : ""}">
            <span class="fname"><input type="radio" name="seccion" ${state.seccion === key ? "checked" : ""} data-seccion="${key}"> ${label}</span>
            <span class="fcount">${sectionCounts.get(key) || 0}</span>
          </label>`
          )
          .join("")}
      </div>`;

    if (categoriaCounts.size) {
      html += `
      <div class="facet-group">
        <h4>Categoría</h4>
        ${[...categoriaCounts.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(
            ([val, count]) => `
          <label class="facet-option">
            <span class="fname"><input type="checkbox" data-categoria="${val}" ${state.categorias.has(val) ? "checked" : ""}> ${val}</span>
            <span class="fcount">${count}</span>
          </label>`
          )
          .join("")}
      </div>`;
    }

    if (condicionCounts.size) {
      html += `
      <div class="facet-group">
        <h4>Condición</h4>
        ${[...condicionCounts.entries()]
          .map(
            ([val, count]) => `
          <label class="facet-option">
            <span class="fname"><input type="checkbox" data-condicion="${val}" ${state.condiciones.has(val) ? "checked" : ""}> ${val}</span>
            <span class="fcount">${count}</span>
          </label>`
          )
          .join("")}
      </div>`;
    }

    if (marcaCounts.size) {
      html += `
      <div class="facet-group">
        <h4>Marca</h4>
        ${[...marcaCounts.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(
            ([val, count]) => `
          <label class="facet-option">
            <span class="fname"><input type="checkbox" data-marca="${val}" ${state.marcas.has(val) ? "checked" : ""}> ${val}</span>
            <span class="fcount">${count}</span>
          </label>`
          )
          .join("")}
      </div>`;
    }

    html += `<div class="facet-group"><span class="clear-filters" id="clearFilters">Limpiar filtros</span></div>`;

    filtersPanel.innerHTML = html;

    filtersPanel.querySelectorAll("[data-seccion]").forEach((input) => {
      input.addEventListener("change", () => {
        state.seccion = input.dataset.seccion;
        state.categorias.clear();
        state.marcas.clear();
        state.condiciones.clear();
        writeStateToURL();
        render();
      });
    });
    filtersPanel.querySelectorAll("[data-categoria]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleSetValue(state.categorias, input.dataset.categoria);
        writeStateToURL();
        render();
      });
    });
    filtersPanel.querySelectorAll("[data-marca]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleSetValue(state.marcas, input.dataset.marca);
        writeStateToURL();
        render();
      });
    });
    filtersPanel.querySelectorAll("[data-condicion]").forEach((input) => {
      input.addEventListener("change", () => {
        toggleSetValue(state.condiciones, input.dataset.condicion);
        writeStateToURL();
        render();
      });
    });
    const clearBtn = filtersPanel.querySelector("#clearFilters");
    clearBtn?.addEventListener("click", () => {
      state.seccion = "";
      state.categorias.clear();
      state.marcas.clear();
      state.condiciones.clear();
      writeStateToURL();
      render();
    });
  }
});
