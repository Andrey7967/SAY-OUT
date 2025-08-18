export interface User {
    id?: number;
    name: string;
    email: string;
    age?: number;
}


namespace WebSocket {
    interface WebSocket {
        authToken: string,
    }
}
