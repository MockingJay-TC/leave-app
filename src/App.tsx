import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Leavepage from "./pages/Leavepage";
import Loginpage from "./pages/Loginpage";
import ProtectedRoute from "./routes/protectedRoute";

const App = () => {
  return (
    <div className="font-nunito">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/leave" element={<ProtectedRoute />}>
            <Route path="/leave" element={<Leavepage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
