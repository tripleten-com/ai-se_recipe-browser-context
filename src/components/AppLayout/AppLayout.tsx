import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
