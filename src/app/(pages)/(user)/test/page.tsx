"use client";

import {
  connectAndSubscribeSocket,
  ensureConnected,
  sendChat,
  sendDetail,
  sendStatus,
} from "@/lib/client/socket.client.api";
import { ZoneEntryPost } from "@/lib/client/zone.client.api";

export default function TestPage() {
  const id =
    typeof window !== "undefined" ? localStorage.getItem("memberId") : null;

  const entry = async () => {
    await ZoneEntryPost("2", "");
  };

  const connect = async () => {
    connectAndSubscribeSocket({
      topic: `/topic/api/mogak/zone/2`,
      mogakZoneId: "2",
      onMessage: (parsedRes) => {
        console.log("member 메시지 수신:", parsedRes);
      },
    });
    connectAndSubscribeSocket({
      topic: `/topic/api/mogak/zone/2/message`,
      mogakZoneId: "2",
      onMessage: (parsedRes) => {
        console.log("chat 메시지 수신:", parsedRes);
      },
    });
    connectAndSubscribeSocket({
      topic: `/topic/api/mogak/zone/2/status`,
      mogakZoneId: "2",
      onMessage: (parsedRes) => {
        console.log("status 메시지 수신:", parsedRes);
      },
    });
  };

  const anotherEntryTest = async () => {
    await sendDetail("2");
  };

  const statusTest = async () => {
    if (!id) {
      return;
    }
    await sendStatus("2", "STUDYING", id);
  };

  const chatTest = async () => {
    if (!id) {
      return;
    }
    await sendChat("2", id, "테스트 메시지");
  };

  const exit = async () => {
    await ensureConnected("2");
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          WebSocket 테스트 도구
        </h1>
        <p className="text-sm text-gray-500">
          실시간 연결 및 브로드캐스팅 테스트용 개발 페이지입니다.
        </p>
      </header>

      <section className="mb-6 border-b pb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">기본 정보</h2>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">mogakZoneId :</span>{" "}
            <span className="font-mono text-xs bg-gray-50 px-1 py-0.5 rounded">
              2
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-800">memberId :</span>
            <span className="font-mono text-xs bg-gray-50 px-1 py-0.5 rounded">
              {id || "없음"}
            </span>
          </p>
          <p>
            JWT token 기반으로
            <span className="font-mono text-xs bg-gray-50 px-1 py-0.5 rounded">
              memberId
            </span>
            를 활용한 입장이 수행됩니다.
          </p>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">연결 준비</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={entry}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition font-medium"
          >
            Zone 입장 (POST)
          </button>
          <button
            onClick={connect}
            className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition font-medium"
          >
            WebSocket 연결 및 토픽 일괄 구독
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          서버 메시지 테스트
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={anotherEntryTest}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition font-medium"
          >
            입장 이벤트 전송
          </button>
          <button
            onClick={statusTest}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition font-medium"
          >
            상태 변경 전송
          </button>
          <button
            onClick={chatTest}
            className="bg-lime-600 hover:bg-lime-700 text-white py-2 px-4 rounded-lg transition font-medium"
          >
            채팅 메시지 전송
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">연결 종료</h2>
        <button
          onClick={exit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition font-medium"
        >
          WebSocket 연결 종료
        </button>
      </section>
    </div>
  );
}
