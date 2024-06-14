import { BrowserRouter as Router , Routes  , Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/common/Header";
import Home from "./pages/Home";
function App() {
  return (
    <div className="overflow-x-hidden">
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login  />}></Route>
        <Route path="/signup" element={<Signup  />}></Route>

      </Routes>
    <Footer/>
    </Router>
    </div>
  );
}

export default App;
