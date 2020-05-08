import React, { useRef, useState, useContext } from "react";
import "./Auth.css";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner/Spinner";

const initialState = {
  emailError: "",
  passwordError: "",
  isLoading: false,
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [state, setState] = useState(initialState);
  const context = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const validate = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    let emailError = "";
    let passwordError = "";

    if (email.trim().length === 0) {
      emailError = "*Email Cannot Be Empty";
    }

    if (password.trim().length === 0) {
      passwordError = "*Password Cannot Be Empty";
    }

    if (emailError || passwordError) {
      setState({ emailError, passwordError });
      return false;
    }

    return true;
  };

  const performUserOperation = () => {
    setState({ ...state, isLoading: true });
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let reqBody = {
      query: `
        query LoginUser($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExp
          }
        }
      `,
      variables: {
        email: email,
        password: password,
      },
    };

    if (!isLogin) {
      reqBody = {
        query: `
          mutation RegisterUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      };
    }

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        // if (res.status !== 200 && res.status !== 201) {
        //   console.log(await res.json());
        //   throw new Error("Request Failed !");
        // }
        return res.json();
      })
      .then((resData) => {
        if (isLogin) {
          if (resData.data) {
            setState({ ...state, isLoading: false });
            context.login(
              resData.data.login.token,
              resData.data.login.userId,
              resData.data.login.tokenExp
            );
          } else {
            setState({ ...state, isLoading: false });
            let emailError = "";
            let passwordError = "";
            if (resData.errors[0].message === "User Does Not Exist") {
              emailError = "*Email Id Is Not Registered";
            }
            if (resData.errors[0].message === "Password is Incorrect !") {
              passwordError = "*Password is Incorrect !";
            }

            if (emailError || passwordError) {
              setState({ emailError, passwordError });
            }
          }
        } else {
          setIsLogin(!isLogin);
          emailRef.current.value = "";
          passwordRef.current.value = "";
          setState(initialState);
        }
      })
      .catch((err) => {
        setState({ ...state, isLoading: false });
        console.log(err);
      });
  };

  const submitHandler = (event) => {
    const isValid = validate();

    if (isValid) {
      setState(initialState);
      performUserOperation();
    }
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setState(initialState);
  };

  return (
    <div className="auth-login__container">
      <form className="auth-login__form" autoComplete="off">
        <h3 className="auth-login__form-heading">
          {!isLogin ? "Sign Up" : "Sign In"}
        </h3>
        <div className="auth-login__input__wrapper">
          <label htmlFor="auth-login__email">Email</label>
          <input type="emai" id="auth-login__email" ref={emailRef} />
          <small className="auth-login__err-msg">{state.emailError}</small>
        </div>
        <div className="auth-login__input__wrapper">
          <label htmlFor="auth-login__password">Password</label>
          <input
            type="password"
            id="auth-login__password"
            ref={passwordRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                submitHandler();
              }
            }}
          />
          <small className="auth-login__err-msg">{state.passwordError}</small>
        </div>
        {state.isLoading ? (
          <Spinner />
        ) : (
          <div className="auth-login__form-actions">
            <button
              type="button"
              className="auth-login__login-button"
              onClick={submitHandler}
            >
              {!isLogin ? "Register" : "Login"}
            </button>
          </div>
        )}
        <span className="switch_text" onClick={switchForm}>
          {!isLogin
            ? "Already Have An Account ? Sign In"
            : "Don't Have An Accout ? Sign Up"}
        </span>
      </form>
    </div>
  );
};

export default Auth;
