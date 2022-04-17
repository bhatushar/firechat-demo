import { Auth } from "firebase/auth";
import Chat from "../components/chat";

function Chatroom({ auth }: { auth: Auth }) {
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

      <section className="bg-white pb-14 md:px-6">{/* Chat section */}</section>

      {/* Input field */}
      <section className="fixed bottom-1 h-12 w-full px-2">
        <form action="#" className="flex">
          <input
            type="text"
            name="msgInput"
            id="msgInput"
            placeholder="Type your message here..."
            className="flex-1 border-2 border-r-0 border-gray-500 rounded-l-xl h-12 p-3"
          />
          <input
            type="submit"
            value="Send"
            className="flex-initial px-6 bg-green-600 text-white hover:bg-green-700 cursor-pointer rounded-r-xl"
          />
        </form>
      </section>
    </>
  );
}

export default Chatroom;
