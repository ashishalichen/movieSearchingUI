// import React from "react";
import { BG_IMG, USER_AVATAR } from "../utils/constant";
import { checkValidData, checkValidDataSingUp } from "../utils/validate";
import Header from "./Header";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser} from "../utils/userSlice";



export default function Login() {
  const [isSignInForm, setIsSignInForm] = useState("True");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageSignUp, setErrorMessageSignUp] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const dispatch = useDispatch();

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }

  function handleButtonClick() {
    // validate form data
    if (isSignInForm) {
      const message = checkValidData(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      // console.log(isSignInForm);

      if (message !== true) return;

      //  sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      const message = checkValidDataSingUp(
        name.current.value,
        email.current.value,
        password.current.value,
        confirmPassword.current.value
      );
      setErrorMessageSignUp(message);

      if (message !== true) return;

      // sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );

            })
            .catch((error) => {
              // An error occurred
              setErrorMessageSignUp(error.message);
              // ..
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessageSignUp(errorCode + " " + errorMessage);
          // ..
        });
    }

    // console.log(message)
  }
  console.log(isSignInForm);
  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-screen w-screen object-cover" src={BG_IMG} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 rounded-md bg-opacity-80"
      >
        <h1 className="font-bold text-white text-3xl py4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            name="full-name"
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-black border border-white rounded-md text-white"
          />
        )}
        <input
          name="emailId"
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-black border border-white rounded-md text-white"
        />
        <input
          name="password"
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-black border border-white rounded-md text-white"
        />
        {!isSignInForm && (
          <input
            name="confirm-password"
            ref={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className="p-2 my-4 w-full bg-black border border-white rounded-md text-white"
          />
        )}
        <p className="text-red-600 font-bold">
          {isSignInForm ? errorMessage : errorMessageSignUp}
        </p>
        <button
          className="p-4 my-6 bg-red-700 w-full text-white font-semibold rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-white cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already a User? Sign In Now."}
        </p>
      </form>
    </div>
  );
}
