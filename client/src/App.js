import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SearchItem from "./components/searchItem/SearchItem";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="profile">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        {/* <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
