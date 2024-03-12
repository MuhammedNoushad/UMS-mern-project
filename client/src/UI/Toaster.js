// ToastContext.js
import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      <ToastContainer />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
