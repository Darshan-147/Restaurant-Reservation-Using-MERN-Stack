import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Success from "./Pages/Success/Success";
import "./App.css";

// Component to handle SignedOut state
const SignedOutPage = () => (
  <div className="sign-in">
    <h1>Please Sign In to Continue</h1>
    <SignIn />
  </div>
);

// Component to wrap protected routes
const ProtectedRoute = ({ children }) => {
  return <SignedIn>{children}</SignedIn>;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/success" && (
        <header>
          <SignedIn>
            <Home />
          </SignedIn>
        </header>
      )}

      {/* Define routes */}
      <Routes>
        <Route
          path="/"
          element={
            <SignedOut>
              <SignedOutPage />
            </SignedOut>
          }
        />
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
