// src/components/Receipt.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Stylings/TrainerReceipt.css';

const Receipt = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No booking details found.</p>;

  const { trainer, gmail, paymentOption, cardDetails } = state;

  const handlePrint = () => window.print();

  return (
    <div className="receipt-container">
      <button className="print-btn" onClick={handlePrint}>🖨 Print</button>

      <h2>Booking Confirmation</h2>
      <p><strong>Trainer:</strong> {trainer.name}</p>
      <p><strong>Specialization:</strong> {trainer.specialization.join(', ')}</p>
      <p><strong>Price:</strong> Rs. {trainer.price}</p>
      <p><strong>Availability:</strong> {trainer.availability}</p>
      <p><strong>Contact Trainer:</strong> {trainer.gmail}</p>
      <p><strong>Payment Option:</strong> {paymentOption === 'card' ? 'Card/Debit' : 'Cash at Gym'}</p>
      
      {paymentOption === 'card' && cardDetails && (
        <>
          <p><strong>Card Holder:</strong> {cardDetails.name}</p>
          <p><strong>Card Number:</strong> **** **** **** {cardDetails.number.slice(-4)}</p>
          <p><strong>Expiry:</strong> {cardDetails.expiry}</p>
        </>
      )}

      <div className="receipt-actions">
        <button onClick={() => navigate('/home')}>🏠 Go to Home</button>
      </div>
    </div>
  );
};

export default Receipt;
