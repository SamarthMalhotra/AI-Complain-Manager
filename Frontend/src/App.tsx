import "./App.css";
import { ToastContainer } from "react-toastify";
import { ProjectProvider } from "./ContextAPI/Context/provider.tsx";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <ProjectProvider>
        <ToastContainer />
        <Outlet />
      </ProjectProvider>
    </>
  );
}
export default App;
