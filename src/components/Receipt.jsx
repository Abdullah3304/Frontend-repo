import React, { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../config/api';

const Receipt = ({ customerEmail, customerName, orderDetails }) => {

  useEffect(() => {
    const sendReceiptEmail = async () => {
      try {
        await axios.post(`${API_BASE_URL}/send-receipt', {
          customerEmail,
          customerName,
          orderDetails,
        });
        console.log('Receipt email sent successfully.');
      } catch (error) {
        console.error('Error sending receipt email:', error);
      }
    };

    if (customerEmail && customerName && orderDetails) {
      sendReceiptEmail();
    }
  }, [customerEmail, customerName, orderDetails]);

  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      <p>A confirmation email has been sent to: <strong>{customerEmail}</strong></p>
      <h3>Order Summary:</h3>
      <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
    </div>
  );
};

export default Receipt;
