<script>
const products = [
  {
    id: 1,
    name: "Футболка Discord Edition",
    price: 1990,
    image: "https://cdn.discordapp.com/attachments/1201946935523803136/1353444744709013655/image.png"
  },
  { id: 2, name: "Футболка Basic", price: 990, image: "https://example.com/shirt2.jpg" },
  { id: 3, name: "Футболка С принтом", price: 1500, image: "https://example.com/shirt3.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addToCart(productId) {
  const exists = cart.find(p => p.id === productId);
  if (!exists) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    saveCart();
    renderCart();
    renderProducts();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId);
  saveCart();
  renderCart();
  renderProducts();
}

function toggleFavorite(productId) {
  const index = favorites.findIndex(p => p.id === productId);
  if (index !== -1) {
    favorites.splice(index, 1);
  } else {
    const product = products.find(p => p.id === productId);
    favorites.push(product);
  }
  saveFavorites();
  renderFavorites();
  renderProducts();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Корзина пуста</li>";
    return;
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} – ${item.price}₽</span>
      <button onclick="removeFromCart(${item.id})">❌</button>
    `;
    cartItems.appendChild(li);
  });
}

function renderFavorites() {
  const favItems = document.getElementById("favorite-items");
  if (!favItems) return;
  favItems.innerHTML = "";

  favorites.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name}`;
    favItems.appendChild(li);
  });
}

function updateFavoriteButtons() {
  document.querySelectorAll(".favorite-button").forEach(btn => {
    const productId = parseInt(btn.dataset.id);
    if (favorites.some(p => p.id === productId)) {
      btn.textContent = "★ В избранном";
    } else {
      btn.textContent = "♡ В избранное";
    }
  });
}

function renderProducts() {
  const container = document.querySelector(".products");
  if (!container) return;
  container.innerHTML = "";

  products.forEach(product => {
    const isFav = favorites.some(p => p.id === product.id);
    const isInCart = cart.some(p => p.id === product.id);

    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price}₽</p>
      <div>
        ${isInCart
          ? `<button onclick="removeFromCart(${product.id})">❌ Удалить из корзины</button>`
          : `<button onclick="addToCart(${product.id})">🛒 Добавить в корзину</button>`
        }
        <button class="favorite-button" data-id="${product.id}" onclick="toggleFavorite(${product.id})">
          ${isFav ? "★ В избранном" : "♡ В избранное"}
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  updateFavoriteButtons();
}

window.addEventListener("DOMContentLoaded", () => {
  renderCart();
  renderFavorites();
  renderProducts();

  const checkoutButton = document.getElementById("checkout");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
      }
      alert("Спасибо за заказ!");
      cart = [];
      saveCart();
      renderCart();
      renderProducts();
    });
  }
});
</script>
