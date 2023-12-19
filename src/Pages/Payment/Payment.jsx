import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_SUCCESS } from "../../Features/UserSlice";
import { BASEURL } from "../../api/api";

const Payment = ({ user, batch }) => {
  console.log(user);

  const dispatch = useDispatch();
  const [isPaymentAlready, setIsPaymentAlready] = useState(false);

  const handlePayment = async () => {
    try {
      const res = await axios.post(`${BASEURL}api/payment/pay`, {
        userId: user._id,
        userBatchId: batch,
        amountPaid: 500,
        paymentMethod: "upi",
      });

      if (res.status == 201) {
        alert("Payment Successful!");
        const updatedUser = { ...user, payment_status: true }; // Update the user locally
        dispatch(UPDATE_SUCCESS(updatedUser));
      } else {
        console.log(res);
      }
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <h3 className="mt-2">Payment Section</h3>
        <div className="container mb-5">
          <div class="container mt-5 d-flex justify-content-center">
            <div class="card p-4 pb-4">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="total-amount">Total amount</h5>
                <div class="amount-container">
                  <span class="fw-5">
                    <span class="dollar-sign">₹</span>500
                  </span>
                </div>
              </div>
              <div class="pt-4">
                {" "}
                <label class="d-flex justify-content-between">
                  {" "}
                  <span class="label-text label-text-cc-number">
                    CARD NUMBER
                  </span>
                  <img
                    src="https://img.icons8.com/dusk/64/000000/visa.png"
                    width="30"
                    class="visa-icon"
                  />
                </label>{" "}
                <input
                  type="tel"
                  name="credit-number"
                  class="form-control credit-card-number"
                  maxlength="19"
                  placeholder="Card number"
                />{" "}
              </div>
              <div class="d-flex justify-content-between pt-4">
                <div>
                  {" "}
                  <label>
                    <span class="label-text">EXPIRY</span>{" "}
                  </label>{" "}
                  <input
                    type="date"
                    name="expiry-date"
                    class="form-control expiry-class"
                    placeholder="MM / YY"
                  />{" "}
                </div>
                <div>
                  {" "}
                  <label>
                    <span class="label-text">CVV</span>
                  </label>{" "}
                  <input
                    type="tel"
                    name="cvv-number"
                    class="form-control cvv-class"
                    maxlength="4"
                    pattern="\d*"
                  />{" "}
                </div>
              </div>
              <div class="d-flex justify-content-between pt-5 align-items-center">
                {" "}
                <button
                  type="button"
                  class="bg-dark-subtle btn cancel-btn fw-bolder text-black-50 text-gray"
                >
                  Cancel
                </button>{" "}
                <button
                  disabled={user.payment_status}
                  type="button"
                  onClick={() => handlePayment(user._id)}
                  class="btn bg-success text-white payment-btn"
                >
                  Make Payment
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
