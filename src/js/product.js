const juiceRecommendations = {
  "cold": "Try Ginger, Lemon, and Honey Juice. It helps soothe your throat and boosts immunity.",
  "energy": "Go for Mango Juice, ABC+ Juice, or Apple Juice for an energy boost!",
  "detox": "Green Detox Juice and Super Green Juice are great for cleansing your system.",
  "immunity": "Immunity Booster Juice and Orange Juice will help strengthen your immune system.",
  "weight loss": "Green Detox Juice and Cucumber Mint Juice are good for weight loss.",
  "order": "To place an order, please select a juice and click 'Buy Now'.",
  "track": "Enter your order ID to track your delivery."
};

function sendMessage() {
  let input = document.getElementById("chat-input").value.trim().toLowerCase();
  let chatMessages = document.getElementById("chat-messages");

  if (!input) return;

  // Display user message
  chatMessages.innerHTML += `<div><b>You:</b> ${input}</div>`;

  // Generate chatbot response
  let response = "I'm sorry, I didn't understand that.";
  for (let key in juiceRecommendations) {
    if (input.includes(key)) {
      response = juiceRecommendations[key];
      break;
    }
  }

  // Display chatbot response
  chatMessages.innerHTML += `<div><b>Bot:</b> ${response}</div>`;

  // Clear input field
  document.getElementById("chat-input").value = "";

  // Auto-scroll chat
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChat(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function submitOpinion() {
  let opinion = document.getElementById('opinion-box').value.trim();
  let opinionList = document.getElementById('opinion-list');

  if (opinion) {
    let newOpinion = document.createElement('p');
    newOpinion.textContent = `🗣️ ${opinion}`;
    opinionList.appendChild(newOpinion);

    // Clear input
    document.getElementById('opinion-box').value = '';
  }
}
