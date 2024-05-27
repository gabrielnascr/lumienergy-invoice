/* eslint-disable jsx-a11y/alt-text */
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import Routers from "./routes";
import ModalContainer from "./components/Modal";

function App() {
  return (
    <AuthProvider>
      <Routers />
      <Toaster />
      <ModalContainer />
    </AuthProvider>
  );
}

export default App;
