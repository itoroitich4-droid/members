import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;