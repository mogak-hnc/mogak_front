import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

let stompClient: Client | null = null;
let isConnecting = false;

export async function connectAndSubscribeSocket<T>({
  topic,
  mogakZoneId,
  onMessage,
}: {
  topic: string;
  mogakZoneId: string;
  onMessage: (msg: T) => void;
}) {
  console.log("connectAndSubscribeSocket 시도 : ", topic);

  const token = getJwtFromCookie();
  if (!token) {
    console.log("❌ JWT 없음. 구독 중단");
    return;
  }

  await ensureConnected(mogakZoneId);
  subscribe(topic, mogakZoneId, onMessage);
}

const subscribedTopics = new Set<string>();

export function subscribe<T>(
  topic: string,
  mogakZoneId: string,
  onMessage: (msg: T) => void
) {
  if (!stompClient || !stompClient.connected) {
    return;
  }

  if (subscribedTopics.has(topic)) {
    console.log("⚠️ 이미 구독한 토픽:", topic);
    return;
  }

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  console.log("📡 토픽 구독 시작:", topic);
  stompClient.subscribe(
    topic,
    (message: IMessage) => {
      try {
        const payload = JSON.parse(message.body);
        const isSystemBroadcast =
          typeof payload === "object" &&
          "sessionId" in payload &&
          "memberId" in payload &&
          "mogakZoneId" in payload &&
          "name" in payload &&
          Object.keys(payload).length === 4;

        if (isSystemBroadcast) {
          console.log("📭 시스템 브로드캐스트 무시:", payload);
          return;
        }

        console.log("📨 수신된 메시지:", payload, topic);
        onMessage(payload);
      } catch (err) {
        console.error("❗ 메시지 파싱 오류:", err);
      }
    },
    { Authorization: jwt, mogakZoneId }
  );

  subscribedTopics.add(topic);
}

export async function ensureConnected(mogakZoneId: string): Promise<void> {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 없음");
  }

  if (stompClient && stompClient.connected) {
    return;
  }

  if (!stompClient) {
    stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/ws`),
      connectHeaders: {
        Authorization: token,
        mogakZoneId,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ 웹소켓 연결 성공");
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 에러:", frame);
      },
    });
  }

  if (!stompClient.active && !isConnecting) {
    isConnecting = true;
    stompClient.activate();
    await waitUntilConnected();
    isConnecting = false;
  } else {
    await waitUntilConnected();
  }
}

function waitUntilConnected(timeout = 3000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (stompClient && stompClient.connected) {
        resolve();
      } else if (Date.now() - start > timeout) {
        reject("❌ 소켓 연결 타임아웃");
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

export async function sendStatus(
  zoneId: string,
  status: string,
  memberId: string
) {
  console.log("📤 sendStatus 호출됨");

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}/status`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
      body: JSON.stringify({ memberId, status }),
    });
    console.log("✅ status 전송 성공");
  } catch (err) {
    console.error("❌ status 전송 실패", err);
  }
}

export async function sendChat(
  zoneId: string,
  memberId: string,
  message: string
) {
  console.log("📤 sendChat 호출됨");

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}/message`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
      body: JSON.stringify({ memberId, message }),
    });
    console.log("✅ chat 전송 성공");
  } catch (err) {
    console.error("❌ chat 전송 실패", err);
  }
}

export async function sendDetail(zoneId: string) {
  console.log("📤 sendDetail 호출됨");

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);

    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}`,
      headers: {
        Authorization: jwt,
        mogakZoneId: String(zoneId),
      },
    });

    console.log("✅ detail 전송 성공");
  } catch (err) {
    console.error("❌ detail 전송 실패", err);
  }
}

export function disconnectSocket() {
  if (stompClient && stompClient.connected) {
    stompClient.deactivate();
    console.log("🛑 웹소켓 연결 종료");
  }
}
