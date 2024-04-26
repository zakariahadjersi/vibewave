import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { AllUsers, CreatePoste, EditPoste, Explore, Home, PosteDetails, Profile, Saved, UpdateProfile } from "./_root/pages";
import { AuthProvider } from "./context/AuthContext";
import { postAction } from "./components/forms/PostForm";

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
            {
              path: "/explore",
              element: <Explore />,
            },
            {
              path: "/saved",
              element: <Saved />,
            },
            {
              path: "/all-users",
              element: <AllUsers />,
            },
            {
              path: "/create-post",
              element: <CreatePoste />,
              action: postAction
            },
            {
              path: "/update-post/:id",
              element: <EditPoste />,
            },
            {
              path: "/posts/:id",
              element: <PosteDetails />,
            },
            {
              path: "/profile/:id/*",
              element: <Profile />,
            },
            {
              path: "/update-profile/:id",
              element: <UpdateProfile />,
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
