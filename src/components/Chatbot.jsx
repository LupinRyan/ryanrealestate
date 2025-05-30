import React, { useState, useRef, useEffect } from 'react';
import './styling/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Lupin Real Estate Bot - Your 24/7 Property Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Sample pairs of input-output for the Lupin Real Estate chatbot
  const pairs = [
    [/(hi|hello|hey|yooh|holla|bonjour)/i, 
     ["Hello! Welcome to Lupin Real Estate - Your Trusted Property Partner in Kenya. How can I assist you today?", 
      "Hi there! Looking for a property or have any questions about our services?"]],
    
    [/how are you\?/i, 
     ["I'm doing great, ready to help you find your dream property in Nairobi and beyond!", 
      "I'm wonderful, thank you! We currently have over 200+ properties listed. How can I assist you today?"]],
    
    [/(.*about|lupin real estate|company.*)/i, 
     ["Lupin Real Estate is a premier property agency in Kenya specializing in residential and commercial real estate. " +
      "We offer property sales, rentals, and management services with over 10 years of market experience. " +
      "Our portfolio includes luxury apartments, townhouses, commercial spaces, and land parcels across prime locations."]],
    
    [/(.*property|house|home|apartment|condo|villa|estate.*)/i, 
     ["We have a wide range of properties available including:\n" +
      "- Luxury apartments in Kilimani, Kileleshwa, and Westlands\n" +
      "- Townhouses in Karen and Runda\n" +
      "- Commercial spaces in CBD and Upper Hill\n" +
      "- Gated community developments\n" +
      "Are you looking to buy or rent?", 
      "We offer residential and commercial properties. What type are you interested in? " +
      "We have 1-4 bedroom apartments, standalone villas, and office spaces."]],
    
    [/(.*buy|purchase|invest.*)/i, 
     ["Great! We have exclusive properties for sale including:\n" +
      "- New developments with flexible payment plans\n" +
      "- Ready-to-occupy homes with title deeds\n" +
      "- Prime land parcels in upcoming neighborhoods\n" +
      "Our current listings range from KES 8M to KES 120M. What's your budget and preferred location?", 
      "For buying, we can show you our latest listings with special offers. " +
      "We also provide:\n" +
      "- Property valuation services\n" +
      "- Legal conveyance assistance\n" +
      "- Mortgage facilitation\n" +
      "Any specific requirements like bedrooms or amenities?"]],
    
    [/(.*rent|lease|let.*)/i, 
     ["We have excellent rental options:\n" +
      "- Furnished and unfurnished apartments\n" +
      "- Short-term (3-6 months) and long-term (1-2 years) leases\n" +
      "- Serviced offices and retail spaces\n" +
      "Rental prices range from KES 35,000 to KES 500,000 monthly. Please specify:\n" +
      "1. Your budget\n" +
      "2. Preferred area\n" +
      "3. Size requirements", 
      "For rentals, we offer tenant vetting and lease agreement preparation. " +
      "Would you like furnished or unfurnished?"]],
    
    [/(.*location|area|city|neighborhood|where.*)/i, 
     ["Our premium locations include:\n" +
      "Nairobi: Kilimani, Kileleshwa, Lavington, Karen, Westlands, Parklands\n" +
      "Coast: Nyali, Bamburi, Diani\n" +
      "Other: Naivasha, Thika, Machakos\n" +
      "We also have upcoming developments in:\n" +
      "- Tatu City\n" +
      "- Two Rivers Area\n" +
      "- Northlands City\n" +
      "Any specific area you're interested in?"]],
    
    [/(.*budget|price|cost|how much.*)/i, 
     ["Our portfolio includes options for every budget:\n" +
      "- Affordable: KES 8M - 20M\n" +
      "- Mid-range: KES 20M - 50M\n" +
      "- Luxury: KES 50M+\n" +
      "Rentals range from KES 35K - 500K/month\n" +
      "We can also arrange mortgage financing with partner banks. What range works for you?"]],
    
    [/(.*contact|phone|email|reach|office.*)/i, 
     ["You can reach us through:\n" +
      "📞 Call/WhatsApp: +254 796 299307\n" +
      "📧 Email: info@lupinrealestate.com\n" +
      "🏢 Office: The Address, 5th Floor, Muthangari Drive, Lavington\n" +
      "Open Mon-Fri: 8:30AM - 5:30PM, Sat: 9AM - 2PM\n" +
      "Would you like to schedule an appointment?"]],
    
    [/(.*feature|amenity|facility|what included.*)/i, 
     ["Our properties offer premium amenities:\n" +
      "✔️ 24/7 Security & CCTV\n" +
      "✔️ Swimming pools & gyms\n" +
      "✔️ Children's play areas\n" +
      "✔️ Ample parking\n" +
      "✔️ Backup generators\n" +
      "✔️ Fiber internet ready\n" +
      "Any specific requirement you're looking for?"]],
    
    [/(.*visit|schedule|appointment|tour|viewing.*)/i, 
     ["We'd be happy to arrange a property viewing! Our agents are available:\n" +
      "Weekdays: 8:30AM - 5:30PM\n" +
      "Saturdays: 9AM - 2PM\n" +
      "You can:\n" +
      "1. Book online at lupinrealestate.vercel.app/viewings\n" +
      "2. Call +254 796 299307\n" +
      "3. Email bookings@lupinrealestate.com\n" +
      "When would you be available?"]],
    
    [/(.*website|site|online|portal.*)/i, 
     ["Our official website lupinrealestate.vercel.app offers:\n" +
      "🔍 Complete property listings with photos/virtual tours\n" +
      "📝 Online viewing requests\n" +
      "📈 Market insights and trends\n" +
      "💰 Mortgage calculator\n" +
      "👨‍💻 Agent contact portal\n" +
      "Visit us online to explore all available properties and services."]],
    
    [/(.*service|what you offer|help.*)/i, 
     ["Our comprehensive services include:\n" +
      "1. Property Sales & Acquisitions\n" +
      "2. Rental Management\n" +
      "3. Property Valuation\n" +
      "4. Real Estate Investment Advisory\n" +
      "5. Relocation Services\n" +
      "6. Property Development Consultancy\n" +
      "Which service are you interested in?"]],
    
    [/(.*thank|thanks|appreciate.*)/i, 
     ["You're welcome! Remember to check our website for exclusive listings at lupinrealestate.vercel.app", 
      "Happy to help! We're always available at +254 796 299307 for any further questions."]],
    
    [/(.*payment|plan|installment|flexible.*)/i,
     ["We offer flexible payment options:\n" +
      "💰 Cash purchases (discounts available)\n" +
      "🏦 Bank mortgage facilitation\n" +
      "📅 Installment plans (up to 24 months)\n" +
      "🌍 Foreign currency payments\n" +
      "Our financial advisors can customize a plan for your needs."]],
    
    [/(.*promo|offer|discount|deal.*)/i,
     ["Current special offers include:\n" +
      "🎉 5% discount on cash purchases\n" +
      "🏡 Free legal fees on select properties\n" +
      "👨‍👩‍👧‍👦 Family packages with furniture credit\n" +
      "View all offers at lupinrealestate.vercel.app/offers"]],
    
    [/.*/i, 
     ["I'm sorry, I didn't understand that. For real estate inquiries, you can ask about:\n" +
      "- Properties for sale/rent\n" +
      "- Location information\n" +
      "- Pricing and payment plans\n" +
      "- Site visits\n" +
      "- Our services\n" +
      "Or visit lupinrealestate.vercel.app for complete information"]]
  ];

  const findResponse = (input) => {
    if (input.toLowerCase() === 'quit') {
      return "Thank you for choosing Lupin Real Estate! Remember to visit lupinrealestate.vercel.app for our full listings. Have a wonderful day!";
    }

    for (const [pattern, responses] of pairs) {
      if (pattern.test(input)) {
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
      }
    }
    
    return "I'm sorry, I didn't understand that. For real estate inquiries, you can ask about properties, locations, pricing, or our services.";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }]);
    
    // Get bot response
    const botResponse = findResponse(inputValue);
    
    // Add bot response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 500);
    
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-fullscreen">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <img src="images/logo.png" alt="Lupin Real Estate Bot" />
          </div>
          <div className="chatbot-title">
            <h3>Lupin Real Estate Assistant</h3>
            <p className="status">Online</p>
          </div>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'bot' && (
                <div className="bot-avatar">
                  <img src="images/lupin-avatar.png" alt="Bot" />
                </div>
              )}
              <div className="message-content">
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chatbot-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;