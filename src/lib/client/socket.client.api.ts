import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

let stompClient: Client | null = null;

export function connectAndSubscribeSocket<T>({
  topic,
  mogakZoneId,
  onMessage,
}: {
  topic: string;
  mogakZoneId: string;
  onMessage: (msg: T) => void;
}) {
  if (stompClient && stompClient.connected) {
    console.log("이미 연결됨. 구독 바로 진행");
    subscribe(topic, mogakZoneId, onMessage);
    return;
  }

  const token = getJwtFromCookie();
  if (!token) {
    return;
  }

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/ws`),
    connectHeaders: {
      Authorization: token,
      mogakZoneId,
    },
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("웹소켓 연결 성공");
      subscribe(topic, mogakZoneId, onMessage);
    },
    onStompError: (frame) => {
      console.error("STOMP 에러", frame);
    },
  });

  stompClient.activate();
}

export function subscribe<T>(
  topic: string,
  id: string,
  onMessage: (msg: T) => void
) {
  if (!stompClient || !stompClient.connected) {
    // console.warn("소켓 연결 안 됨");
    // connectAndSubscribeSocket({ topic, mogakZoneId: id, onMessage });
    return;
  }

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

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

export async function sendDetail(zoneId: string) {
  console.log("sendDetail");

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);
    await waitUntilConnected();

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
    });

    console.log("detail 전송 성공");
  } catch (err) {
    console.error("detail 전송 실패", err);
  }
}

export async function sendChat(
  zoneId: string,
  memberId: string,
  message: string
) {
  console.log("sendChat");

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);
    await waitUntilConnected();

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}/message`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
      body: JSON.stringify({ memberId, message }),
    });

    console.log("chat 전송 성공");
  } catch (err) {
    console.error("chat 전송 실패", err);
  }
}

export async function sendStatus(
  zoneId: string,
  status: string,
  memberId: string
) {
  console.log("sendStatus");

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);
    await waitUntilConnected();

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}/status`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
      body: JSON.stringify({ memberId, status }),
    });
  } catch (err) {
    console.error("status 전송 실패", err);
  }
}

export function disconnectSocket() {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
    console.log("웹소켓 연결 종료");
  }
}

function waitUntilConnected(timeout = 3000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      if (stompClient && stompClient.connected) {
        resolve();
      } else if (Date.now() - start > timeout) {
        console.warn("소켓 연결 타임아웃");
        reject();
      } else {
        setTimeout(check, 100);
      }
    };

    check();
  });
}

async function ensureConnected(mogakZoneId: string): Promise<void> {
  const token = getJwtFromCookie();
  if (!token) throw new Error("JWT 없음");

  if (stompClient && stompClient.connected) return;

  return new Promise((resolve, reject) => {
    stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/ws`),
      connectHeaders: {
        Authorization: token,
        mogakZoneId,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("ensureConnected: 연결 성공");
        resolve();
      },
      onStompError: (frame) => {
        console.error("ensureConnected: STOMP 에러", frame);
        reject(new Error("웹소켓 연결 실패"));
      },
    });

    stompClient.activate();
  });
}
