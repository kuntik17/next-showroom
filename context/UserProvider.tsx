import { createContext, useState, FC, useEffect, useContext } from "react";
import { UserContextState } from "./ContextType";
import axios from "axios";
import { SharedContext } from "./SharedProvider";
import { setCookies, getCookie, removeCookies } from "cookies-next";

const contextDefaultValues: UserContextState = {
  loginUser: function (): void {},
  logout: function (): void {},
  user: null,
};

type Props = {
  children?: React.ReactNode;
};

export const UserContext =
  createContext<UserContextState>(contextDefaultValues);

const UserProvider: FC<Props> = ({ children }) => {
  const { changeNotification, changeLoading } = useContext(SharedContext);

  const [user, setUser] = useState<Object | null>(contextDefaultValues.user);
  useEffect(() => {
    if (getCookie("token")) {
      autoLogin();
    }
    return () => {};
  }, []);

  const autoLogin = async () => {
    let result = await axios.post(`/api/user/me`, {
      token: getCookie("token"),
    });

    if (result.data.status) {
      setCookies("token", result.data.token, { sameSite: true });
      setCookies("userName", result.data.userName, { sameSite: true });
      setCookies("userMail", result.data.userMail, { sameSite: true });
      setCookies("adminMail", result.data.adminMail, { sameSite: true });
      setUser(result.data.token);
    } else {
      changeNotification(true, result.data.error);
    }
  };

  const loginUser = async (user: any) => {
    changeLoading(true);
    try {
      let result = await axios.post(`/api/user/login`, {
        user,
      });

      if (result.data.status) {
        setCookies("token", result.data.token, { sameSite: true });
        setCookies("userName", result.data.userName, { sameSite: true });
        setCookies("userMail", result.data.userMail, { sameSite: true });
        setCookies("adminMail", result.data.adminMail, { sameSite: true });
        setUser(result.data.token);
      } else {
        changeNotification(true, result.data.error);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
    changeLoading(false);
  };

  const logout = () => {
    setUser(null);
    removeCookies("token");
    removeCookies("userName");
    removeCookies("userMail");
    removeCookies("adminMail");
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        logout,
        loginUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
