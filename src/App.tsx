import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Header from "./components/layout/Header";
import type { AuthProvider } from "./contexts/AuthContext";
import CinemaDetailPage from "./pages/CinemaDetailPage";
import CinemasPage from "./pages/CinemasPage";
import LoginPage from "./pages/LoginPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import MoviesPage from "./pages/MoviesPage";
import RegisterPage from "./pages/RegisterPage";
import SessionBookingPage from "./pages/SessionBookingPage";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
          <Header />
          <main
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "2rem 1rem",
            }}
          >
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Navigate to="/movies" replace />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />
              <Route path="/cinemas" element={<CinemasPage />} />
              <Route path="/cinemas/:id" element={<CinemaDetailPage />} />
              <Route path="/sessions/:id" element={<SessionBookingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected routes */}
              <Route
                path="/my-tickets"
                element={
                  <ProtectedRoute>
                    <MyTicketsPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/movies" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
