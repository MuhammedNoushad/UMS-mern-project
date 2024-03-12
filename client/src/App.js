import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavbarComponent from "./constents/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./constents/Footer";
import Home from "./comoponents/Home";
import Login from "./comoponents/Login";
import Signup from "./comoponents/Signup";
import { ToastProvider } from "./UI/Toaster";
import AdminHome from "./comoponents/AdminHome";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <Router className="App">
      <ToastProvider>
        <NavbarComponent />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RequireAuth loginPath="/login">
                <Home />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/admin"
            element={
              <RequireAuth loginPath="/login">
                <AdminHome />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </ToastProvider>
    </Router>
  );
}

export default App;
