import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Batch from "../Batch/Batch";
import Payment from "../Payment/Payment";
import Login from "../Login/Login";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const [batch, setBatch] = useState("");

  return (
    <div>
      {!user ? (
        <>
          <Login />
        </>
      ) : (
        <>
          {" "}
          <div className="d-flex align-center">
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-6">
                  <Batch setBatch={setBatch} batch={batch} user={user} />
                </div>
                <div className="col-md-6">
                  <Payment batch={batch} user={user} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
