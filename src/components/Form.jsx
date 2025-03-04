import { useState } from "react";
import "../App.css";
import movieicon from "../assets/images/Movie.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaregister = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "გთხოვთ მიუთითოთ ვალიდური email"
    ),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z0-9]).{6,}$/, "გთხოვთ მიუთითოთ ვალიდური პაროლი"),
  Repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "არ ემთხვევა პაროლს"),
});

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "გთხოვთ მიუთითოთ ვალიდური email"
    ),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z0-9]).{6,}$/, "გთხოვთ მიუთითოთ ვალიდური პაროლი"),
});

function Form({ setVisibleApp }) {
  const [visiblesign, setVisiblesign] = useState(true);
  const [visibleregister, setVisibleregister] = useState(false);
  const [visiblelogin, setVisiblelogin] = useState(true);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schemaregister) });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm({ resolver: yupResolver(schemaLogin) });

  const onSubmitRegister = (data) => {
    if (isValid) {
      localStorage.setItem("user", JSON.stringify(data));
      setVisiblesign(true);
      setVisibleregister(false);
    }
  };

  const onSubmitLogin = (data) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      userData &&
      userData.email === data.email &&
      userData.password === data.password
    ) {
      setVisiblelogin(false);
      setVisibleApp(true);
    } else {
      setLoginError("მითითებული email ან password არასწორია");
    }
  };

  return (
    <>
      {visiblelogin && (
        <div className="w-full  h-[100%] flex justify-center gap-[83px] items-center flex-col">
          <img src={movieicon} alt="Movie icon" />
          {visiblesign && (
            <div className="max-w-[400px] w-[100%] h-[373px] rounded-[20px] bg-[#161D2F] p-[32px] flex flex-col gap-[30px]">
              <h1 className="text-[#FFF] font-outfit text-[32px] font-normal leading-normal tracking-[-0.5px]">
                Login
              </h1>

              <form
                onSubmit={handleSubmitLogin(onSubmitLogin)}
                className="flex flex-col gap-[30px]"
              >
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    placeholder="Email address"
                    {...registerLogin("email")}
                    className="text-[#FFF] font-outfit text-[15px] font-normal leading-normal opacity-50 w-full"
                  />
                  <div className=" h-[1px] w-full bg-[#5A698F]">
                    {errorsLogin.email && (
                      <span style={{ color: "red" }}>
                        {errorsLogin.email.message}
                      </span>
                    )}
                  </div>
                  {loginError && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {loginError}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    type="password"
                    placeholder="Password"
                    {...registerLogin("password")}
                    className="text-[#FFF] font-outfit text-[15px] font-normal leading-normal opacity-50 w-full"
                  />
                  <div className=" h-[1px] w-full bg-[#5A698F]">
                    {errorsLogin.password && (
                      <span style={{ color: "red" }}>
                        {errorsLogin.password.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-[336px] h-[48px] rounded-[6px] bg-[#FC4747] cursor-pointer text-white text-center font-outfit text-base font-normal leading-normal not-italic"
                >
                  Login to your account
                </button>
              </form>
              <div className="flex items-center justify-center gap-1.5">
                <p className="text-white font-outfit text-[15px] font-normal leading-normal not-italic">
                  Don’t have an account?
                </p>
                <p
                  onClick={() => {
                    setVisiblesign(false);
                    setVisibleregister(true);
                  }}
                  className="text-[#FC4747] font-outfit text-[15px] font-normal leading-normal not-italic font-no-ligatures cursor-pointer"
                >
                  Sign Up
                </p>
              </div>
            </div>
          )}

          {visibleregister && (
            <div className="max-w-[400px] w-[100%] h-[418px] rounded-xl bg-[#161D2F] p-[32px] flex flex-col gap-[30px]">
              <h1 className="text-[#FFF] font-outfit text-[32px] font-normal leading-normal tracking-[-0.5px]">
                Sign Up
              </h1>
              <form
                onSubmit={handleSubmit(onSubmitRegister)}
                className="flex flex-col gap-[30px]"
              >
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    placeholder="Email address"
                    {...register("email")}
                    className="text-[#FFF] font-outfit text-[15px] font-normal leading-normal opacity-50 w-full"
                  />
                  <div className=" h-[1px] w-full bg-[#5A698F]">
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className="text-[#FFF] font-outfit text-[15px] font-normal leading-normal opacity-50 w-full"
                  />
                  <div className=" h-[1px] w-full bg-[#5A698F]">
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <input
                    type="password"
                    placeholder="Repeat password"
                    {...register("Repassword")}
                    className="text-[#FFF] font-outfit text-[15px] font-normal leading-normal opacity-50 w-full"
                  />
                  <div className=" h-[1px] w-full bg-[#5A698F] ">
                    {errors.Repassword && (
                      <span style={{ color: "red" }}>
                        {errors.Repassword.message}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-[336px] h-[48px] rounded-[6px] bg-[#FC4747] cursor-pointer text-white text-center font-outfit text-base font-normal leading-normal not-italic"
                >
                  Create an account
                </button>
              </form>
              <div className="flex items-center justify-center gap-1.5">
                <p className="text-white font-outfit text-[15px] font-normal leading-normal not-italic">
                  Already have an account?
                </p>
                <p
                  onClick={() => {
                    setVisiblesign(true);
                    setVisibleregister(false);
                  }}
                  className="text-[#FC4747] font-outfit text-[15px] font-normal leading-normal not-italic font-no-ligatures cursor-pointer"
                >
                  Login
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Form;
