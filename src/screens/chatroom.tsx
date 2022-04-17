import { Auth } from "firebase/auth";

function Chatroom({ auth }: { auth: Auth }) {
  return (
    <>
      <button
        className="bg-red-600 p-2 rounded-md font-semibold border-red-700 hover:bg-red-700 text-white"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </>
  );
}

export default Chatroom;
