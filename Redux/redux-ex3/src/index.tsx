import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profiles from "./components/profiles";
import Profile from "./components/profile";
import { NotificationsProvider } from "./contexts/notificationContext";
import { ModalFormConfirmationProvider } from "./contexts/modalFormConfirmationContext";
import LoginForm from "./components/loginForm";
import { store } from "./store";
import { Provider } from "react-redux";
import BankingForm from "./components/bankingForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profiles",
    element: <Profiles />,
  },
  {
    path: "/profiles/:id",
    element: <Profile />,
  },
  {
    path: "/profiles/add",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/bank",
    element: <BankingForm />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalFormConfirmationProvider>
        <NotificationsProvider>
          <RouterProvider router={router} />
        </NotificationsProvider>
      </ModalFormConfirmationProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
