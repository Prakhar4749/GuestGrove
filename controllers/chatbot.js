// controllers/chatbot.js
const ChatMessage = require('../models/ChatMessage');
const { v4: uuidv4 } = require('uuid');

// Simple rule-based chatbot responses
const getBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! Welcome to GuestGrove. How can I help you today?";
  }
  
  if (lowerMessage.includes('booking') || lowerMessage.includes('reserve')) {
    return "I can help you with bookings! You can browse available listings and make reservations through our booking system. Would you like me to guide you to the listings page?";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'm here to help! I can assist you with bookings, account questions, or general information about GuestGrove. What specific help do you need?";
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "Prices vary by property and dates. You can view detailed pricing information on each listing page. Would you like me to help you find listings in your budget?";
  }
  
  if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
    return "We have properties in various locations! You can use our search filters to find accommodations in your preferred area.";
  }
  
  if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
    return "For cancellations and refunds, please check the cancellation policy on your booking confirmation or contact our support team for assistance.";
  }
  
  if (lowerMessage.includes('account') || lowerMessage.includes('profile')) {
    return "You can manage your account settings, view booking history, and update your profile from the user dashboard. Need help with anything specific?";
  }
  
  return "I'm sorry, I didn't quite understand that. Could you please rephrase your question? I can help with bookings, account issues, pricing, and general information about GuestGrove.";
};

// API Routes for AJAX calls
exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    const userId = req.user ? req.user.id : null;

    console.log("Message:", message);
    console.log("Session ID:", sessionId);
    console.log("User ID:", userId);

    if (!message || !sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Message and session ID are required'
      });
    }

    // Save user message
    const userMessage = new ChatMessage({
      user: userId,
      sessionId,
      message,
      isBot: false
    });

    await userMessage.save();

    const botResponseText = getBotResponse(message);

    const botMessage = new ChatMessage({
      user: userId,
      sessionId,
      message: botResponseText,
      response: botResponseText,
      isBot: true
    });

    await botMessage.save();

    res.json({
      success: true,
      response: botResponseText,
      messageId: botMessage._id,
      timestamp: botMessage.timestamp
    });

  } catch (error) {
    console.error('🔥 Chatbot error:', error); // Check this output!
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};


exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user ? req.user.id : null;

    const messages = await ChatMessage.find({
      sessionId,
      ...(userId && { user: userId })
    }).sort({ timestamp: 1 });

    res.json({
      success: true,
      messages
    });

  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

exports.clearChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user ? req.user.id : null;

    await ChatMessage.deleteMany({
      sessionId,
      ...(userId && { user: userId })
    });

    res.json({
      success: true,
      message: 'Chat history cleared'
    });

  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};