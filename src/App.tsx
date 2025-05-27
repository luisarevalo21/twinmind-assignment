import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import AudioRecorderPage from "./pages/AudioRecorderPage.jsx";
import MemoryDetails from "./pages/MemoryDetails.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route>
          <Route
            path="/memory/:memoryId"
            element={
              <ProtectedRoute>
                <Navbar />
                <MemoryDetails />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/new-memory"
          element={
            <ProtectedRoute>
              <Navbar />
              <AudioRecorderPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
