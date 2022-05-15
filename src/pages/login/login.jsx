import "./login.css";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "firebase/auth";
import { db,auth } from "../../firebase";
import {collection, doc, setDoc, addDoc } from "firebase/firestore";


const Login = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isStep1, setIsStep1] = useState(true);

  const recaptchaVerifier = useRef();
  const confirmationResult = useRef();
 
  useEffect(() => {
    const auth = getAuth();
    recaptchaVerifier.current = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );

  }, []);

  const onClickLogin = async () => {
    const auth = getAuth();
    const phoneNumber = `+976${value}`;
    confirmationResult.current = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier.current
    );
    setValue("");
    setIsStep1(false);
  };

  const onClickCheckCode = async () => {
    const code = value;
    await confirmationResult.current.confirm(code);
    const citiesRef = collection(db, "current-users");
      await setDoc(doc(citiesRef, auth.currentUser.uid), {
        phone: auth.currentUser.phoneNumber,
        id: auth.currentUser.uid,
        admin: false,
      });
    console.log("done");
    navigate("/writing");
}

  return (
    <div className="body">
      {isStep1 ? (
        <div className="login-container">
          <h1>Login</h1>
          <div id="recaptcha-container"></div>
          <div className="main">
            <div className="login-field">
              <p>Username</p>
              <input
                type="text"
                placeholder="Not required"
                className="username"
              />
            </div>
          </div>
          <div className="login-field">
            <p>Phone Number</p>
            <input
              type="text"
              placeholder="Phone Number"
              className="phone"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button onClick={onClickLogin} id="login-btn">
            login
          </button>
        </div>
      ) : (
        <div className="login-container">
          <input
            type="text"
            placeholder="Code"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="verify-code"
          />
          <button
            className="login-btn"
            id="verify-btn"
            onClick={onClickCheckCode}
          >
            verify
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;