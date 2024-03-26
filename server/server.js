const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const OpenAI = require("openai");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
require("dotenv").config();

// Initialize OpenAI API
app.use(
  cors({
    origin: ["https://code-alpha-chatbot-server.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API });
// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for incoming messages from the frontend
  socket.on("message", async (data) => {
    console.log("Message received:", data);

    try {
      // Send user's message to ChatGPT and receive response
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: data.message }],
        model: "gpt-3.5-turbo",
      });

      // Send response back to frontend
      io.emit("message", { message: completion.choices[0].message.content });
    } catch (error) {
      console.error("Error:", error.message);
      // Send error message back to frontend
      io.emit("message", {
        message: "An error occurred. Please try again later.",
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Define route for homepage
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
