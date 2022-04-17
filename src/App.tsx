import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Chatroom from "./screens/chatroom";
import Login from "./screens/login";

const app = initializeApp({
  apiKey: "AIzaSyAD9LBaaGYpPyQ9XWQ1Ty5WUNbLjvqiZbE",
  authDomain: "test-firechatapp.firebaseapp.com",
  projectId: "test-firechatapp",
  storageBucket: "test-firechatapp.appspot.com",
  messagingSenderId: "335285204863",
  appId: "1:335285204863:web:f5d8e7afda8bd913fb0c4a",
  measurementId: "G-Z6T92H03CH",
});

const auth = getAuth(app);
const firestore = getFirestore(app);
if (document.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      {user ? (
        <Chatroom auth={auth} firestore={firestore} />
      ) : (
        <Login auth={auth} />
      )}
    </>
  );
}

export default App;
