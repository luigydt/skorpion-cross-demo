/* Catálogo de ejemplo — datos a mano, sin backend ni admin todavía.
   Para añadir un producto nuevo, copia un objeto y cambia sus valores. */
const PRODUCTS = [
  // ===== MOTOS NUEVAS =====
  { id: "beta-rr-300-2t", name: "RR 300 2T", brand: "BETA", section: "motos", categoria: "Cross & Enduro", condicion: "Nueva", precio: 9990, badge: "Nuevo", desc: "Enduro de competición ligera, lista para pista y monte.", specs: { "Cilindrada": "293 cc", "Motor": "2 tiempos", "Peso": "104 kg" }, stock: 3 },
  { id: "beta-xtrainer-300", name: "Xtrainer 300", brand: "BETA", section: "motos", categoria: "Cross & Enduro", condicion: "Nueva", precio: 9490, desc: "Trail ligera pensada para principiantes y rutas mixtas.", specs: { "Cilindrada": "293 cc", "Motor": "2 tiempos", "Peso": "98 kg" }, stock: 2 },
  { id: "beta-rr-350-4t", name: "RR 350 4T", brand: "BETA", section: "motos", categoria: "Cross & Enduro", condicion: "Nueva", precio: 10490, desc: "Enduro 4 tiempos, potencia progresiva y gran fiabilidad.", specs: { "Cilindrada": "349 cc", "Motor": "4 tiempos", "Peso": "112 kg" }, stock: 1 },
  { id: "beta-alp-4-0", name: "Alp 4.0", brand: "BETA", section: "motos", categoria: "Custom", condicion: "Nueva", precio: 8990, badge: "Nuevo", desc: "Trail de carretera con estética clásica y postura cómoda.", specs: { "Cilindrada": "398 cc", "Motor": "4 tiempos", "Peso": "158 kg" }, stock: 4 },
  { id: "kawasaki-z650", name: "Z650", brand: "KAWASAKI", section: "motos", categoria: "Carretera", condicion: "Nueva", precio: 7799, desc: "Bicilíndrica ágil y ligera, ideal para ciudad y carretera.", specs: { "Cilindrada": "649 cc", "Potencia": "68 CV", "Peso": "187 kg" }, stock: 5 },
  { id: "kawasaki-ninja-400", name: "Ninja 400", brand: "KAWASAKI", section: "motos", categoria: "Carretera", condicion: "Nueva", precio: 6199, desc: "Deportiva compacta, perfecta para el carné A2.", specs: { "Cilindrada": "399 cc", "Potencia": "45 CV", "Peso": "168 kg" }, stock: 3 },
  { id: "kawasaki-versys-x-300", name: "Versys-X 300", brand: "KAWASAKI", section: "motos", categoria: "Carretera", condicion: "Nueva", precio: 6999, desc: "Trail versátil para asfalto y pista ligera.", specs: { "Cilindrada": "296 cc", "Potencia": "39 CV", "Peso": "179 kg" }, stock: 2 },
  { id: "kawasaki-klx-230", name: "KLX 230", brand: "KAWASAKI", section: "motos", categoria: "Cross & Enduro", condicion: "Nueva", precio: 5399, desc: "Todocamino sencilla y fiable para iniciarse en el offroad.", specs: { "Cilindrada": "233 cc", "Motor": "4 tiempos", "Peso": "134 kg" }, stock: 3 },
  { id: "kawasaki-z900rs", name: "Z900RS", brand: "KAWASAKI", section: "motos", categoria: "Custom", condicion: "Nueva", precio: 12999, badge: "Últimas unidades", desc: "Naked de estética retro con corazón de superdeportiva.", specs: { "Cilindrada": "948 cc", "Potencia": "111 CV", "Peso": "215 kg" }, stock: 1 },
  { id: "peugeot-tweet-125", name: "Tweet 125", brand: "PEUGEOT", section: "motos", categoria: "Scooters", condicion: "Nueva", precio: 3199, desc: "Scooter urbano cómodo, gran maletero bajo asiento.", specs: { "Cilindrada": "125 cc", "Consumo": "2.3 L/100km", "Peso": "128 kg" }, stock: 6 },
  { id: "peugeot-django-125", name: "Django 125", brand: "PEUGEOT", section: "motos", categoria: "Scooters", condicion: "Nueva", precio: 4199, desc: "Scooter de línea clásica con acabados premium.", specs: { "Cilindrada": "125 cc", "Consumo": "2.4 L/100km", "Peso": "138 kg" }, stock: 2 },
  { id: "peugeot-kisbee-50", name: "Kisbee 50", brand: "PEUGEOT", section: "motos", categoria: "Scooters", condicion: "Nueva", precio: 2299, desc: "Scooter 50cc sin carné, ligero y fácil de aparcar.", specs: { "Cilindrada": "50 cc", "Consumo": "1.8 L/100km", "Peso": "97 kg" }, stock: 4 },

  // ===== MOTOS DE OCASIÓN =====
  { id: "kawasaki-z650-2021-ocasion", name: "Z650 (2021)", brand: "KAWASAKI", section: "motos", categoria: "Carretera", condicion: "Ocasión", precio: 5990, precioAntes: 6800, badge: "Oferta", desc: "Revisada en taller, un único propietario, 8.200 km.", specs: { "Año": "2021", "Km": "8.200", "Garantía": "6 meses taller" }, stock: 1 },
  { id: "peugeot-tweet-2019-ocasion", name: "Tweet 125 (2019)", brand: "PEUGEOT", section: "motos", categoria: "Scooters", condicion: "Ocasión", precio: 1890, badge: "Oferta", desc: "Scooter revisada, neumáticos y frenos nuevos.", specs: { "Año": "2019", "Km": "14.500", "Garantía": "6 meses taller" }, stock: 1 },
  { id: "beta-rr-300-2020-ocasion", name: "RR 300 (2020)", brand: "BETA", section: "motos", categoria: "Cross & Enduro", condicion: "Ocasión", precio: 6490, desc: "Puesta a punto completa, lista para competir.", specs: { "Año": "2020", "Horas de uso": "~90h", "Garantía": "3 meses taller" }, stock: 1 },

  // ===== QUADS Y MINIMOTOS =====
  { id: "kawasaki-kfx-90", name: "KFX 90", brand: "KAWASAKI", section: "motos", categoria: "Quads", condicion: "Nueva", precio: 4290, desc: "Quad juvenil con limitador de velocidad regulable.", specs: { "Cilindrada": "89 cc", "Edad recomendada": "+12 años" }, stock: 2 },
  { id: "quad-utilitario-300", name: "Quad utilitario 300", brand: "TECNIUM", section: "motos", categoria: "Quads", condicion: "Nueva", precio: 3990, desc: "Quad robusto para trabajo en campo y finca.", specs: { "Cilindrada": "297 cc", "Tracción": "2x4 / 4x4" }, stock: 2 },
  { id: "minimoto-cross-50", name: "Minimoto Cross 50cc", brand: "TECNIUM", section: "motos", categoria: "Minimotos", condicion: "Nueva", precio: 890, desc: "La primera moto de cross, pensada para los más peques.", specs: { "Cilindrada": "49 cc", "Edad recomendada": "6-10 años" }, stock: 5 },
  { id: "minimoto-electrica-infantil", name: "Minimoto eléctrica infantil", brand: "TECNIUM", section: "motos", categoria: "Minimotos", condicion: "Nueva", precio: 690, badge: "Nuevo", desc: "Sin ruido, sin mantenimiento, ideal para empezar.", specs: { "Autonomía": "~40 min", "Edad recomendada": "4-8 años" }, stock: 4 },

  // ===== ELÉCTRICAS =====
  { id: "scooter-electrico-urbano", name: "Scooter eléctrico urbano", brand: "TECNIUM", section: "motos", categoria: "Eléctricas", condicion: "Nueva", precio: 3490, desc: "Equivalente a 125cc, sin ruido y sin emisiones.", specs: { "Autonomía": "95 km", "Carga": "4h (100%)" }, stock: 2 },
  { id: "moto-electrica-trail", name: "Moto eléctrica trail", brand: "TECNIUM", section: "motos", categoria: "Eléctricas", condicion: "Nueva", precio: 5990, badge: "Nuevo", desc: "Trail eléctrica silenciosa para asfalto y pista.", specs: { "Autonomía": "80 km", "Potencia": "11 kW" }, stock: 1 },

  // ===== EQUIPACIÓN =====
  { id: "casco-integral-racing", name: "Casco integral Racing", brand: "PROHEL", section: "equipacion", categoria: "Cascos", precio: 249, desc: "Homologado ECE, doble capa de EPS, pantalla antivaho.", specs: { "Tallas": "S a XXL", "Homologación": "ECE 22.06" }, stock: 8 },
  { id: "casco-cross-mx", name: "Casco Cross MX", brand: "PROHEL", section: "equipacion", categoria: "Cascos", precio: 189, desc: "Ligero y ventilado, pensado para offroad y enduro.", specs: { "Tallas": "S a XL", "Homologación": "ECE 22.06" }, stock: 6 },
  { id: "chaqueta-textil-impermeable", name: "Chaqueta textil impermeable", brand: "RIDEX", section: "equipacion", categoria: "Chaquetas", precio: 219, desc: "Membrana impermeable y protecciones homologadas.", specs: { "Tallas": "S a 3XL", "Protecciones": "Hombro, codo, espalda" }, stock: 5 },
  { id: "guantes-cuero-verano", name: "Guantes de cuero verano", brand: "RIDEX", section: "equipacion", categoria: "Guantes", precio: 59, desc: "Piel transpirable con protección de nudillos.", specs: { "Tallas": "XS a XXL" }, stock: 12 },
  { id: "botas-cross", name: "Botas de cross", brand: "RIDEX", section: "equipacion", categoria: "Botas", precio: 179, desc: "Máxima protección de tobillo y caña para offroad.", specs: { "Tallas": "39 a 47" }, stock: 4 },

  // ===== RECAMBIOS Y ACCESORIOS =====
  { id: "neumatico-trail-150-70", name: "Neumático trasero trail 150/70", brand: "MOTOPARTS", section: "recambios", categoria: "Neumáticos", precio: 129, desc: "Mixto asfalto/tierra, buen agarre en mojado.", specs: { "Medida": "150/70-17" }, stock: 10 },
  { id: "kit-transmision-completo", name: "Kit de transmisión (cadena+piñón+corona)", brand: "MOTOPARTS", section: "recambios", categoria: "Transmisión", precio: 89, desc: "Kit completo reforzado para uso mixto.", specs: { "Compatibilidad": "Consultar por modelo" }, stock: 15 },
  { id: "aceite-motor-4t-1l", name: "Aceite de motor 4T 1L", brand: "MOTOPARTS", section: "recambios", categoria: "Aceites y lubricantes", precio: 14, desc: "Sintético, apto para motores de 4 tiempos.", specs: { "Viscosidad": "10W-40" }, stock: 30 },
  { id: "pastillas-freno-delanteras", name: "Pastillas de freno delanteras", brand: "MOTOPARTS", section: "recambios", categoria: "Frenado", precio: 39, desc: "Compuesto sinterizado, frenada progresiva.", specs: { "Compatibilidad": "Consultar por modelo" }, stock: 18 },
];

const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
const formatPrice = (n) => n.toLocaleString("es-ES", { minimumFractionDigits: 0 }) + " €";
