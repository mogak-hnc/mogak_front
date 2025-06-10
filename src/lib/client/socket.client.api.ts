import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

let stompClient: Client | null = null;

type ConnectSocketParams = {
  mogakZoneId: string;
  onConnect?: () => void;
  onError?: (err: any) => void;
};

export function connectSocket({
  mogakZoneId,
  onConnect,
  onError,
}: ConnectSocketParams) {
  if (stompClient && stompClient.connected) return;

  const token = getJwtFromCookie();
  if (!token) {
    return;
  }

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/ws`),
    connectHeaders: {
      Authorization: token,
      mogakZoneId,
    },
    debug: (str) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[STOMP]", str);
      }
    },
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("웹소켓 연결 성공");
      onConnect?.();
    },
    onStompError: (frame) => {
      console.error("STOMP 연결 에러", frame);
      onError?.(frame);
    },
  });

  stompClient.activate();
}

export function subscribeSocket<T>(topic: string, onMessage: (msg: T) => void) {
  if (!stompClient || !stompClient.connected) {
    console.warn("소켓 연결이 아직 안 됨");
    return;
  }

  stompClient.subscribe(topic, (message: IMessage) => {
    try {
      const payload = JSON.parse(message.body);
      onMessage(payload);
    } catch (err) {
      console.error("메시지 파싱 오류:", err);
    }
  });
}

export function disconnectSocket() {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
    console.log("웹소켓 연결 종료");
  }
}
