const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const OpenAI = require("openai");
const { log } = require("console");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://textiai.vercel.app/", // Adjust this to match the domain of your deployed frontend
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();

// Initialize OpenAI API
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API });

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// WebSocket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", async (data) => {
    console.log("Message received:", data);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: data.message }],
        model: "gpt-3.5-turbo",
      });

      io.emit("message", { message: completion.choices[0].message.content });
    } catch (error) {
      console.error("Error:", error.message);
      io.emit("message", {
        message: "An error occurred. Please try again later.",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Define route for homepage
app.get("/", (req, res) => {
  res.send("Hello World ");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
