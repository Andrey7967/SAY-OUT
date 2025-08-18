import { WebSocket } from "ws";
export interface AuthWS extends WebSocket {
    ws: WebSocket,
    authToken: string,
}
