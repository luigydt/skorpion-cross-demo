document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("destacadas-grid");
  if (!grid) return;

  const featuredIds = ["beta-rr-300-2t", "kawasaki-z650", "peugeot-tweet-125"];
  const items = featuredIds.map(findProduct).filter(Boolean);

  grid.innerHTML = items.map(productCardHTML).join("");
  bindAddButtons(grid);
});
