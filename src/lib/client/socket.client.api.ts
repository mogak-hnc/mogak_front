import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

let stompClient: Client | null = null;

export function connectAndSubscribeSocket<T>({
  mogakZoneId,
  onMessage,
}: {
  mogakZoneId: string;
  onMessage: (msg: T) => void;
}) {
  if (stompClient && stompClient.connected) {
    console.log("이미 연결됨. 구독 바로 진행");
    subscribeDetail(mogakZoneId, onMessage);
    return;
  }

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
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("웹소켓 연결 성공");
      subscribeDetail(mogakZoneId, onMessage);
    },
    onStompError: (frame) => {
      console.error("STOMP 에러", frame);
    },
  });

  stompClient.activate();
}

export function subscribeDetail<T>(id: string, onMessage: (msg: T) => void) {
  if (!stompClient || !stompClient.connected) {
    console.warn("소켓 연결 안 됨");
    connectAndSubscribeSocket({ mogakZoneId: id, onMessage });
    return;
  }

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }
  const topic = `/topic/api/mogak/zone/${id}`;
  console.log("토픽 구독 시작:", topic);

  stompClient.subscribe(
    topic,
    (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        console.log("수신된 메시지:", payload);
        onMessage(payload);
      } catch (err) {
        console.error("메시지 파싱 오류:", err);
      }
    },
    { Authorization: jwt, mogakZoneId: id }
  );
}

export function sendStatus(zoneId: string, memberId: string, message: string) {
  if (!stompClient || !stompClient.connected) {
    console.warn("소켓 연결 안 됨");
    return;
  }

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  stompClient.publish({
    destination: `/app/api/mogak/zone/${zoneId}/status`,
    headers: {
      Authorization: jwt,
      mogakZoneId: String(zoneId),
    },
    body: JSON.stringify({ memberId, message }),
  });
}

export function disconnectSocket() {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
    console.log("웹소켓 연결 종료");
  }
}
