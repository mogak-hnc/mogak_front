import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

let stompClient: Client | null = null;
let isConnecting = false;

type TopicHandler<T = unknown> = {
  mogakZoneId: string;
  onMessage: (msg: T) => void;
};

const subscribedTopics = new Map<string, TopicHandler>();

export async function connectAndSubscribeSocket<T>({
  topic,
  mogakZoneId,
  onMessage,
}: {
  topic: string;
  mogakZoneId: string;
  onMessage: (msg: T) => void;
}) {
  // console.log("connectAndSubscribeSocket 시도 : ", topic);

  const token = getJwtFromCookie();
  if (!token) {
    console.log("[socket] JWT 없음. 구독 중단");
    return;
  }

  if (isConnecting) {
    // console.log("[socket] 다른 컴포넌트가 연결 중... 대기");
    await waitUntilConnected();
  } else if (!stompClient || !stompClient.connected) {
    // console.log("[socket] 새로운 웹소켓 연결 시도");
    await ensureConnected(mogakZoneId);
  } else {
    // console.log("[socket] 기존 웹소켓 연결 재사용");
  }

  subscribe(topic, mogakZoneId, onMessage);
}

export function subscribe<T>(
  topic: string,
  mogakZoneId: string,
  onMessage: (msg: T) => void
) {
  if (!stompClient || !stompClient.connected) {
    return;
  }

  if (subscribedTopics.has(topic)) {
    // console.log("[socket] 이미 구독한 토픽:", topic);
    return;
  }

  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  console.log("[socket] 토픽 구독 시작:", topic);
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
          // console.log("[socket] 시스템 브로드캐스트 무시:", payload);
          return;
        }

        console.log("[socket] 수신된 메시지:", payload, topic);
        onMessage(payload);
      } catch (err) {
        console.error("[socket] 메시지 파싱 오류:", err);
      }
    },
    { Authorization: jwt, mogakZoneId }
  );

  subscribedTopics.set(topic, {
    mogakZoneId,
    onMessage: (msg) => onMessage(msg as T),
  });
}

let onConnectedCallback: (() => void) | null = null;

export function setOnConnectedCallback(cb: () => void) {
  onConnectedCallback = cb;
}

export async function ensureConnected(mogakZoneId: string): Promise<void> {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 없음");
  }

  if (!stompClient || !stompClient.active) {
    stompClient = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/ws`),
      connectHeaders: {
        Authorization: token,
        mogakZoneId,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("[socket] 웹소켓 연결 성공");
        if (onConnectedCallback) {
          onConnectedCallback();
        }
        subscribedTopics.forEach((sub, topic) =>
          subscribe(topic, sub.mogakZoneId, sub.onMessage)
        );
      },
      onStompError: (frame) => {
        console.error("[socket] STOMP 에러:", frame);
      },
    });
  }

  if (!stompClient.connected && !isConnecting) {
    isConnecting = true;
    stompClient.activate();
    await waitUntilConnected();
    isConnecting = false;
  } else {
    await waitUntilConnected();
  }
}

function waitUntilConnected(timeout = 10000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (stompClient && stompClient.connected) {
        resolve();
      } else if (Date.now() - start > timeout) {
        reject("[socket] 소켓 연결 타임아웃");
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
  // console.log("[socket] sendStatus 호출됨");
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);
    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}/status`,
      headers: { Authorization: jwt, mogakZoneId: String(zoneId) },
      body: JSON.stringify({ memberId, status }),
    });
    // console.log("[socket] status 전송 성공");
  } catch (err) {
    console.error("[socket] status 전송 실패", err);
  }
}

export async function sendChat(
  zoneId: string,
  memberId: string,
  message: string
) {
  // console.log("[socket] sendChat 호출됨");
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);
    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}/message`,
      headers: { Authorization: jwt, mogakZoneId: String(zoneId) },
      body: JSON.stringify({ memberId, message }),
    });
    // console.log("[socket] chat 전송 성공");
  } catch (err) {
    console.error("[socket] chat 전송 실패", err);
  }
}

export async function sendDetail(zoneId: string) {
  // console.log("[socket] sendDetail 호출됨");
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  try {
    await ensureConnected(zoneId);
    stompClient!.publish({
      destination: `/app/api/mogak/zone/${zoneId}`,
      headers: { Authorization: jwt, mogakZoneId: String(zoneId) },
    });
    // console.log("[socket] detail 전송 성공");
  } catch (err) {
    console.error("[socket] detail 전송 실패", err);
  }
}

export function disconnectSocket() {
  if (stompClient) {
    console.log("[socket] 웹소켓 연결 종료 및 구독 초기화");
    stompClient.deactivate();
    stompClient = null;
    subscribedTopics.clear();
    isConnecting = false;
  }
}
