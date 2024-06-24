import React, { useReducer, useState } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();

      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
    navigate("/" + role + "/login");
  } else {
    console.error("Unhandled error message: ", errorMessage);
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    //TODO: Check local storage for auth details and update state if they exist
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user_id"));
    const role = localStorage.getItem("role");

    if (token && user && role) {
      sdk.check(role).then(
        // Logs-in if token is valid
        (data) => {
          dispatch({
            type: "LOGIN",
            payload: { token, user, role },
          });
          setLoading(false);
        },
        (error) => {
          console.error("Token check failed:", error);
          localStorage.clear(); // Clear invalid token
          setLoading(false);
          window.location.href = "/" + role + "/login";
        }
      );
    } else {
      setLoading(false);
    }
  }, [sdk, dispatch]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
