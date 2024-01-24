import { useContext, createContext, Dispatch, useReducer } from "react";
import React from "react";

type Action = "INCREMENT" | "DECREMENT";
type ActionType = {
  type: Action;
};
export type Notification = {
  type: "added" | "removed" | "edited";
  read: boolean;
  message: string;
  time: string;
};
type Notifications = Notification[];

const initialNotificationsState: [] | Notifications = [];

const reducer = (state: Notifications, action: ActionType): Notifications => {
  switch (action.type) {
    case "INCREMENT":
      return [
        ...state,
        {
          type: "added",
          message: "An user has been added!",
          read: false,
          time: Date(),
        },
      ];
    case "DECREMENT":
      return state;
    default:
      return state;
  }
};

type NotificationContextProps = {
  state: Notifications;
  dispatch: Dispatch<ActionType>;
  NotificationsCount: number;
};

const NotificationContext = createContext<NotificationContextProps | null>(
  null
);
export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialNotificationsState);
  const NotificationsCount: number = state.length;
  return (
    <NotificationContext.Provider
      value={{ state, dispatch, NotificationsCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationsContext = () => {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error(
      "Missing notificationsContext, it's not wraped in ThemeProvider"
    );
  }

  return ctx;
};
