import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

let stompClient: Client;

export function connectSocket(onMessage: (msg: any) => void) {
  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws`),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("소켓 연결");

      stompClient.subscribe("/topic/zone/1", (message: IMessage) => {
        const payload = JSON.parse(message.body);
        onMessage(payload);
      });
    },
  });

  stompClient.activate();
}

export function sendMessage(msg: any) {
  stompClient.publish({
    destination: "/app/zone/1/chat",
    body: JSON.stringify(msg),
  });
}

export function disconnectSocket() {
  stompClient.deactivate();
}
