// frontend/src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const appData = JSON.parse(localStorage.getItem("Expense-Tracker-App"));
        if (appData?.token && appData?.user) {
            setUser(appData.user);
            setToken(appData.token);
        }
        setLoading(false);
    }, []);

    const login = (data) => {
        const appData = {
            token: data.token,
            user: data.user
        };
        localStorage.setItem("Expense-Tracker-App", JSON.stringify(appData));
        setUser(data.user);
        setToken(data.token);
    };
    const logout = () => {
        localStorage.removeItem("Expense-Tracker-App");
        setUser(null);
        setToken(null);
    }
    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}