const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    res.json({ reply: `You said: ${userMessage}` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Predefined health responses
const healthResponses = {
    "cold": "Try Ginger, Lemon, and Honey Juice. It helps soothe your throat and boosts immunity.",
    "fever": "A fever is usually a sign that your body is fighting an infection. Stay hydrated and rest. If it persists, consult a doctor.",
    "headache": "Headaches can be caused by dehydration, stress, or lack of sleep. Drink water and rest.",
    "cough": "Drink warm fluids, honey tea, and stay hydrated to ease your cough.",
    "flu": "Get plenty of rest, drink warm fluids, and take vitamin C for faster recovery."
};

// Chatbot API endpoint
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message.toLowerCase().trim();
    console.log("User Message:", userMessage);

    // Check predefined health-related responses
    for (const key in healthResponses) {
        if (userMessage.includes(key)) {
            return res.json({ reply: healthResponses[key] });
        }
    }

    // If no predefined response, use OpenAI API
    try {
        console.log("No predefined match, calling OpenAI...");
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a health and nutrition assistant. Provide expert advice on health and juices." },
                { role: "user", content: userMessage }
            ]
        });

        return res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        return res.status(500).json({ reply: "Sorry, I'm having trouble answering right now." });
    }
});

// Start server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
