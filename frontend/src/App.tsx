/* eslint-disable jsx-a11y/alt-text */
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import Routers from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routers />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
