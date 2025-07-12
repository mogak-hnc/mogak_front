// socket.client.api.ts
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
  connectSocket();

  const waitAndSubscribe = async () => {
    try {
      await waitUntilConnected();
      subscribe(topic, mogakZoneId, onMessage);
    } catch (e) {
      console.error("소켓 연결 실패: 구독 못 함", e);
    }
  };

  waitAndSubscribe();
}

export function connectSocket(): void {
  if (stompClient && stompClient.connected) {
    console.log("이미 연결됨");
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
    },
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("웹소켓 연결 성공");
    },
    onStompError: (frame) => {
      console.error("STOMP 에러:", frame);
    },
  });

  stompClient.activate();
}

export function subscribe<T>(
  topic: string,
  mogakZoneId: string,
  onMessage: (msg: T) => void
): void {
  if (!stompClient || !stompClient.connected) {
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

        const isSystemMessage =
          typeof payload === "object" &&
          "sessionId" in payload &&
          "memberId" in payload &&
          "mogakZoneId" in payload &&
          "name" in payload &&
          Object.keys(payload).length === 4;

        if (isSystemMessage) {
          return;
        }

        console.log("수신된 메시지:", payload, topic);
        onMessage(payload);
      } catch (err) {
        console.error("메시지 파싱 오류:", err);
      }
    },
    { Authorization: jwt, mogakZoneId }
  );
}

export async function sendDetail(zoneId: string) {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected();

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
    });
  } catch (err) {
    console.error("detail 전송 실패", err);
  }
}

export async function sendChat(
  zoneId: string,
  memberId: string,
  message: string
) {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected();

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}/message`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
      body: JSON.stringify({ memberId, message }),
    });
  } catch (err) {
    console.error("chat 전송 실패", err);
  }
}

export async function sendStatus(
  zoneId: string,
  status: string,
  memberId: string
) {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected();

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
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
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
        reject(new Error("소켓 연결 타임아웃"));
      } else {
        setTimeout(check, 100);
      }
    };

    check();
  });
}

export async function ensureConnected(): Promise<void> {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 없음");
  }

  if (stompClient && stompClient.connected) {
    return;
  }

  if (!stompClient) {
    connectSocket();
  }

  await waitUntilConnected();
}
