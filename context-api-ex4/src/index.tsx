import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "./contexts/notificationContext";
import { ModalFormConfirmationProvider } from "./contexts/modalFormConfirmationContext";

const Profiles = lazy(() => import("./components/profiles"));
const Profile = lazy(() => import("./components/profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profiles",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profiles />
      </Suspense>
    ),
  },
  {
    path: "/profiles/:id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "/profiles/add",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ModalFormConfirmationProvider>
      <NotificationsProvider>
        <RouterProvider router={router} />
      </NotificationsProvider>
    </ModalFormConfirmationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
