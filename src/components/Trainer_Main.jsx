import React from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Corrected import for Link
import '../Stylings/Trainer_Main.css';
import MaleTrainerImg from '../assets/MaleTrainer.png';
import HowItWorksImage from '../assets/HowItWorks.png';
import FemaleTrainerImg from '../assets/FemaleTrainer.png';
import startYourJourneyImg from '../assets/StartyourJourney.png';
import TrainerHeroSection from './TrainerHeroSection';

const TrainerMain = () => {
    const navigate = useNavigate(); // Corrected usage of navigate

    // Navigate to respective trainer pages
    const navigateToTrainerPage = (gender) => {
        if (gender === 'female') {
            navigate('/trainer/female');  // Redirect to Female Trainer Page
        } else {
            navigate('/trainer/male');  // Redirect to Male Trainer Page
        }
    };

    return (
        <div className="trainer-main">
            {/* Hero Section */}
            <TrainerHeroSection /> {/* Use TrainerHeroSection Component */}

            {/* Trainer Selection Section */}
            <div className="trainer-header">
                <h1>Ready To Start? Choose Your Trainer</h1>
            </div>

            <div className="trainer-options">
                <div className="trainer-option">
                    <img src={FemaleTrainerImg} alt="Female Trainer" className="trainer-image" />
                    <button onClick={() => navigateToTrainerPage('female')} className="hire-trainer-btn female-btn">
                        Hire Female Fitness Trainer
                    </button>
                </div>

                <div className="trainer-option">
                    <img src={MaleTrainerImg} alt="Male Trainer" className="trainer-image" />
                    <button onClick={() => navigateToTrainerPage('male')} className="hire-trainer-btn">
                        Hire Male Fitness Trainer
                    </button>
                </div>
            </div>

            {/* Benefits Section */}
            <section className="trainer-benefits">
                <h2>Benefits Of Hiring A Trainer</h2>
                <div className="benefit-container">
                    <div className="benefit">
                        <img src={require('../assets/b1.png')} alt="Benefit 1" />
                        <p>Get personalized training plans that match your goals.</p>
                    </div>
                    <div className="benefit">
                        <img src={require('../assets/b2.png')} alt="Benefit 2" />
                        <p>Track your progress effectively with expert guidance.</p>
                    </div>
                    <div className="benefit">
                        <img src={require('../assets/b3.jpeg')} alt="Benefit 3" />
                        <p>Stay motivated and achieve results faster with professional support.</p>
                    </div>    
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="how-it-works-content">
                    <h2>How It Works</h2>
                    <p>
                        Browse trainer profiles, select your preferred type, and book a session that suits your schedule.
                        Get personalized training, group classes, or a custom fitness program.
                        Trainers create tailored workout plans, track your progress, and provide real-time feedback.
                    </p>
                </div>
                <div className="how-it-works-image">
                    <img src={HowItWorksImage} alt="How It Works" />
                </div>
            </section>

            {/* Start Your Professional Fitness Journey Section */}
            <section className="start-your-journey">
                <div className="start-your-journey-image">
                    <img src={startYourJourneyImg} alt="Start Your Fitness Journey" />
                </div>

                <div className="start-your-journey-content">
                    <h2>Start Your Professional Fitness Journey!</h2>
                    <p>
                        Ready to kickstart your fitness journey? Register as a trainer and start offering your services to clients worldwide. Share your expertise and earn by providing personalized fitness plans and sessions.
                    </p>
                    {/* Register as Trainer Button */}
                    <Link to="/register-trainer" className="register-trainer-btn">Register as Trainer</Link>
                </div>
            </section>

            {/* Stop Wasting Time Section */}
            <section className="stop-wasting-time">
                <img src={require('../assets/syfj.png')} alt="Stop Wasting Time!" className="stop-wasting-time-image" />
                <div className="stop-wasting-time-content">
                    <h2 className="stop-wasting-time-heading">Stop Wasting Time! Hire Now</h2>
                    <p>Take charge of your fitness today! Join our community and start your path to a healthier, happier you.</p>
                </div>
            </section>
        </div>
    );
};

export default TrainerMain;
