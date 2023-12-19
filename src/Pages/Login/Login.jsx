import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, redirect } from "react-router-dom";
import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
} from "../../Features/UserSlice";
import axios from "axios";
import { BASEURL } from "../../api/api";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const isFetching = useSelector((state) => state.user.isFetching);
  const isError = useSelector((state) => state.user.error);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LOGIN_START());
    try {
      const res = await axios.post(`${BASEURL}api/auth/login`, {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch(LOGIN_SUCCESS(res?.data));
      localStorage.setItem("user", JSON.stringify(res?.data));
      alert("Login Success");
    } catch (err) {
      dispatch(LOGIN_FAILURE());
      setError(true);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <section class="">
        <div
          class="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <h1 class="my-5 display-3 fw-bold ls-tight">
                  The best Mind <br />
                  <span class="text-success">for your Health</span>
                </h1>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                  quibusdam tempora at cupiditate quis eum maiores libero
                  veritatis? Dicta facilis sint aliquid ipsum atque?
                </p>
              </div>

              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="card">
                  <div class="card-body py-5 px-md-5">
                    <div className="">
                      {error && (
                        <p className="alert btn alert-danger" role="alert">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3"
                          required
                          class="form-control"
                          ref={userRef}
                        />
                        <label class="form-label" for="form3Example3">
                          Email address
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4"
                          required
                          class="form-control"
                          ref={passwordRef}
                        />
                        <label class="form-label" for="form3Example4">
                          Password
                        </label>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary btn-block mb-4"
                        // onClick={handleSubmit}
                        disabled={isFetching}
                      >
                        Login{" "}
                      </button>
                      <div class="text-center">
                        <p>
                          Create a new account ?{" "}
                          <Link to="/register">Sing-up</Link> here
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
