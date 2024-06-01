import React from 'react';
import axios from 'axios';
import'./Payement.css'

const Payment = () => {
  const handlePayment = async () => {
    try {
      // Call backend to create an order
      const orderUrl = 'http://localhost:8000/create-order';
      const orderData = {
        amount: 500, // amount in INR
        currency: 'INR',
        receipt: 'receipt#1'
      };
      const response = await axios.post(orderUrl, orderData);
      const { id, amount, currency } = response.data;

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: 'rzp_test_n5oTuMseyDclhS',
          amount: amount,
          currency: currency,
          name: 'Test Payment',
          description: 'Test Transaction',
          order_id: id,
          handler: function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
          },
          prefill: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#3399cc'
          }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
    } catch (error) {
      console.error('Error creating order: ', error);
    }
  };

  return (
    <div className='container'>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
