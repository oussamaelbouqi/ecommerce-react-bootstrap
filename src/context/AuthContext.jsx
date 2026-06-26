/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const readStorage = (key, fallback) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
};

export default function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage("shopUsers", []));
  const [currentUser, setCurrentUser] = useState(() =>
    readStorage("currentUser", null)
  );

  useEffect(() => {
    localStorage.setItem("shopUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const register = ({ name, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((user) => user.email === cleanEmail)) {
      return { ok: false, message: "This email is already registered." };
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password,
      joinedAt: new Date().toISOString(),
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      joinedAt: newUser.joinedAt,
    });
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = users.find(
      (user) => user.email === cleanEmail && user.password === password
    );

    if (!foundUser) {
      return { ok: false, message: "Invalid email or password." };
    }

    setCurrentUser({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      joinedAt: foundUser.joinedAt,
    });
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  const updateProfile = ({ name }) => {
    if (!currentUser) return;
    const nextUser = { ...currentUser, name: name.trim() };
    setCurrentUser(nextUser);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === nextUser.id ? { ...user, name: nextUser.name } : user
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
