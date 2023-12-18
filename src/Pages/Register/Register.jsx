import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        name,
        email,
        password,
        age,
      });
      if (res.status == 200) {
        alert("Registration Success !");
        window.location.replace("/login");
      }
    } catch (err) {
      // console.log(err.response.data.error);
      setError(true);
      setErrorMessage(err.response.data.error);
    }
  };

  setTimeout(() => {
    if (error) {
      setError(false);
    }
  }, 50000);

  return (
    <div className="h-100 bg-secondary">
      <section class="">
        <div
          class="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <h1 class="my-5 display-3 fw-bold ls-tight">
                Find your balance, <br />
                  <span class="text-success">Stretch your limits.</span>
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
                    <div class="row">
                      <div className="container">
                        <div className="">
                          {error && (
                            <p className="alert btn alert-danger" role="alert">
                              {errorMessage[0].msg}
                            </p>
                          )}
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            class="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label class="form-label" for="form3Example1">
                            Full name
                          </label>
                        </div>
                      </div>
                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <input
                            type="number"
                            id="form3Example2"
                            class="form-control"
                            onChange={(e) => setAge(e.target.value)}
                          />
                          <label class="form-label" for="form3Example2">
                            Age
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        class="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label class="form-label" for="form3Example3">
                        Email address
                      </label>
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        class="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label class="form-label" for="form3Example4">
                        Password
                      </label>
                    </div>

                    <button
                      onClick={handleSubmit}
                      class="btn btn-primary btn-block mb-4"
                    >
                      Sign up
                    </button>
                    <div class="text-center">
                      <p>
                        Already have and account? <Link to="/login">Login</Link>{" "}
                        here
                      </p>
                    </div>
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

export default Register;
