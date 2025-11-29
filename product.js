let cart = [];
const cartCount = document.getElementById("cartCount");

// Modal elements
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalAddCart = document.getElementById("modalAddCartBtn");

// Close modal
document.querySelector(".close-modal").onclick = () => {
    modal.style.display = "none";
};

// Add click events to each product
document.querySelectorAll(".product").forEach(product => {

    const viewBtn = product.querySelector(".view-btn");
    const addBtn = product.querySelector(".add-btn");

    const name = product.dataset.name;
    const price = product.dataset.price;
    const description = product.dataset.description;
    const image = product.dataset.image;

    // VIEW DETAILS
    viewBtn.onclick = () => {
        modal.style.display = "flex";

        modalImg.src = image;
        modalName.textContent = name;
        modalDesc.textContent = description;
        modalPrice.textContent = "₱" + Number(price).toLocaleString();
        
        modalAddCart.onclick = () => addToCart(name, price);
    };

    // ADD TO CART (from card)
    addBtn.onclick = () => addToCart(name, price);
});

// ---------------------------
//  CART MODAL SYSTEM
// ---------------------------
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cartItems");
const closeCartBtn = document.getElementById("closeCart");

// Open cart modal
document.getElementById("cartIcon").onclick = () => {
    updateCartUI();
    cartModal.style.display = "flex";
};

// Close cart modal
closeCartBtn.onclick = () => {
    cartModal.style.display = "none";
};

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount.textContent = cart.length;
    updateCartUI();
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    cartCount.textContent = cart.length;
    updateCartUI();
}

// UPDATE CART UI
function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class='empty'>Your cart is empty.</p>`;
        return;
    }

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} - ₱${Number(item.price).toLocaleString()}</span>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
    });
}
