import { createContext, useState, FC } from "react";
import { SharedContextState } from "./ContextType";

const contextDefaultValues: SharedContextState = {
  changeNotification: function (): void {},
  changeLoading: function (): void {},
  setLocation: function (): void {},
  notification: { open: false, message: "" },
  loading: false,
  home: true,
};

type Props = {
  children?: React.ReactNode;
};

export const SharedContext =
  createContext<SharedContextState>(contextDefaultValues);

const SharedProvider: FC<Props> = ({ children }) => {
  const [notification, setNotification] = useState(
    contextDefaultValues.notification
  );

  const [home, setHome] = useState<boolean>(contextDefaultValues.home);

  const [loading, setLoading] = useState(contextDefaultValues.loading);

  const changeNotification = (open: boolean, message: string) => {
    setNotification({ open: open, message: message });
  };

  const changeLoading = (state: boolean) => {
    setLoading(state);
  };

  const setLocation = (state: boolean) => {
    setHome(state);
  };

  return (
    <SharedContext.Provider
      value={{
        changeNotification,
        changeLoading,
        setLocation,
        home,
        notification,
        loading,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};

export default SharedProvider;
