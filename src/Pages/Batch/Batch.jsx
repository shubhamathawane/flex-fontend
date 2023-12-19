// BatchSelectionComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UPDATE_SUCCESS } from "../../Features/UserSlice";
import { GET_BATCH } from "../../Features/BatchSlice";
import { BASEURL } from "../../api/api";

const Batch = ({ user, batch, setBatch }) => {
  const [batches, setBatches] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [currentBranch, setCurrentBranch] = useState([]);

  const dispatch = useDispatch();

  // console.log(user?.userBatch?.batchTimesId?.end_time);

  const getBatches = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/batch/");
      if (res.status === 200) {
        setBatches(res.data);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.response?.data?.message || "Error fetching batches");
    }
  };

  setTimeout(() => {
    if (error) {
      setError(false);
    }
  }, 5000);

  const getCurrentBranch = async () => {
    try {
      if (user._id) {
        await axios
          .get(`http://localhost:3001/api/batch/user/${user._id}`)
          .then((res) => {
            setCurrentBranch(res.data);
            dispatch(GET_BATCH(res?.data));
          });
      } else {
        console.log("first");
      }
    } catch (err) {
      // setError(true);
      setErrorMessage("error");
    }
  };

  const submitBatch = async (userId) => {
    try {
      if (userId && batch) {
        const res = await axios.post(
          `${BASEURL}api/batch/updatebatchtiming/`,
          {
            batchId: batch,
            userId: user._id,
          }
        );

        if (res.status === 201) {
          getCurrentBranch()
          alert("Batch selected successfully!");
          await axios
            .get(`${BASEURL}api/user/${user._id}`)
            .then((res) => {
              dispatch(UPDATE_SUCCESS(res?.data));
              localStorage.setItem("batch", JSON.stringify(res?.data));
            });
        }
      } else {
        setError(true);
        setErrorMessage("Please select a batch");
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.response?.data?.message || "Error selecting batch");
    }
  };

  useEffect(() => {
    getBatches();
    getCurrentBranch();
  }, []);

  return (
    <div className="container mt-3 mb-3">
      <div className="card">
        <h3 className="mt-2 mb-3">Please Select your batch </h3>
        <div className="align-items-center container d-flex justify-content-center">
          <div className="mb-5">
            <select
              onChange={(e) => setBatch(e.target.value)}
              className="form-select "
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              {batches.map((item, key) => (
                <option key={key} value={item._id}>
                  {item.start_time + " " + item.end_time}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-outline-danger mb-5 ms-3"
            onClick={() => submitBatch(user._id)}
          >
            Save
          </button>
        </div>
        <div className="">
          {error && (
            <p className="alert btn alert-danger" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      {currentBranch?.batchTimings?.start_time && (
        <div className="mt-5 border p-4">
          <>
            <h4>Your Current Batch : </h4>
            <p>
              {currentBranch?.batchTimings?.start_time +
                " to " +
                currentBranch?.batchTimings?.end_time}
            </p>
          </>
        </div>
      )}
    </div>
  );
};

export default Batch;
