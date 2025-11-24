document.addEventListener("DOMContentLoaded", function () {
    const ingredientList = document.getElementById("ingredient-list");
    const healthBenefits = document.getElementById("health-benefits");
    const vitaminContent = document.getElementById("vitamin-content");
    const priceAmount = document.getElementById("price-amount");
    const proceedToPayButton = document.getElementById("proceed-to-pay");

    // Nutrition Data
    const nutritionData = {
        Mango: { vitamins: "Vitamin A, Vitamin C", benefits: "Boosts immunity, good for skin", price: 2 },
        Apple: { vitamins: "Vitamin C, Vitamin K", benefits: "Heart-healthy, aids digestion", price: 1.5 },
        Banana: { vitamins: "Vitamin B6, Vitamin C", benefits: "Boosts energy, supports digestion", price: 1 },
        Guava: { vitamins: "Vitamin C, Vitamin A", benefits: "Rich in antioxidants, good for skin", price: 2 },
        Strawberry: { vitamins: "Vitamin C, Vitamin B9", benefits: "Good for heart, reduces inflammation", price: 2.5 },
        Papaya: { vitamins: "Vitamin A, Vitamin C", benefits: "Improves digestion, good for skin", price: 2 },
        Pineapple: { vitamins: "Vitamin C, Vitamin B6", benefits: "Aids digestion, anti-inflammatory", price: 2 },
        Watermelon: { vitamins: "Vitamin C, Vitamin A", benefits: "Hydrating, good for heart", price: 2 },

        Tomato: { vitamins: "Vitamin C, Vitamin K", benefits: "Good for heart, rich in antioxidants", price: 1.5 },
        Carrot: { vitamins: "Vitamin A, Vitamin B6", benefits: "Good for eyes, boosts immunity", price: 1 },
        Beetroot: { vitamins: "Vitamin C, Vitamin B9", benefits: "Boosts stamina, lowers blood pressure", price: 1.5 },
        Cucumber: { vitamins: "Vitamin K, Vitamin C", benefits: "Hydrating, good for skin", price: 1 },
        Pumpkin: { vitamins: "Vitamin A, Vitamin C", benefits: "Boosts immunity, good for vision", price: 1.5 },

        Kothmir: { vitamins: "Vitamin A, Vitamin K", benefits: "Supports digestion, detoxifies", price: 1 },
        Pudhina: { vitamins: "Vitamin A, Vitamin C", benefits: "Aids digestion, freshens breath", price: 1 },
        Karvapathy: { vitamins: "Vitamin C, Vitamin K", benefits: "Boosts immunity, aids digestion", price: 1 },
        Thulasi: { vitamins: "Vitamin A, Vitamin C", benefits: "Reduces stress, supports immunity", price: 1 },

        Ginger: { vitamins: "Vitamin B6, Vitamin C", benefits: "Anti-inflammatory, aids digestion", price: 1 },
        Honey: { vitamins: "Vitamin B6, Vitamin C", benefits: "Boosts energy, soothes throat", price: 1.5 },
        "Chia Seeds": { vitamins: "Omega-3, Fiber", benefits: "Good for digestion, rich in antioxidants", price: 2 }
    };

    function loadOrderSummary() {
        const selectedIngredients = JSON.parse(localStorage.getItem("selectedIngredients")) || [];
        let totalPrice = 0;
        let allBenefits = new Set();
        let allVitamins = new Set();

        if (selectedIngredients.length === 0) {
            ingredientList.innerHTML = "<li>No ingredients selected</li>";
            healthBenefits.textContent = "No health benefits available";
            vitaminContent.textContent = "No vitamin content available";
            priceAmount.textContent = "0.00";
            return;
        }

        ingredientList.innerHTML = ""; // Clear previous content

        selectedIngredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent = ingredient.name;
            ingredientList.appendChild(li);

            if (nutritionData[ingredient.name]) {
                nutritionData[ingredient.name].benefits.split(", ").forEach(benefit => allBenefits.add(benefit));

                // Normalize vitamins (Ensure "Vitamin" prefix and remove duplicates)
                let vitamins = nutritionData[ingredient.name].vitamins.split(", ");
                vitamins.forEach(vitamin => {
                    if (!vitamin.startsWith("Vitamin")) {
                        vitamin = "Vitamin " + vitamin; // Ensure consistency
                    }
                    allVitamins.add(vitamin);
                });

                totalPrice += nutritionData[ingredient.name].price;
            }
        });

        healthBenefits.textContent = [...allBenefits].join(", ");
        vitaminContent.textContent = [...allVitamins].sort().join(", ");
        priceAmount.textContent = totalPrice.toFixed(2);
    }

    function proceedToPayment() {
        window.location.href = "payment.html";
    }

    loadOrderSummary();
    proceedToPayButton.addEventListener("click", proceedToPayment);
});