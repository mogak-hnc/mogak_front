import { ZoneChatUiProps } from "@/types/zone.type";
import { getClientUser } from "@/utils/client/user.client.util";
import { getProfileImage } from "@/utils/shared/profile.util";

export default function ChatUI({ messages }: ZoneChatUiProps) {
  const user = getClientUser();

  return (
    <div className="w-full max-w-md h-[600px] mx-auto p-4 bg-white rounded-3xl shadow border border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, idx) =>
          String(msg.memberId) === String(user?.memberId) ? (
            <div key={idx} className="flex justify-end pr-2">
              <div className="bg-yellow-300 text-gray-800 px-4 py-2 rounded-2xl rounded-br-none max-w-xs text-sm">
                <p>{msg.message}</p>
                <p className="text-[10px] text-right mt-1 text-yellow-900/80">
                  {msg.now}
                </p>
              </div>
            </div>
          ) : (
            <div key={idx} className="flex items-start gap-2">
              <img
                src={getProfileImage(msg.imageUrl)}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />

              <div>
                <p className="text-xs text-text">{msg.nickname}</p>
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border max-w-xs text-sm shadow-sm">
                  <p className="text-text">{msg.message}</p>
                  <p className="text-[10px] text-right text-gray-400 mt-1">
                    {msg.now}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex items-center gap-2 mt-4">
        <button className="text-xl text-indigo-500">＋</button>
        <input
          type="text"
          placeholder="Type a message ..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none"
        />
        <button className="text-white bg-indigo-500 p-2 rounded-full">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
