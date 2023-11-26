import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ childComp }: { childComp: JSX.Element }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout().finally(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <div className="z-50 h-screen w-20 absolute left-0 bg-green-200 flex items-end justify-center py-20">
        <button onClick={() => handleLogout()}>
          <ArrowLeftCircleIcon className="w-10 h-10 cursor-pointer text-green-900 animate-bounce" />
        </button>
      </div>
      {childComp}
    </div>
  );
};

export default Navbar;
