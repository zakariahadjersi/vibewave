import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: "/sign-in",
              element: <SigninForm />,
            },
            {
              path: "/sign-up",
              element: <SignupForm />,
            },
          ],
        },
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <main className="d-flex vh-100">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
