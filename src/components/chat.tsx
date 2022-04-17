interface ChatProps {
  type: "sent" | "received";
  author: string;
  message: string;
}

function Chat({ type, author, message }: ChatProps) {
  return (
    <div
      className={`flex ${type === "sent" ? "justify-end" : "justify-start"}`}
    >
      <div className="mx-2 my-1">
        {type === "received" && (
          <div className="text-gray-500 text-sm">{author}</div>
        )}
        <div
          className={`px-2 py-1 rounded-2xl ${
            type === "received"
              ? "bg-slate-200 text-black"
              : "bg-blue-600 text-white"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

export default Chat;
