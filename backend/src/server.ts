import pool from "./config/db";

import { PORT } from "./config/env";
import { WebSocketServer, WebSocket } from "ws";
import http, { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

import cors from "cors";
import express, { Express } from "express";
import registerUser from "./routes/register";
import loginUser from "./routes/login";
import getMessage from "./routes/getMessages";

import authMiddleware from "./middleware/auth";
import cookiep from "cookie-parser";
import logOut from "./routes/logOut";
import getMe from "./routes/getMe";

import validateOriginal from "./routes/uniqueValidation";

import { clients } from "./clientsDataFile";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://andrey7967.github.io/SAY-OUT/"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiep());
app.use("/register", registerUser);
app.use("/login", loginUser);

app.use("/getme", authMiddleware, getMe);
app.use("/logout", logOut);

app.use("/get_message", authMiddleware, getMessage);
app.use("/check_unique", validateOriginal);

const server = http.createServer(app);

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  const token = req.headers.cookie?.split("=")[1];

  if (!token) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();

    return;
  }

  try {
    jwt.verify(token, String(process.env.JWT_SECRET));

    wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
      wss.emit("connection", ws, req);
    });
  } catch (err) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
  }
});

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
  const token = req.headers.cookie?.split("=")[1];

  if (!token) return;
  clients.set(token, ws);

  ws.on("message", async (message) => {
    if (!token) {
      return;
    }
    try {
      const decoded = jwt.verify(token, String(process.env.JWT_SECRET)) as {
        userId: number;
      };

      const received = JSON.parse(String(message));

      const messageData = await pool.query(
        `
        INSERT INTO messages (content,user_id) VALUES ($1,$2) RETURNING id;
        

        `,
        [received.content, decoded.userId]
      );

      const result = await pool.query(
        `
        
        SELECT  nickname FROM users WHERE id = $1; 

        `,
        [decoded.userId]
      );
      const userData = result.rows[0];

      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              id: messageData.rows[0].id,
              author_id: decoded.userId,
              nickname: userData.nickname,
              content: received.content,
            })
          );
        }
      });
    } catch (err) {
      console.error("Error handling message:", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nickname VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
     
    );
    CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

  `);
  console.log("Таблицы созданы");
}

pool.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

server.listen(PORT, "0.0.0.0", async () => {
  await createTables();
  console.log(`Server running on http://localhost:${PORT}`);
});
