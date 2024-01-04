import {
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import React from "react";

type Action = "INCREMENT" | "DECREMENT";
type ActionType = {
  type: Action;
};
type State = {
  count: number;
};
type Notification = {
  type: "added" | "removed" | "edited";
  read: boolean;
};
type Notifications = Notification[];

const initialState = { count: 0 };
const actionTypes = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default reducer;

type NotificationContextProps = {
  notifications: Notification[];
};

const NotificationContext = createContext<NotificationContextProps | null>(
  null
);
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState([]);
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
