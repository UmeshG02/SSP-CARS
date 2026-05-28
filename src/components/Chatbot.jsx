import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import { carsData } from '../data/cars';

export default function Chatbot({ setCurrentPage, setSelectedCarId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings. I am the SSP AI Agent. Ask me about custom specs, pricing insights, or request a personalized luxury EV recommendation.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    // User message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let replyText = '';
      const query = textToSend.toLowerCase();

      if (query.includes('tesla') || query.includes('plaid') || query.includes('model s')) {
        const tesla = carsData.find(c => c.make === 'Tesla');
        replyText = `The **Tesla Model S Plaid** (${tesla.year}) is currently available for **$${tesla.price.toLocaleString()}**. It offers a jaw-dropping acceleration of **0-60 mph in ${tesla.specs.zeroToSixty}** using its 1,020 hp tri-motor configuration. AI Insight: ${tesla.pricingInsight}`;
      } else if (query.includes('porsche') || query.includes('taycan')) {
        const porsche = carsData.find(c => c.model.includes('Taycan'));
        replyText = `The **Porsche Taycan Turbo S** produces up to **${porsche.specs.power}** with overboost. It accelerates from **0-60 mph in ${porsche.specs.zeroToSixty}**. Recommended for track-quality handling. Pricing: **$${porsche.price.toLocaleString()}**.`;
      } else if (query.includes('ferrari') || query.includes('sf90') || query.includes('hybrid')) {
        const ferrari = carsData.find(c => c.make === 'Ferrari');
        replyText = `The **Ferrari SF90 Stradale** is a hybrid engineering marvel pushing **${ferrari.specs.power}**. Accelerates **0-60 in ${ferrari.specs.zeroToSixty}** with active AWD torque vectoring. List price is **$${ferrari.price.toLocaleString()}**.`;
      } else if (query.includes('rivian') || query.includes('suv') || query.includes('family') || query.includes('utility')) {
        const rivian = carsData.find(c => c.make === 'Rivian');
        replyText = `The **Rivian R1S SUV** is a 3-row adventure EV offering **${rivian.specs.power}** and seating for 7. Features up to 14.9 inches of air suspension ground clearance. Current price: **$${rivian.price.toLocaleString()}**.`;
      } else if (query.includes('fastest') || query.includes('speed') || query.includes('acceleration')) {
        const fastest = carsData.reduce((prev, current) => {
          const prevTime = parseFloat(prev.specs.zeroToSixty);
          const currTime = parseFloat(current.specs.zeroToSixty);
          return currTime < prevTime ? current : prev;
        });
        replyText = `The fastest accelerating car in our catalog is the **${fastest.make} ${fastest.model}** with a 0-60 mph time of just **${fastest.specs.zeroToSixty}**! Running a close second is the Model S Plaid at 1.99s.`;
      } else if (query.includes('budget') || query.includes('cheap') || query.includes('under')) {
        replyText = `Our most accessible premium listings are the **Rivian R1S Adventure ($84,000)** and the **Tesla Model S Plaid ($89,990)**. All listings feature flexible lease/finance terms.`;
      } else if (query.includes('recommend') || query.includes('help me choose') || query.includes('find')) {
        replyText = "I suggest trying our **AI Recommendation Tool** in the navigation header! It takes your daily driving habits, budget, and family needs and performs a vector match score across all listings.";
      } else {
        replyText = "I am trained to guide you through the SSP luxury fleet. You can ask me: 'Which car has the fastest acceleration?', 'Give me details on the Taycan', or 'What is the cheapest EV model?'.";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const suggestedPrompts = [
    "What is the fastest EV acceleration?",
    "Tell me about Porsche Taycan specs",
    "Do you have a luxury family SUV?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-4 rounded-full bg-gradient-to-r from-accent-cyan via-accent-green to-accent-cyan bg-size-200 animate-pulse-slow shadow-cyan-glow hover:scale-105 hover:-translate-y-1 transition-luxury text-black font-semibold font-luxury"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm font-bold tracking-wide">Ask SSP AI</span>
        </button>
      )}

      {/* Floating Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[380px] h-[520px] rounded-3xl glassmorphism border border-white/10 shadow-glass-glow flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-accent-cyan/15 border border-accent-cyan/20">
                <Bot className="w-4 h-4 text-accent-cyan" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-luxury">SSP Neural Assistant</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-[10px] text-gray-500 font-medium tracking-wide">AI Recommendation Engine Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-luxury"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`p-1.5 rounded-full h-8 w-8 flex items-center justify-center border shrink-0 ${
                  msg.sender === 'user' 
                    ? 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan' 
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-accent-cyan/10 to-white/5 text-white border border-accent-cyan/15 rounded-tr-none'
                      : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                  }`}>
                    {/* Render basic markdown bold styling */}
                    {msg.text.split('**').map((part, index) => 
                      index % 2 === 1 ? <strong key={index} className="text-white">{part}</strong> : part
                    )}
                  </div>
                  <span className="text-[9px] text-gray-600 font-mono mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="p-1.5 rounded-full h-8 w-8 bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-white/5 bg-white/5/20 flex flex-col gap-2">
              <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Suggested:</span>
              <div className="flex flex-col gap-1.5">
                {suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="text-left text-[11px] text-gray-400 hover:text-accent-cyan hover:bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5 transition-luxury bg-white/3"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input field */}
          <div className="p-4 border-t border-white/5 bg-obsidian flex gap-2">
            <input
              type="text"
              placeholder="Ask about specs, acceleration, pricing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-4 py-2.5 rounded-xl text-xs font-medium glassmorphism-input text-white focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-green hover:shadow-cyan-glow text-black font-semibold transition-luxury"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
