import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Batch from "../Batch/Batch";
import Payment from "../Payment/Payment";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="d-flex align-center">
      {!user ? (
        <>
          <button>Login</button>
          <button>Signup</button>
        </>
      ) : (
        <>
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-6">
                <Batch user={user} />
              </div>
              <div className="col-md-6">
                <Payment user={user} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
