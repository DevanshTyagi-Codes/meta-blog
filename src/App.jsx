import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";

function App() {
  return (
    <>
      <div className="w-full h-screen relative">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
