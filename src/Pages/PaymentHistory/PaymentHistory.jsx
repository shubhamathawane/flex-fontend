import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDateTime } from "../../utils/DateTimeConverter";
import { BASEURL } from "../../api/api";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const user = useSelector((state) => state.user.user);

  const handlePaymentHistory = async () => {
    try {
      const payments = await axios.get(
        `${BASEURL}api/payment/history/${user._id}`
      );

      if (payments) {
        setPayments(payments.data);
        console.log(payments.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handlePaymentHistory();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Method</th>
          </tr>
        </thead>
        {payments.length > 0 ? (
          <>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.userId}>
                  <td>{payment.userId.substring(0, 10)}</td>
                  <td>{formatDateTime(payment.paymentDate)}</td>
                  <td>₹{payment.amountPaid}</td>
                  <td>Done</td>
                  <td>{payment.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <>
            <label htmlFor="">No Payments made!</label>
          </>
        )}
      </table>
    </div>
  );
};

export default PaymentHistory;
