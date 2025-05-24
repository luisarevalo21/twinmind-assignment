import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import AudioRecorderPage from "./pages/AudioRecorderPage.jsx";
import CustomContainer from "./components/Container.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* <Route element={<CustomContainer />}> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-memory"
          element={
            <ProtectedRoute>
              <Navbar />
              <AudioRecorderPage />
            </ProtectedRoute>
          }
        />
        {/* </Route> */}
        {/* </Route> */}
        {/* <Route path="/about" element={<h1>About</h1>} /> */}
        {/* <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/products" element={<h1>Products</h1>} /> */}
      </Routes>
    </>
  );
}

export default App;
