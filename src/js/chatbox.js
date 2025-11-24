const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OpenAI API setup
const openai = new OpenAIApi(new Configuration({
    apiKey: "YOUR_OPENAI_API_KEY"  // Replace with your OpenAI API Key
}));

// Predefined health responses and juice recommendations
const healthRecommendations = [
    { 
        keywords: ["fever", "high temperature"], 
        response: "For fever, stay hydrated and get plenty of rest.", 
        juice: "Try Orange Juice for vitamin C and immunity boost." 
    },
    { 
        keywords: ["cough", "sore throat"], 
        response: "For cough, drink warm fluids and honey-based drinks.", 
        juice: "Try Ginger Lemon Honey Juice for soothing relief." 
    },
    { 
        keywords: ["cold", "runny nose"], 
        response: "For a cold, keep warm and drink fluids.", 
        juice: "Try Pineapple Juice for anti-inflammatory benefits." 
    },
    { 
        keywords: ["headache", "migraine"], 
        response: "For headaches, rest in a quiet place and stay hydrated.", 
        juice: "Try Watermelon Juice to stay hydrated and reduce headache pain." 
    }
];

// Chatbot API endpoint
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message.toLowerCase().trim();
    console.log("User Message:", userMessage);

    // Check predefined health-related responses
    for (const entry of healthRecommendations) {
        if (entry.keywords.some(keyword => userMessage.includes(keyword))) {
            return res.json({ 
                reply: `${entry.response} \n\n 🍹 **Recommended Juice:** ${entry.juice}` 
            });
        }
    }

    // If no predefined response, use OpenAI API
    try {
        console.log("No predefined match, calling OpenAI...");
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a healthcare assistant that suggests juices based on health conditions." },
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
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
