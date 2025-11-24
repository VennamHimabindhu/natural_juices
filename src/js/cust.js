document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");
  const selectedItemsContainer = document.querySelector(".selected-items");
  const createJuiceBtn = document.querySelector(".create-juice");

  let selectedIngredients = [];

  items.forEach(item => {
      const minusBtn = item.querySelector(".minus");
      const plusBtn = item.querySelector(".plus");
      const quantityDisplay = item.querySelector(".quantity");
      const itemName = item.querySelector(".name").innerText;
      const itemPriceElement = item.querySelector(".price");
      const itemImage = item.querySelector("img").src;

      let quantity = 0;
      let basePrice = parseFloat(itemPriceElement.innerText.replace("₹", "").trim()); // Extract numeric price

      plusBtn.addEventListener("click", () => {
          quantity++;
          quantityDisplay.innerText = quantity;
          updatePriceAndSelection(quantity, basePrice, itemPriceElement, itemName, itemImage);
      });

      minusBtn.addEventListener("click", () => {
          if (quantity > 0) {
              quantity--;
              quantityDisplay.innerText = quantity;
              updatePriceAndSelection(quantity, basePrice, itemPriceElement, itemName, itemImage);
          }
      });
  });

  function updatePriceAndSelection(quantity, basePrice, priceElement, name, image) {
      let totalPrice = quantity > 0 ? basePrice * quantity : 0; // Update total price correctly
      priceElement.innerText = `₹${totalPrice.toFixed(2)}`; // Show updated price

      updateSelectedItems(name, image, totalPrice, quantity);
  }

  function updateSelectedItems(name, image, price, quantity) {
      const existingItem = selectedIngredients.find(item => item.name === name);

      if (existingItem) {
          if (quantity === 0) {
              selectedIngredients = selectedIngredients.filter(item => item.name !== name);
          } else {
              existingItem.quantity = quantity;
              existingItem.price = price;
          }
      } else if (quantity > 0) {
          selectedIngredients.push({ name, image, price, quantity });
      }

      renderSelectedItems();
  }

  function renderSelectedItems() {
      selectedItemsContainer.innerHTML = "";
      selectedIngredients.forEach(item => {
          const itemElement = document.createElement("div");
          itemElement.classList.add("selected-item");
          itemElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <span>${item.name} x ${item.quantity} - ₹${item.price.toFixed(2)}</span>
          `;
          selectedItemsContainer.appendChild(itemElement);
      });
  }
createJuiceBtn.addEventListener("click", () => {
    // Save selected ingredients to localStorage and go to summary
    localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients));
    window.location.href = "ordersummary.html";
});

});
