import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Adminpage from "./pages/Adminpage";
import Homepage from "./pages/Homepage";
import Leavepage from "./pages/Leavepage";
import Loginpage from "./pages/Loginpage";
import { AdminRoute, ProtectedRoute } from "./routes/protectedRoute";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="font-nunito">
      <Router>
        <Routes>
          <Route path="/" element={<Navbar childComp={<Homepage />} />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/leave" element={<ProtectedRoute />}>
            <Route
              path="/leave"
              element={<Navbar childComp={<Leavepage />} />}
            />
          </Route>
          <Route path="/admin" element={<AdminRoute />}>
            <Route
              path="/admin"
              element={<Navbar childComp={<Adminpage />} />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
