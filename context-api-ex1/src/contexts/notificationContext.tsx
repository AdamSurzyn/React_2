import { useContext, createContext, Dispatch, useReducer } from "react";
import React from "react";

type Action = "INCREMENT" | "DECREMENT";
type ActionType = {
  type: Action;
};
type Notification = {
  type: "added" | "removed" | "edited";
  read: boolean;
  message: string;
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

/**
 *
 * Plan jest taki, ze:
 * Reducer bedzie uzyty przy przyciskach w komponencie 'profiles'
 * Reducer w innym pliku?
 * Po kazdej zmianie bedzie szedl api call, zalezny od akcji do json-server
 * Przy kazdym dodaniu/edycji/usunieciu profilu, do contextu bedzie dodawane, ile jest zmian i jaka byla ostatnia zmiana() i jej czas
 * Context wyswietlany jako koleczko w ktoryms rogu, o kolorze zaleznie od zmiany, majac w srodku liczbe zmian. Po kliknieciu pokazuje sie czas zmiany w modalu. Zeby trackowac wszystkie zmiany, musze je trzymac w jakims arrayu.
 * !Czy jest opcja robienia api calla, przy zmianie aktualnej strony? W ten sposob moglbym trzymac informacje o aktualnych profilach w jakims arrayu
 * !i robic call w momencie, w ktorym jest to potrzebne i mam potencjalnie pare zmian do wprowadzenia na raz. Moglbym uzyc do tego stanu, trackujacego url albo cos. Ew za bardzo kombinuje xd
 *
 */
