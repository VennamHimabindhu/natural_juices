document.addEventListener("DOMContentLoaded", function () {
    const ingredients = {
        Fruits: [
            { name: "Mango", image: "images/mangof.jpeg" },
            { name: "Apple", image: "images/applef.jpeg" },
            { name: "Banana", image: "images/BananaPachabale.webp" },
            { name: "Guava", image: "images/gauva.webp" },
            { name: "Strawberry", image: "images/strawberry.jpeg" },
            { name: "Papaya", image: "images/papaya.jpg" },
            { name: "Pineapple", image: "images/Pineapple.webp" },
            { name: "Watermelon", image: "images/watermilon.webp" }
        ],
        Vegetables: [
            { name: "Tomato", image: "images/Tomato-Seeds.jpg" },
            { name: "Carrot", image: "images/OotyCarrot.webp" },
            { name: "Beetroot", image: "images/beetrrot.jpg" },
            { name: "Cucumber", image: "images/CucumberEnglish.webp" },
            { name: "Pumpkin", image: "images/pumpkin.jpg" }
        ],
        Leaves: [
            { name: "Koriander", image: "images/koriander.webp" },
            { name: "Mint", image: "images/mint.jpg" },
            { name: "Curry leaves", image: "images/curryleaves.jpeg" },
            { name: "Thulasi", image: "images/thulsi.jpg" }
        ],
        Others: [
            { name: "Ginger", image: "images/ginger.jpeg" },
            { name: "Honey", image: "images/honey.jpeg" },
            { name: "Chia Seeds", image: "images/chiaseeds.avif" }
        ]
    };

    let selectedIngredients = [];
    const selectedItems = document.getElementById("selected-items");

    function displayIngredients() {
        Object.keys(ingredients).forEach(category => {
            const grid = document.getElementById(`${category.toLowerCase()}-grid`);
            if (!grid) return; // Ensure grid exists
            grid.innerHTML = ""; // Clear previous items
            ingredients[category].forEach(ingredient => {
                const div = document.createElement("div");
                div.className = "ingredient";
                div.innerHTML = `
                    <img src="${ingredient.image}" alt="${ingredient.name}">
                    <p>${ingredient.name}</p>
                    <button onclick="addIngredient('${ingredient.name}', '${ingredient.image}')">Add</button>
                `;
                grid.appendChild(div);
            });
        });
    }

    window.addIngredient = function (name, image) {
        if (!selectedIngredients.some(ing => ing.name === name)) {
            selectedIngredients.push({ name, image });
            updateSelectedList();
            saveToLocalStorage(); // Save every time an item is added
        }
    };

    window.removeIngredient = function (name) {
        selectedIngredients = selectedIngredients.filter(ing => ing.name !== name);
        updateSelectedList();
        saveToLocalStorage(); // Save every time an item is removed
    };

    function updateSelectedList() {
        if (!selectedItems) return; // Ensure selected items container exists
        selectedItems.innerHTML = "";
        selectedIngredients.forEach(ingredient => {
            const div = document.createElement("div");
            div.className = "selected-item";
            div.innerHTML = `
                <img src="${ingredient.image}" alt="${ingredient.name}">
                <p>${ingredient.name}</p>
                <button class="remove-btn" onclick="removeIngredient('${ingredient.name}')">×</button>
            `;
            selectedItems.appendChild(div);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients));
    }

    window.createJuice = function () {
        if (selectedIngredients.length === 0) {
            alert("Please select at least one ingredient!");
            return;
        }
        saveToLocalStorage(); // Ensure storage before redirect
        console.log("Saved Ingredients:", localStorage.getItem("selectedIngredients"));
        window.location.href = "ordersummary.html";
    };

    displayIngredients();
});
