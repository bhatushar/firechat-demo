import defaultProfilePhoto from "../assets/default-profile-picture.jpg";
interface ChatProps {
  type: "sent" | "received";
  photoUrl?: string;
  message: string;
}

function Chat({ type, photoUrl, message }: ChatProps) {
  return (
    <div
      className={`flex gap-2 ${
        type === "sent" ? "justify-end" : "justify-start"
      }`}
    >
      {type === "received" && (
        <img
          src={photoUrl ?? defaultProfilePhoto}
          alt="Photo"
          className="rounded-full w-9 h-9 mt-2"
        />
      )}
      <div
        className={`px-2 py-1 rounded-2xl mt-2 ${
          type === "received"
            ? "bg-slate-200 text-black"
            : "bg-blue-600 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default Chat;
