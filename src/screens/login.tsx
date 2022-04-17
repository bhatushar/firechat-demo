import { Auth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login({ auth }: { auth: Auth }) {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="font-bold text-6xl text-center">Firechat🔥</h1>
        <button
          className="p-2 bg-red-600 text-white font-semibold rounded-md border-red-700 hover:bg-red-700"
          onClick={async () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
