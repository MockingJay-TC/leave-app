import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as string)?.user;
  const role = JSON.parse(localStorage.getItem("user") as string)?.user.role;

  return (
    <div className="relative text-9xl font-black flex items-center justify-center h-screen w-full text-green-800  ">
      <div className="absolute bg-ten w-screen h-screen z-0 inset-0 bg-no-repeat bg-cover opacity-30 mix-blend-multiply" />
      {user ? (
        <div className="tracking-wider leading-4">
          Welcome, {user?.firstName}
        </div>
      ) : (
        <div className="z-50 relative">
          <div className="tracking-wider">Welcome Back</div>
          <Link
            to="/login"
            className="absolute text-lg  my-5 py-1 px-3 bg-green-100 rouned-lg  text-green-900 cursor-pointer right-0"
          >
            LOG IN
          </Link>
        </div>
      )}
      {role === "employee" && (
        <button
          onClick={() => navigate("/leave")}
          className="absolute bottom-20 right-36 text-xl flex items-center justify-center gap-6 shadow-2xl cursor-pointer rounded-lg py-2 px-5 bg-green-800 text-white"
        >
          <h1>Proceed to book your leave</h1>
          <span>
            <ChevronDoubleRightIcon className="w-7 h-7 text-white anim" />
          </span>
        </button>
      )}
      {role === "admin" && (
        <button
          onClick={() => navigate("/admin")}
          className="absolute bottom-20 right-36 text-xl flex items-center justify-center gap-6 shadow-2xl cursor-pointer rounded-lg py-2 px-5 bg-green-800 text-white"
        >
          <h1>Manage leaves</h1>
          <span>
            <ChevronDoubleRightIcon className="w-7 h-7 text-white anim" />
          </span>
        </button>
      )}
    </div>
  );
};

export default Homepage;
