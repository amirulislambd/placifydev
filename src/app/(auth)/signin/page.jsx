import React, { Suspense } from "react";
import SignInForm from "./SigninForm";

const SignInPage = () => {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
};

export default SignInPage;
