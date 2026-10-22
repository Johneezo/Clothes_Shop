/* STYLEBOX FRONT-END DEMO
   Replace sample products/photos/prices below with your real stock before launch.
   WhatsApp checkout opens a pre-filled message; the customer must press Send in WhatsApp.
*/
const WHATSAPP_NUMBER = "260777289067"; // Zambia format: remove the first 0 from 0777289067 and add 260
const $ = (id) => document.getElementById(id);

const sampleProducts = [
  {
    id: 1, name: "Everyday Oversized Tee", category: "Unisex", price: 180, tag: "BESTSELLER",
    description: "An easy everyday tee with a relaxed fit. Choose your preferred colour and size. Please confirm available stock with us before payment.",
    colours: [
      { name: "Black", hex: "#171717", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85"] },
      { name: "White", hex: "#f1f0e9", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85"] },
      { name: "Olive", hex: "#6a7048", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85"] }
    ], sizes: ["S", "M", "L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2, name: "Streetwear Hoodie", category: "Unisex", price: 420, tag: "NEW DROP",
    description: "A street-ready hoodie for cooler days and relaxed weekends. Choose a colour and size, then message us to confirm availability.",
    colours: [
      { name: "Charcoal", hex: "#393a39", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"] },
      { name: "Cream", hex: "#ded5c5", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"] }
    ], sizes: ["S", "M", "L", "XL", "XXL"], image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3, name: "Classic Denim Jacket", category: "Men", price: 550, tag: "TIMELESS",
    description: "A versatile denim layer that works across seasons. Select your size and preferred colour before adding it to your bag.",
    colours: [
      { name: "Blue Denim", hex: "#385c79", images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85"] },
      { name: "Black Denim", hex: "#242424", images: ["https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85"] }
    ], sizes: ["S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4, name: "Everyday Cargo Trousers", category: "Men", price: 350, tag: "EASY FIT",
    description: "Utility-inspired trousers made for an easy, everyday look. Contact StyleBox to confirm the available colour and size.",
    colours: [
      { name: "Black", hex: "#171717", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85"] },
      { name: "Khaki", hex: "#9a906c", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85"] }
    ], sizes: ["28", "30", "32", "34", "36", "38"], image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5, name: "Soft Knit Top", category: "Women", price: 260, tag: "JUST IN",
    description: "A simple knit top that is easy to dress up or down. Pick your size and colour, then check stock with us on WhatsApp.",
    colours: [
      { name: "Oat", hex: "#c5b79f", images: ["https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85"] },
      { name: "Black", hex: "#171717", images: ["https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85"] }
    ], sizes: ["XS", "S", "M", "L", "XL"], image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6, name: "Everyday Crossbody Bag", category: "Accessories", price: 220, tag: "DAILY ESSENTIAL",
    description: "A compact accessory for your everyday essentials. Confirm colour availability and final order details with us before payment.",
    colours: [
      { name: "Black", hex: "#171717", images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"] },
      { name: "Tan", hex: "#ad8054", images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"] }
    ], sizes: ["One size"], image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85"
  }
];

let products = sampleProducts;
let databaseConnected = false;

let activeCategory = "All";
let activeProduct = null;
let selectedColour = "";
let selectedSize = "";
let selectedQuantity = 1;
let activeImageIndex = 0;
let cart = [];
let toastTimeout;

function formatPrice(amount) { return `K${Number(amount).toLocaleString("en-ZM")}`; }
function getColour(product, name) { return product.colours.find(c => c.name === name) || product.colours[0]; }
function getImages(product, colourName) { return getColour(product, colourName).images; }
function safeText(value) { return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch])); }

function renderProducts() {
  const query = ($("searchInput")?.value || "").trim().toLowerCase();
  let list = products.filter(p => (activeCategory === "All" || p.category === activeCategory) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query));
  const sort = $("sortSelect").value;
  if (sort === "price-low") list.sort((a,b) => a.price-b.price);
  if (sort === "price-high") list.sort((a,b) => b.price-a.price);
  if (sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));
  $("productsGrid").innerHTML = list.map(p => `
    <article class="product-card" tabindex="0" role="button" aria-label="View ${safeText(p.name)}" data-product-id="${p.id}">
      <div class="product-image-wrap"><img src="${p.image}" alt="${safeText(p.name)}" loading="lazy"><span class="product-tag">${safeText(p.tag)}</span><button class="quick-add" data-quick-add="${p.id}" type="button">View details +</button></div>
      <div class="product-info"><div class="product-title-line"><h3>${safeText(p.name)}</h3><span class="product-price">${formatPrice(p.price)}</span></div><div class="product-meta"><span>${safeText(p.category)}${databaseConnected ? ` · ${p.stockQuantity || 0} in stock` : ""}</span><span class="swatch-preview">${p.colours.map(c => `<i class="mini-swatch" style="background:${c.hex}" title="${safeText(c.name)}"></i>`).join("")}</span></div></div>
    </article>`).join("");
  $("emptyState").hidden = list.length > 0;
  $("productsGrid").hidden = list.length === 0;
  document.querySelectorAll(".filter-chip").forEach(b => b.classList.toggle("active", b.dataset.category === activeCategory));
}

function openProduct(id) {
  activeProduct = products.find(p => String(p.id) === String(id));
  if (!activeProduct) return;
  selectedColour = activeProduct.colours[0].name;
  selectedSize = activeProduct.sizes[0];
  selectedQuantity = 1;
  activeImageIndex = 0;
  $("modalCategory").textContent = activeProduct.category.toUpperCase() + " / STYLEBOX COLLECTION";
  $("modalProductName").textContent = activeProduct.name;
  $("modalProductPrice").textContent = formatPrice(activeProduct.price);
  $("modalProductDescription").textContent = activeProduct.description;
  renderProductOptions();
  $("productBackdrop").hidden = false;
  $("productModal").hidden = false;
  document.body.classList.add("no-scroll");
  $("closeProduct").focus();
}
function renderProductOptions() {
  if (!activeProduct) return;
  const images = getImages(activeProduct, selectedColour);
  activeImageIndex = Math.min(activeImageIndex, images.length - 1);
  $("mainProductImage").src = images[activeImageIndex];
  $("mainProductImage").alt = `${activeProduct.name} — ${selectedColour}`;
  $("galleryThumbnails").innerHTML = images.map((src,i) => `<button class="gallery-thumb ${i === activeImageIndex ? "active" : ""}" data-image-index="${i}" aria-label="Show product photo ${i+1}"><img src="${src}" alt="" loading="lazy"></button>`).join("");
  $("colourOptions").innerHTML = activeProduct.colours.map(c => `<button class="colour-choice ${c.name === selectedColour ? "active" : ""}" data-colour="${safeText(c.name)}" style="background:${c.hex}" title="${safeText(c.name)}" aria-label="${safeText(c.name)} colour" aria-pressed="${c.name === selectedColour}"></button>`).join("");
  $("selectedColourLabel").textContent = selectedColour;
  $("sizeOptions").innerHTML = activeProduct.sizes.map(s => `<button class="size-choice ${s === selectedSize ? "active" : ""}" data-size="${safeText(s)}" aria-pressed="${s === selectedSize}">${safeText(s)}</button>`).join("");
  $("selectedSizeLabel").textContent = selectedSize;
  $("quantityValue").textContent = selectedQuantity;
}
function closeProduct() { $("productBackdrop").hidden = true; $("productModal").hidden = true; document.body.classList.remove("no-scroll"); }
function addActiveProductToCart() {
  if (!activeProduct) return;
  if (databaseConnected && Number(activeProduct.stockQuantity || 0) <= 0) { showToast("This item is currently out of stock."); return; }
  const key = `${activeProduct.id}|${selectedColour}|${selectedSize}`;
  const existing = cart.find(item => item.key === key);
  if (existing) existing.quantity += selectedQuantity;
  else cart.push({ key, productId: activeProduct.id, name: activeProduct.name, category: activeProduct.category, price: activeProduct.price, image: getImages(activeProduct, selectedColour)[0], colour: selectedColour, size: selectedSize, quantity: selectedQuantity });
  renderCart(); closeProduct(); showToast(`${activeProduct.name} added to your bag`);
}
function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.quantity, 0);
  const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
  $("cartCount").textContent = count;
  $("drawerCartCount").textContent = `(${count})`;
  $("cartSubtotal").textContent = formatPrice(total);
  $("cartEmpty").hidden = cart.length > 0;
  $("cartSummary").hidden = cart.length === 0;
  $("cartItems").innerHTML = cart.map(item => `
    <article class="cart-line"><img src="${item.image}" alt="${safeText(item.name)}"><div><h3>${safeText(item.name)}</h3><p>Colour: ${safeText(item.colour)}</p><p>Size: ${safeText(item.size)}</p><div class="cart-line-controls"><button data-cart-action="minus" data-key="${safeText(item.key)}" aria-label="Decrease ${safeText(item.name)} quantity">−</button><span>${item.quantity}</span><button data-cart-action="plus" data-key="${safeText(item.key)}" aria-label="Increase ${safeText(item.name)} quantity">+</button><button class="remove-item" data-cart-action="remove" data-key="${safeText(item.key)}">Remove</button></div></div><span class="line-price">${formatPrice(item.price*item.quantity)}</span></article>`).join("");
}
function openCart() { renderCart(); $("cartBackdrop").hidden = false; $("cartDrawer").hidden = false; document.body.classList.add("no-scroll"); $("closeCart").focus(); }
function closeCart() { $("cartBackdrop").hidden = true; $("cartDrawer").hidden = true; document.body.classList.remove("no-scroll"); }
function changeCartItem(key, action) {
  const item = cart.find(entry => entry.key === key);
  if (!item) return;
  if (action === "plus") item.quantity++;
  if (action === "minus") item.quantity--;
  if (action === "remove" || item.quantity <= 0) cart = cart.filter(entry => entry.key !== key);
  renderCart();
}
function showToast(message) { const toast = $("toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600); }
function checkoutOnWhatsApp() {
  if (!cart.length) { showToast("Your bag is empty. Add a product first."); return; }
  const lines = cart.map((item, index) => `${index + 1}. ${item.name}\n   Colour: ${item.colour}\n   Size: ${item.size}\n   Quantity: ${item.quantity}\n   Subtotal: ${formatPrice(item.price * item.quantity)}`);
  const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
  const message = `Hello StyleBox! I would like to place an order.\n\n${lines.join("\n\n")}\n\nEstimated items total: ${formatPrice(total)}\n\nPlease confirm that these items, colours and sizes are available, advise delivery/pickup arrangements, and send me the payment instructions. I will share payment proof here after paying. Thank you!`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!newWindow) window.location.href = url;
}

// Category and product interactions
$("categoryFilters").addEventListener("click", e => { const button = e.target.closest("[data-category]"); if (!button) return; activeCategory = button.dataset.category; renderProducts(); });
document.addEventListener("click", e => {
  const card = e.target.closest("[data-product-id]");
  const quick = e.target.closest("[data-quick-add]");
  if (quick) { e.stopPropagation(); openProduct(quick.dataset.quickAdd); return; }
  if (card && !e.target.closest("button")) openProduct(card.dataset.productId);
  const navCat = e.target.closest("[data-nav-category]");
  if (navCat) { activeCategory = navCat.dataset.navCategory; renderProducts(); $("mobileNav").classList.remove("open"); }
});
document.addEventListener("keydown", e => { const card = e.target.closest(".product-card"); if (card && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProduct(card.dataset.productId); } if (e.key === "Escape") { closeProduct(); closeCart(); } });
$("sortSelect").addEventListener("change", renderProducts);
$("searchToggle").addEventListener("click", () => { $("searchPanel").hidden = !$("searchPanel").hidden; if (!$("searchPanel").hidden) $("searchInput").focus(); });
$("closeSearch").addEventListener("click", () => { $("searchPanel").hidden = true; $("searchInput").value = ""; renderProducts(); });
$("searchInput").addEventListener("input", renderProducts);
$("resetFilters").addEventListener("click", () => { activeCategory = "All"; $("searchInput").value = ""; renderProducts(); });
$("menuToggle").addEventListener("click", () => $("mobileNav").classList.toggle("open"));

// Product detail interactions
$("closeProduct").addEventListener("click", closeProduct);
$("productBackdrop").addEventListener("click", closeProduct);
$("galleryThumbnails").addEventListener("click", e => { const button = e.target.closest("[data-image-index]"); if (!button) return; activeImageIndex = Number(button.dataset.imageIndex); renderProductOptions(); });
$("colourOptions").addEventListener("click", e => { const button = e.target.closest("[data-colour]"); if (!button) return; selectedColour = button.dataset.colour; activeImageIndex = 0; renderProductOptions(); });
$("sizeOptions").addEventListener("click", e => { const button = e.target.closest("[data-size]"); if (!button) return; selectedSize = button.dataset.size; renderProductOptions(); });
$("quantityMinus").addEventListener("click", () => { selectedQuantity = Math.max(1, selectedQuantity - 1); $("quantityValue").textContent = selectedQuantity; });
$("quantityPlus").addEventListener("click", () => { selectedQuantity = Math.min(99, selectedQuantity + 1); $("quantityValue").textContent = selectedQuantity; });
$("addToCart").addEventListener("click", addActiveProductToCart);

// Cart and WhatsApp checkout
$("openCart").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("cartBackdrop").addEventListener("click", closeCart);
$("continueShopping").addEventListener("click", () => { closeCart(); $("shop").scrollIntoView({behavior:"smooth"}); });
$("cartItems").addEventListener("click", e => { const button = e.target.closest("[data-cart-action]"); if (button) changeCartItem(button.dataset.key, button.dataset.cartAction); });
$("clearCart").addEventListener("click", () => { cart = []; renderCart(); showToast("Your bag has been cleared."); });
$("checkoutButton").addEventListener("click", checkoutOnWhatsApp);

$("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();

function getSupabaseClient() {
  const config = window.STYLEBOX_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || config.supabaseUrl.includes("YOUR_") || config.supabaseAnonKey.includes("YOUR_")) return null;
  if (!window.supabase?.createClient) return null;
  return window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
}

function mapDatabaseProduct(row) {
  const colours = Array.isArray(row.colours) && row.colours.length
    ? row.colours.map(c => ({ name: c.name || "Default", hex: c.hex || "#777777", images: Array.isArray(c.images) && c.images.length ? c.images : (row.image_urls || []) }))
    : [{ name: "Default", hex: "#777777", images: row.image_urls || [] }];
  const images = Array.isArray(row.image_urls) ? row.image_urls : [];
  return {
    id: row.id, name: row.name, category: row.category || "Unisex", price: Number(row.price || 0),
    tag: row.tag || "NEW ARRIVAL", description: row.description || "Contact StyleBox to confirm details.",
    colours: colours.map(c => ({...c, images: c.images?.length ? c.images : images})),
    sizes: Array.isArray(row.sizes) && row.sizes.length ? row.sizes : ["One size"],
    image: images[0] || colours[0]?.images?.[0] || "https://placehold.co/900x1100/171717/d5ff38?text=StyleBox",
    stockQuantity: Number(row.stock_quantity || 0), published: row.published !== false
  };
}

async function loadProductsFromDatabase() {
  const client = getSupabaseClient();
  if (!client) {
    console.info("StyleBox is using sample products. Add your Supabase details to config.js to connect the database.");
    $("allCount").textContent = String(products.length).padStart(2, "0");
    renderProducts();
    return;
  }
  try {
    const { data, error } = await client.from("products").select("*").eq("published", true).order("created_at", { ascending: false });
    if (error) throw error;
    products = (data || []).map(mapDatabaseProduct);
    databaseConnected = true;
    $("allCount").textContent = String(products.length).padStart(2, "0");
    renderProducts();
    if (activeProduct) {
      const refreshed = products.find(p => String(p.id) === String(activeProduct.id));
      if (refreshed) activeProduct = refreshed;
    }
  } catch (error) {
    console.error("Could not load StyleBox products from Supabase:", error.message);
    showToast("Could not load live stock. Check the database setup.");
  }
}

loadProductsFromDatabase();
