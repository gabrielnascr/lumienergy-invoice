import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const route = useNavigate();

  const tabs = [
    {
      title: "Inicio",
      route: "/dashboard",
    },
    {
      title: "Faturas",
      route: "/dashboard/invoices",
    },
  ];

  return (
    <div className="h-full w-56 bg-[#02231C] flex relative justify-center pt-56">
      <ul className="w-full m-8">
        {tabs.map((tab) => (
          <div
            className={`w-full text-center rounded-md ${
              window.location.pathname === tab.route
                ? "bg-green-500"
                : "transparent"
            }`}
          >
            <li className="mb-2">
              <Link to={tab.route} className="text-white text-xl text-center">
                {tab.title}
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
