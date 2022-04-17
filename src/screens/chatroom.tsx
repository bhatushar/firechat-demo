import { Auth } from "firebase/auth";
import {
  Firestore,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  FieldValue,
} from "firebase/firestore";
import { FormEvent, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Chat from "../components/chat";

interface ChatData {
  id?: string;
  authorId: string;
  photoUrl: string | undefined;
  message: string;
  createdAt: FieldValue;
}

const chatConverter: FirestoreDataConverter<ChatData> = {
  toFirestore({
    authorId,
    photoUrl,
    message,
    createdAt,
  }: WithFieldValue<ChatData>): DocumentData {
    return { authorId, photoUrl, message, createdAt };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions
  ): ChatData {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      authorId: data.authorId,
      photoUrl: data.photoUrl,
      message: data.message,
      createdAt: data.createdAt,
    };
  },
};
function Chatroom({ auth, firestore }: { auth: Auth; firestore: Firestore }) {
  const chatRef = collection(firestore, "chats").withConverter(chatConverter);
  const chatQuery = query(chatRef, orderBy("createdAt"));
  const [chats] = useCollectionData(chatQuery);

  console.log(chats);

  const [msg, setMsg] = useState<string>("");

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const message = msg;
    setMsg("");
    await addDoc(chatRef, {
      message,
      authorId: auth.currentUser?.uid as string,
      photoUrl: auth.currentUser?.photoURL as string,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-gray-900 flex justify-between px-6 py-1">
        <h1 className="font-bold text-xl text-white">Firechat🔥</h1>
        <button
          className="bg-red-600 p-1 rounded-md border-red-700 hover:bg-red-700 text-white"
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      </header>

      {/* Chat section */}
      <section className="bg-white pb-14 px-1 md:px-6">
        {chats &&
          chats.map((chat) => (
            <Chat
              key={chat.id}
              type={
                chat.authorId === auth.currentUser?.uid ? "sent" : "received"
              }
              photoUrl={chat.photoUrl}
              message={chat.message}
            />
          ))}
      </section>

      {/* Input field */}
      <section className="fixed bottom-1 h-12 w-full px-2">
        <form action="#" onSubmit={sendMessage} className="flex">
          <input
            type="text"
            name="msgInput"
            id="msgInput"
            value={msg}
            placeholder="Type your message here..."
            onChange={(event) => setMsg(event.target.value)}
            className="flex-1 border-2 border-r-0 border-gray-500 rounded-l-xl h-12 p-3"
          />
          <input
            type="submit"
            value="Send"
            disabled={!msg}
            className="flex-initial px-6 bg-green-600 text-white hover:bg-green-700 cursor-pointer rounded-r-xl"
          />
        </form>
      </section>
    </>
  );
}

export default Chatroom;
