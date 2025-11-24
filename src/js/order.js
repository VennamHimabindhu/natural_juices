const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

const orders = {
    "12345": "Processing",
    "67890": "Out for Delivery",
    "54321": "Delivered",
};

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        const { orderId } = JSON.parse(message);
        console.log(`Tracking Order: ${orderId}`);

        if (orders[orderId]) {
            ws.send(JSON.stringify({ status: orders[orderId] }));
        } else {
            ws.send(JSON.stringify({ status: "Order Not Found" }));
        }
    });

    ws.on("close", () => console.log("Client disconnected"));
});

console.log("✅ WebSocket server running on ws://localhost:5000");
