import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Signup from "./Signup&Login/Signup.tsx";
import Login from "./Signup&Login/Login.tsx";
import App from "./App.tsx";
import ComplaintForm from "./ComplaintForm.tsx";
import Dashboard from "./DashBoard/Dashboard.tsx";
import Home from "./HomeBox/Home.tsx";
import Admin from "./Admin.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <ComplaintForm /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
