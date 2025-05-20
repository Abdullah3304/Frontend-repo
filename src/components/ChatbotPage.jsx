import React, { useEffect } from 'react';
import '../Stylings/ChatbotPage.css';

const ChatbotPage = () => {
  useEffect(() => {
    const scriptId = 'rasa-webchat-script';

    // Prevent multiple script injections
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/npm/rasa-webchat@0.11.12/lib/index.js';
      script.async = true;

      script.onload = () => {
        console.log('✅ Rasa WebChat loaded');

        window.Webchat && window.Webchat({
          initPayload: '/greet',
          customData: { language: 'en' }, // optional
          socketUrl: 'http://localhost:5055', // ✅ Updated port
          socketPath: '/socket.io/',
          title: 'Fitness Assistant',
          subtitle: 'How can I help you today?',
          inputTextFieldHint: 'Type a message...',
          showFullScreenButton: true,
          profileAvatar: 'https://i.imgur.com/nGF1K8f.png',
          openLauncherImage: '', // Optional
          params: {
            storage: 'session', // Keeps chat per session
          },
          embedded: true,
          selector: '#webchat',
        });
      };

      script.onerror = () => {
        console.error('❌ Failed to load Rasa WebChat script');
      };

      document.body.appendChild(script);
    } else {
      console.log('✅ Webchat script already loaded');
    }
  }, []);

  return (
    <div className="chatbot-container">
      <h2>Talk to our Fitness Assistant</h2>
      <p>Ask about workouts, diet, motivation, and more!</p>
      <div id="webchat" className="chat-widget-box" />
    </div>
  );
};

export default ChatbotPage;
