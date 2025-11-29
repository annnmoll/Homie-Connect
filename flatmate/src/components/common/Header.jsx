import React from "react";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CTAButton from "./CTAButton";
import Avatar from "../../assets/avatar.png";
import { MdChat } from "react-icons/md";
import { toast } from "react-toastify";
import { setToken, setUser } from "../../redux/slices/userSlice";
function Header() {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    if (window.confirm("Are you sure you want to logout ? ")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(setToken(null));
      dispatch(setUser(null));
      toast.success("Logged Out");
      navigate("/");
    }
  };
  // onClick={()=> navigate("/my-profile")}

  return (
    <header className="w-full h-[70px] bg-[var(--footer-bg)] flex items-center text-sm ">
      <div className=" w-full max-w-[1400px] px-5 md:px-10 flex items-center justify-between  mx-auto ">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <Logo />
        </div>
        {user ? (
          <div className="text-sm gap-x-4 flex text-nowrap   gap-3 items-center">
            <CTAButton
              text="Add Listing"
              to="/listing"
              className="hidden lg:block text-nowrap  items-center justify-center w-fit"
            />
          

            <div className="w-full h-full cursor-pointer mr-4 ">
              <div className="group relative cursor-pointer ">
                <img
                  src={user?.profilePicture || Avatar}
                  alt=""
                  className="w-[50px] object-center  h-[50px] rounded-xl bg-white object-cover "
                />

                <div className="invisible text-md absolute top-[50px] -left-[50px] -right-[20px] z-[99] px-4 flex  flex-col bg-gray-200 rounded-lg py-1  text-gray-800 shadow-xl group-hover:visible">
                  <NavLink
                    to="/my-profile"
                    className="  my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/listing"
                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                  >
                    Add Listing
                  </NavLink>

                  <NavLink
                    to={`/all/listing?id=${user._id}`}
                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
                  >
                    My Listings
                  </NavLink>
                  <div
                    onClick={logoutHandler}
                    className="my-2 block border-b border-gray-100 py-1 font-semibold text-red-500 hover:text-red-600 md:mx-2"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <CTAButton
              className="max-md:hidden"
              text="Register / Login"
              to="/login"
            />
            <CTAButton className="md:hidden" text="Login" to="/login" />
          </>
        )}
      </div>

      {/* {<Outlet />} */}
    </header>
  );
}

export default Header;
