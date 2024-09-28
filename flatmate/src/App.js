import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import OTP from "./pages/OTP";
import Details from "./pages/Details";
import Preferences from "./pages/Preferences";
import NotFound from "./pages/NotFound";
import OpenRoute from "./components/core/auth/OpenRoute";
import Listing from "./pages/Listing";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import HeaderFooterLayout from "./components/core/layout/HeaderFooterLayout";
import NeedRoom from "./components/core/form/NeedRoom";
import NeedRoommate from "./components/core/form/NeedRoommate";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AllCards from "./pages/AllCards";
import MyProfile from "./pages/MyProfile";
import ListingInfo from "./pages/ListingInfo";
import HeaderLayout from "./components/core/layout/HeaderLayout";
import Chats from "./pages/Chats";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/slices/authSlice";
import { io } from "socket.io-client";
import { BASE_URL } from "./services/apis";
function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    let socket;
    if (token) {
      socket = io(BASE_URL);
      dispatch(setSocket(socket));
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [token]);

  return (
    <div className="w-screen h-screen  !m-0 !p-0  overflow-x-auto">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route element={<HeaderFooterLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/all/listing" element={<AllCards />}></Route>
            <Route
              path="/listing-info"
              element={
                <PrivateRoute>
                  <ListingInfo />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/my-profile"
              element={
                <PrivateRoute>
                  <MyProfile />
                </PrivateRoute>
              }
            ></Route>
          </Route>
          <Route element={<HeaderLayout />}>
            <Route
              path="/all/chats"
              element={
                <PrivateRoute>
                  <Chats />
                </PrivateRoute>
              }
            ></Route>
          </Route>
          <Route
            path="/preferences"
            element={
              <OpenRoute>
                <Preferences />
              </OpenRoute>
            }
          ></Route>
          <Route
            path="/otp"
            element={
              <OpenRoute>
                <OTP />
              </OpenRoute>
            }
          ></Route>
          <Route
            path="/details"
            element={
              <OpenRoute>
                <Details />
              </OpenRoute>
            }
          ></Route>
          <Route
            path="/listing/"
            exact={true}
            element={
              <PrivateRoute>
                <Listing />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/listing/needroom" element={<NeedRoom />} />
          <Route path="/listing/needroommate" element={<NeedRoommate />} />
          <Route
            path="/forgotpassword"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          ></Route>
          <Route
            path="/forgotpassword"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          ></Route>
          <Route
            path="/resetpassword/:token"
            element={
              <OpenRoute>
                <ResetPassword />
              </OpenRoute>
            }
          ></Route>

          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
