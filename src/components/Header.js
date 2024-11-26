import { LOGO_IMG, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constant";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearch } from "../utils/gptSlice";
import language from "../utils/languageConstant";
import { changeLanguage } from "../utils/configSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

  function handleSignOut() {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  }

  function handleGptSearchClick() {
    dispatch(toggleGptSearch());
  }

  function handleLanguageChange(e) {
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component unmounts
    return unsubscribe;
  }, []);

  return (
    <div className="absolute flex px-8 py-2 bg-gradient-to-b from-black z-10 w-screen justify-between items-center flex-col md:flex-row">
      <img className="w-44 mx-auto md:mx-0" src={LOGO_IMG} alt="logo" />
      {user && (
        <div className="flex">
          {showGptSearch && (
            <select className="p-2 m-2 bg-gray-900 text-white" onClick={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-black px-4 py-2 m-4 bg-yellow-400 rounded-md text-sm font-bold"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homescreen" : "GPT Search"}
          </button>
          <img className="w-0 md:w-16 rounded-md" alt="user-icon" src={USER_AVATAR} />
          <button
            onClick={handleSignOut}
            className="font-bold text-white text-lg ml-4"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
