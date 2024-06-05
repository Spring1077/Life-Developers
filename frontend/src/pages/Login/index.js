import Header from "@/components/Header";
import LoginForm from "@/components/Login";
import SignupForm from "@/components/signup";
import Description from "@/components/Description";
import React from "react";


function Login() {
  return (
    <div>
      <Header/>
      <LoginForm/>
      <SignupForm/>
      <Description/>
    </div>
  );
}

export default Login;
