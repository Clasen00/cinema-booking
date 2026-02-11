import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import styles from "./App.module.scss";
import { AuthProvider } from "./contexts/AuthContext";

import { ProtectedRoute } from "./shared/ui";
import { Header } from "./shared/ui/Header/Header";
import { CinemaDetailPage } from "@pages/cinema-detail";
import { CinemasPage } from "@pages/cinemas";
import { LoginPage } from "@pages/login";
import { MovieDetailPage } from "@pages/movie-detail";
import { MoviesPage } from "@pages/movies";
import { MyTicketsPage } from "@pages/my-tickets";
import { RegisterPage } from "@pages/register";
import { SessionBookingPage } from "@pages/sessionBooking/";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className={styles.container}>
          <Header />
          <main id={styles.root}>
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
