import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

const Layout = () => {
  const { loading } = useAuth();

  return (
    <div className="h-screen flex justify-center items-center ">
      <main className="justify-center p-10 bg-[#02231C] flex flex-col items-center text-center rounded-2xl">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
