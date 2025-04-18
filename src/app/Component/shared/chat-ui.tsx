import { ChatUiProps } from "@/types";

export default function ChatUI({ messages }: ChatUiProps) {
  return (
    <div className="w-full max-w-md h-[600px] mx-auto p-4 bg-white rounded-3xl shadow border border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg) =>
          msg.isMe ? (
            <div key={msg.id} className="flex justify-end pr-2">
              <div className="bg-yellow-300 text-gray-800 px-4 py-2 rounded-2xl rounded-br-none max-w-xs text-sm">
                <p>{msg.message}</p>
                <p className="text-[10px] text-right mt-1 text-yellow-900/80">
                  {msg.time}
                </p>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-start gap-2">
              {msg.avatar ? (
                <img
                  src={msg.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300" />
              )}

              <div>
                <p className="text-xs text-gray-500">{msg.user}</p>
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border max-w-xs text-sm shadow-sm">
                  <p>{msg.message}</p>
                  <p className="text-[10px] text-right text-gray-400 mt-1">
                    {msg.time}
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
