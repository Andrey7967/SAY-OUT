"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const env_1 = require("./config/env");
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const getMessages_1 = __importDefault(require("./routes/getMessages"));
const auth_1 = __importDefault(require("./middleware/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logOut_1 = __importDefault(require("./routes/logOut"));
const getMe_1 = __importDefault(require("./routes/getMe"));
const uniqueValidation_1 = __importDefault(require("./routes/uniqueValidation"));
const clientsDataFile_1 = require("./clientsDataFile");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://192.168.1.129:5173"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/register", register_1.default);
app.use("/login", login_1.default);
app.use("/getme", auth_1.default, getMe_1.default);
app.use("/logout", logOut_1.default);
app.use("/get_message", auth_1.default, getMessages_1.default);
app.use("/check_unique", uniqueValidation_1.default);
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ noServer: true });
server.on("upgrade", (req, socket, head) => {
    const token = req.headers.cookie?.split("=")[1];
    if (!token) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    }
    catch (err) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
    }
});
wss.on("connection", (ws, req) => {
    const token = req.headers.cookie?.split("=")[1];
    if (!token)
        return;
    clientsDataFile_1.clients.set(token, ws);
    ws.on("message", async (message) => {
        if (!token) {
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
            const received = JSON.parse(String(message));
            const messageData = await db_1.default.query(`
        INSERT INTO messages (content,user_id) VALUES ($1,$2) RETURNING id;
        

        `, [received.content, decoded.userId]);
            const result = await db_1.default.query(`
        
        SELECT  nickname FROM users WHERE id = $1; 

        `, [decoded.userId]);
            const userData = result.rows[0];
            clientsDataFile_1.clients.forEach((client) => {
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        id: messageData.rows[0].id,
                        author_id: decoded.userId,
                        nickname: userData.nickname,
                        content: received.content,
                    }));
                }
            });
        }
        catch (err) {
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
    await db_1.default.query(`
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
db_1.default.connect((err) => {
    if (err) {
        console.error("Connection error", err.stack);
    }
    else {
        console.log("Connected to the database");
    }
});
server.listen(env_1.PORT, "0.0.0.0", async () => {
    await createTables();
    console.log(`Server running on http://localhost:${env_1.PORT}`);
});
