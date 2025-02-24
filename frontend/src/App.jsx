import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Success from "./Pages/Success/Success";
import "./App.css";


// Component to wrap protected routes
const ProtectedRoute = ({ children }) => {
  return <SignedIn>{children}</SignedIn>;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
