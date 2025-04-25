// lib/socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:5173", {
  withCredentials: true, 
  transports: ["websocket"],
});

export default socket;
