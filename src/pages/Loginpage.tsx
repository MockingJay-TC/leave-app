import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    const data = {
      email,
      password,
    };
    login(data).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="relative  font-black flex items-center h-screen justify-center text-green-800  ">
      <div className="absolute bg-ten w-screen h-screen z-0 inset-0 bg-no-repeat bg-cover opacity-30 mix-blend-multiply" />
      <div className="z-50 shadow-xl rounded-md bg-white draggable my-auto flex  justify-center md:gap-5 lg:justify-normal xl:gap-14">
        <div className="flex w-full items-center justify-center lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex h-full w-full flex-col rounded-3xl pb-6 text-center">
              <h3 className="text-dark-grey-900 mb-3 text-4xl font-extrabold">
                Sign In
              </h3>
              <p className="text-grey-700 mb-4">
                Enter your email and password
              </p>
              <a className="text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-grey-300 mb-6 flex w-full items-center justify-center rounded-2xl py-4 text-sm font-medium transition duration-300 focus:ring-4">
                <img
                  className="mr-2 h-5"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt=""
                />
                Sign in with Google
              </a>
              <div className="mb-3 flex items-center">
                <hr className="border-grey-500 h-0 grow border-b border-solid" />
                <p className="text-grey-600 mx-4">or</p>
                <hr className="border-grey-500 h-0 grow border-b border-solid" />
              </div>
              <label
                htmlFor="email"
                className="text-grey-900 mb-2 text-start text-sm"
              >
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="mail@loopple.com"
                className="focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 mb-7 mr-2 flex w-full items-center rounded-2xl px-5 py-4 text-sm font-medium outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="password"
                className="text-grey-900 mb-2 text-start text-sm"
              >
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                className="focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 mb-5 mr-2 flex w-full items-center rounded-2xl px-5 py-4 text-sm font-medium outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mb-8 flex flex-row justify-between">
                <label className="relative mr-3 inline-flex cursor-pointer select-none items-center">
                  <input
                    type="checkbox"
                    checked
                    onChange={() => !!true}
                    value=""
                    className="peer sr-only"
                  />
                  <div className="border-grey-500 peer-checked:bg-purple-blue-500 peer h-5 w-5 rounded-sm border-2 peer-checked:border-0">
                    <img
                      className=""
                      src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                      alt="tick"
                    />
                  </div>
                  <span className="text-grey-900 ml-3 text-sm font-normal">
                    Keep me logged in
                  </span>
                </label>
                <a
                  href="/"
                  className="text-purple-blue-500 mr-4 text-sm font-medium"
                >
                  Forget password?
                </a>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="hover:bg-purple-blue-600 focus:ring-purple-blue-100 bg-purple-blue-500 mb-5 w-full rounded-2xl px-6 py-5 text-sm font-bold leading-none text-green-800 transition duration-300 focus:ring-4 md:w-96"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
