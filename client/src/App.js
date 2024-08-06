import "../src/style/index.css";
import "../src/style/responsive.css";
import Login from "./components/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import { authenticatedUser } from "./service/authentication";
import EmployeePortal from '../src/portal/employee/Index'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});


  useEffect(() => {
    // IIFE for async operation
    (async () => {
      try {
        const res = await authenticatedUser();
        console.log("res", res)
        if (res.status === "success") {
          setIsAuthenticated(true);
          setUser(res);
        } else {
          setIsAuthenticated(false)
        }

      } catch (error) {
        console.log("error", error)
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser({});
  };


  const renderPortal = () => {
    switch (user.role) {
      case "emp":
        return <EmployeePortal onLogout={handleLogout} />;
      case "HR":
        return <h1>Hr portal</h1>;
      default:
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
  };

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setUser(user);
  };



  return (
    <div>
      <ToastContainer position="top-right" />
      {
        isAuthenticated && user.role ? (
          renderPortal()
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )
      }
    </div>
  );
}

export default App;
