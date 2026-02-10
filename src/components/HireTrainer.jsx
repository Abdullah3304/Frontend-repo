// src/pages/HireTrainer.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Stylings/HireTrainer.css';
import { toast } from 'react-toastify';

const HireTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [gmail, setGmail] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    const fetchTrainer = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/trainers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTrainer(res.data);
      } catch (err) {
        toast.error('Trainer not found');
        navigate('/');
      }
    };
    fetchTrainer();
  }, [id, navigate]);

  const handleProceed = () => {
    if (!gmail) return toast.error('Please enter your Gmail');

    // Gmail format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      return toast.error('Enter a valid Gmail');
    }

    setShowPayment(true);
  };

  const handleConfirm = async () => {
    if (!paymentOption) return toast.error('Please select a payment option');

    // Validate simulated card form if card is selected
    if (paymentOption === 'card') {
      const { name, number, expiry, cvv } = cardDetails;
      if (!name || !number || !expiry || !cvv) {
        return toast.error('Please fill in all card details');
      }
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/trainers/hire', {
        trainerId: trainer._id,
        gmail,
        paymentOption,
        cardDetails: paymentOption === 'card' ? cardDetails : null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in header
        },
      }
    );

      toast.success('Booking confirmed! Confirmaation send to Gmail');

      navigate('/trainer-receipt', {
        state: {
          trainer,
          gmail,
          paymentOption,
          cardDetails: paymentOption === 'card' ? cardDetails : null,
        },
      });
    } catch (err) {
      toast.error('Error processing request');
    }
  };

  if (!trainer) return <div>Loading trainer details...</div>;

  return (
    <div className="hire-container">
      <h2>Hire {trainer.name}</h2>
      <div className="trainer-details">
        <p><strong>Specialization:</strong> {trainer.specialization.join(', ')}</p>
        <p><strong>Fees:</strong> $ {trainer.price}</p>
        <p><strong>Availability:</strong> {trainer.availability}</p>
        <p><strong>Description:</strong> {trainer.description}</p>
        <p><strong>Contact:</strong> {trainer.gmail}</p>
      </div>

      <div className="form-group">
        <label>Your Gmail:</label>
        <input type="email" value={gmail} onChange={(e) => setGmail(e.target.value)} required />
        {!showPayment && <button onClick={handleProceed}>Proceed to Payment</button>}
      </div>

      {showPayment && (
        <div className="payment-section">
          <h4>Select Payment Option</h4>
          {trainer.availability === 'physical' ? (
            <>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  onChange={(e) => setPaymentOption(e.target.value)}
                /> Cash at Gym
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  onChange={(e) => setPaymentOption(e.target.value)}
                /> Card/Debit (Simulated)
              </label>
            </>
          ) : (
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                onChange={(e) => setPaymentOption(e.target.value)}
              /> Card/Debit (Simulated)
            </label>
          )}

          {/* Show Simulated Card Form if card is selected */}
          {paymentOption === 'card' && (
            <div className="card-form">
              <h5>Enter Card Details</h5>
              <input
                type="text"
                placeholder="Name on Card"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Card Number"
                maxLength="16"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <input
                type="text"
                placeholder="CVV"
                maxLength="4"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
            </div>
          )}

          <button
            onClick={handleConfirm}
            disabled={!paymentOption}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default HireTrainer;
