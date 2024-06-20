import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import OTP from "./pages/OTP";
import Details from "./pages/Details";
import Preferences from "./pages/Preferences";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import OpenRoute from "./components/core/auth/OpenRoute"

function App() {
  const {user , token} = useSelector(state => state.user)
  useEffect(()=>{ console.log(user , token)})
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Header />
        <Routes>

        
          <Route path="/login" element={ <OpenRoute><Login /></OpenRoute>}></Route>
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>}></Route>
          <Route path="/preferences" element={<OpenRoute><Preferences /></OpenRoute>}></Route>
          <Route path="/otp" element={<OpenRoute><OTP /></OpenRoute>}></Route>
          <Route path="/details" element={<OpenRoute><Details /></OpenRoute>}></Route>
        

          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
