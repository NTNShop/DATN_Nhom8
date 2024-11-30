import React, { useEffect, useState } from 'react';

const Chatbot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  useEffect(() => {
    // Cấu hình chatbot sau khi trang được tải
    window.embeddedChatbotConfig = {
      chatbotId: "ogV_zCqDzQ1ZgXNsmvz_O",
      domain: "www.chatbase.co",
    };

    // Thêm script Chatbase
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "ogV_zCqDzQ1ZgXNsmvz_O");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup script khi component bị unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Toggle visibility của chatbot iframe
  const toggleChatbot = () => {
    setIsChatbotVisible(prevState => !prevState);
  };

  return (
    <div>
      {/* Icon Chatbot */}
      <div
        id="chatbot-icon"
        onClick={toggleChatbot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          color: 'white',
          borderRadius: '50%',
          padding: '15px',
          
        
        }}
      >
        💬
      </div>

      {/* Chatbot iframe */}
      {isChatbotVisible && (
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/ogV_zCqDzQ1ZgXNsmvz_O"
          width="300"
          height="400"
          style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            minHeight: '300px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '1000',
          }}
          frameBorder="0"
          title="Chatbot"
        ></iframe>
      )}
    </div>
  );
};

export default Chatbot;
