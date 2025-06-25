// Mode Gelap Toggle
document.querySelector(".toggle-mode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Simpan dan Tampilkan Produk
const shopItemsContainer = document.getElementById("shop-items");
let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  shopItemsContainer.innerHTML = "";
  products.forEach((product, index) => {
    shopItemsContainer.innerHTML += `
      <div class="item">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <strong>Rp ${parseInt(product.price).toLocaleString()}</strong><br>
        <a class="buy-button" href="https://wa.me/6282142961010?text=Halo! Saya ingin membeli ${encodeURIComponent(product.name)}">Beli via WhatsApp</a>
      </div>
    `;
  });
}
renderProducts();

// Tambah Produk (Admin)
document.getElementById("admin-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const newProduct = {
    name: this.productName.value,
    desc: this.productDesc.value,
    price: this.productPrice.value,
    image: this.productImage.value
  };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  this.reset();
  renderProducts();
});

// Filter Produk
function filterProducts(keyword) {
  const items = document.querySelectorAll(".item");
  items.forEach(item => {
    const name = item.querySelector("h3").textContent.toLowerCase();
    item.style.display = name.includes(keyword.toLowerCase()) ? "block" : "none";
  });
}

// Simulasi Login Admin Sederhana
window.onload = () => {
  const password = prompt("Masukkan password admin (kosongkan jika bukan admin):");
  if (password === "admin123") {
    document.getElementById("admin-panel").style.display = "block";
  }
};
