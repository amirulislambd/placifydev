import React, { Suspense } from "react";
import SignupForm from "./SignupForm";

const SignUpPage = () => {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
};

export default SignUpPage;
