import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;