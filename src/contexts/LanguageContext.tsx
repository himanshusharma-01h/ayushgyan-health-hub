import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.features': { en: 'Features', hi: 'विशेषताएं' },
  'nav.consultation': { en: 'AI Vaidya', hi: 'एआई वैद्य' },
  'nav.products': { en: 'Products', hi: 'आयुर्वेदिक उत्पाद' },
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },
  'nav.doctors': { en: 'Doctors', hi: 'डॉक्टर' },
  'nav.login': { en: 'Login', hi: 'लॉगिन' },
  'nav.getStarted': { en: 'Get Started', hi: 'शुरू करें' },
  'nav.askAI': { en: 'Ask AI', hi: 'AI से पूछें' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफाइल' },

  // Hero Section
  'hero.badge': { en: 'AI-Powered Ayurvedic Health Platform', hi: 'AI-संचालित आयुर्वेदिक स्वास्थ्य प्लेटफ़ॉर्म' },
  'hero.title1': { en: 'AI Powered', hi: 'AI संचालित' },
  'hero.title2': { en: 'Ayurvedic', hi: 'आयुर्वेदिक' },
  'hero.title3': { en: 'Guidance', hi: 'मार्गदर्शन' },
  'hero.subtitle': { en: 'Ask AI about Ayurveda, natural remedies, and healthy living. Discover your Prakriti, get dosha analysis, and explore personalized wellness.', hi: 'आयुर्वेद, प्राकृतिक उपचार और स्वस्थ जीवन के बारे में AI से पूछें। अपनी प्रकृति जानें, दोष विश्लेषण करें और व्यक्तिगत कल्याण का अनुभव करें।' },
  'hero.askAI': { en: 'Ask AI Now', hi: 'अभी AI से पूछें' },
  'hero.prakritiTest': { en: 'Take Prakriti Test', hi: 'प्रकृति परीक्षण करें' },
  'hero.learnMore': { en: 'Learn More', hi: 'और जानें' },
  'hero.users': { en: 'Users', hi: 'उपयोगकर्ता' },
  'hero.queries': { en: 'AI Queries', hi: 'AI प्रश्न' },
  'hero.rating': { en: 'Rating', hi: 'रेटिंग' },
  'hero.chatQuestion': { en: "What's my dosha type and how can I balance it?", hi: 'मेरा दोष प्रकार क्या है और मैं इसे कैसे संतुलित कर सकता हूँ?' },
  'hero.chatAnswer': { en: 'Based on Ayurvedic principles, your body type can be Vata, Pitta, or Kapha. Take our Prakriti quiz for a detailed analysis with personalized diet & lifestyle tips...', hi: 'आयुर्वेदिक सिद्धांतों के अनुसार, आपका शरीर प्रकार वात, पित्त या कफ हो सकता है। व्यक्तिगत आहार और जीवनशैली सुझावों के साथ विस्तृत विश्लेषण के लिए हमारी प्रकृति परीक्षा दें...' },

  // Features Section
  'features.badge': { en: 'Features', hi: 'विशेषताएं' },
  'features.title': { en: 'Everything you need for', hi: 'आपके लिए सब कुछ' },
  'features.titleHighlight': { en: 'holistic wellness', hi: 'समग्र कल्याण' },
  'features.subtitle': { en: 'Powered by AI, rooted in Ayurveda — your complete health companion.', hi: 'AI से संचालित, आयुर्वेद में निहित — आपका संपूर्ण स्वास्थ्य साथी।' },
  'features.aiVaidya': { en: 'AI Vaidya Chat', hi: 'एआई वैद्य चैट' },
  'features.aiVaidyaDesc': { en: 'Get instant Ayurvedic health guidance from our AI trained on ancient texts and modern wellness research.', hi: 'प्राचीन ग्रंथों और आधुनिक कल्याण अनुसंधान पर प्रशिक्षित हमारे AI से तुरंत आयुर्वेदिक स्वास्थ्य मार्गदर्शन प्राप्त करें।' },
  'features.doshaAnalysis': { en: 'Dosha Analysis', hi: 'दोष विश्लेषण' },
  'features.doshaAnalysisDesc': { en: 'Discover your unique Prakriti (body constitution) with our AI-powered dosha assessment quiz.', hi: 'हमारी AI-संचालित दोष मूल्यांकन प्रश्नोत्तरी से अपनी अनूठी प्रकृति (शारीरिक संरचना) जानें।' },
  'features.naturalRemedies': { en: 'Natural Remedies', hi: 'प्राकृतिक उपचार' },
  'features.naturalRemediesDesc': { en: 'Explore time-tested herbal remedies, home treatments, and natural solutions for common health issues.', hi: 'सामान्य स्वास्थ्य समस्याओं के लिए समय-परीक्षित हर्बल उपचार, घरेलू उपचार और प्राकृतिक समाधान खोजें।' },
  'features.products': { en: 'Ayurvedic Products', hi: 'आयुर्वेदिक उत्पाद' },
  'features.productsDesc': { en: 'Shop authentic Ayurvedic supplements, oils, and wellness essentials from verified manufacturers.', hi: 'सत्यापित निर्माताओं से प्रामाणिक आयुर्वेदिक पूरक, तेल और कल्याण आवश्यक सामग्री खरीदें।' },
  'features.tryChat': { en: 'Try AI Chat', hi: 'AI चैट आज़माएं' },
  'features.takeQuiz': { en: 'Take Quiz', hi: 'परीक्षा दें' },
  'features.explore': { en: 'Explore', hi: 'खोजें' },
  'features.shopNow': { en: 'Shop Now', hi: 'अभी खरीदें' },

  // Testimonials
  'testimonials.badge': { en: 'Testimonials', hi: 'प्रशंसापत्र' },
  'testimonials.title': { en: 'Trusted by', hi: 'विश्वसनीय' },
  'testimonials.titleHighlight': { en: 'thousands', hi: 'हज़ारों लोगों द्वारा' },
  'testimonials.subtitle': { en: 'See what our users say about their Ayurvedic wellness journey.', hi: 'देखें कि हमारे उपयोगकर्ता अपनी आयुर्वेदिक कल्याण यात्रा के बारे में क्या कहते हैं।' },

  // About
  'about.badge': { en: 'About Us', hi: 'हमारे बारे में' },
  'about.title': { en: 'Ancient wisdom meets', hi: 'प्राचीन ज्ञान मिलता है' },
  'about.titleHighlight': { en: 'modern AI', hi: 'आधुनिक AI से' },
  'about.desc1': { en: 'AyushGyaan AI is an AI-powered platform created to spread Ayurvedic knowledge and wellness tips to everyone. We combine the timeless wisdom of Ayurveda with cutting-edge artificial intelligence.', hi: 'AyushGyaan AI एक AI-संचालित प्लेटफ़ॉर्म है जो आयुर्वेदिक ज्ञान और कल्याण सुझावों को सभी तक पहुंचाने के लिए बनाया गया है। हम आयुर्वेद के कालातीत ज्ञान को अत्याधुनिक कृत्रिम बुद्धिमत्ता के साथ जोड़ते हैं।' },
  'about.desc2': { en: 'Our mission is to make authentic Ayurvedic health guidance accessible, understandable, and actionable — whether you\'re exploring natural remedies, understanding your body type (Prakriti), or seeking daily wellness routines.', hi: 'हमारा मिशन प्रामाणिक आयुर्वेदिक स्वास्थ्य मार्गदर्शन को सुलभ, समझने योग्य और कार्रवाई योग्य बनाना है — चाहे आप प्राकृतिक उपचार खोज रहे हों, अपनी शारीरिक प्रकृति समझ रहे हों, या दैनिक कल्याण दिनचर्या की तलाश कर रहे हों।' },
  'about.questionsAnswered': { en: 'Questions Answered', hi: 'प्रश्नों के उत्तर' },
  'about.langSupport': { en: '& English Support', hi: 'और अंग्रेज़ी सहायता' },
  'about.freeToUse': { en: 'Free to Use', hi: 'मुफ़्त उपयोग' },
  'about.aiAvailable': { en: 'AI Available', hi: 'AI उपलब्ध' },

  // CTA
  'cta.badge': { en: 'Get Started Free', hi: 'मुफ्त शुरू करें' },
  'cta.title': { en: 'Start your Ayurvedic wellness journey today', hi: 'आज ही अपनी आयुर्वेदिक कल्याण यात्रा शुरू करें' },
  'cta.subtitle': { en: 'Discover your dosha, get AI-powered health guidance, and explore authentic Ayurvedic products — all for free.', hi: 'अपना दोष जानें, AI-संचालित स्वास्थ्य मार्गदर्शन प्राप्त करें, और प्रामाणिक आयुर्वेदिक उत्पाद खोजें — सब मुफ्त।' },
  'cta.askAI': { en: 'Ask AI Now', hi: 'अभी AI से पूछें' },
  'cta.prakritiQuiz': { en: 'Take Prakriti Quiz', hi: 'प्रकृति परीक्षा दें' },

  // Disclaimer
  'disclaimer.title': { en: 'Medical Disclaimer', hi: 'चिकित्सा अस्वीकरण' },
  'disclaimer.text1': { en: 'AyushGyaan AI provides informational content only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions regarding a medical condition.', hi: 'AyushGyaan AI केवल सूचनात्मक सामग्री प्रदान करता है और यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। किसी भी चिकित्सा स्थिति के बारे में हमेशा योग्य स्वास्थ्य सेवा प्रदाता की सलाह लें।' },
  'disclaimer.text2': { en: 'The Ayurvedic knowledge shared here is for educational purposes. Never disregard professional medical advice or delay seeking treatment because of something you read or received from this AI assistant.', hi: 'यहाँ साझा किया गया आयुर्वेदिक ज्ञान शैक्षिक उद्देश्यों के लिए है। इस AI सहायक से प्राप्त जानकारी के कारण कभी भी पेशेवर चिकित्सा सलाह की अवहेलना न करें या उपचार में देरी न करें।' },

  // Chat
  'chat.title': { en: 'AI Vaidya', hi: 'एआई वैद्य' },
  'chat.subtitle': { en: 'AI Powered Ayurvedic Guidance', hi: 'एआई संचालित आयुर्वेदिक मार्गदर्शन' },
  'chat.newConsultation': { en: 'New Consultation', hi: 'नई परामर्श' },
  'chat.recentChats': { en: 'Recent Chats', hi: 'हालिया चैट' },
  'chat.backToDashboard': { en: 'Back to Dashboard', hi: 'डैशबोर्ड पर वापस' },
  'chat.placeholder': { en: 'Ask about Ayurvedic remedies, lifestyle tips...', hi: 'आयुर्वेदिक उपचार, जीवनशैली सुझावों के बारे में पूछें...' },
  'chat.disclaimer': { en: 'AI Vaidya provides general Ayurvedic guidance. Always consult a qualified practitioner for medical advice.', hi: 'AI वैद्य सामान्य आयुर्वेदिक मार्गदर्शन प्रदान करता है। चिकित्सा सलाह के लिए हमेशा योग्य चिकित्सक से परामर्श करें।' },
  'chat.welcome': { 
    en: `🙏 Namaste! I am your AI Vaidya, here to guide you on your Ayurvedic wellness journey.\n\nI can help you with:\n• Understanding your Prakriti (body constitution)\n• Ayurvedic remedies for common ailments\n• Diet and lifestyle recommendations\n• Herbal supplements guidance\n• Stress management and mental wellness\n\nHow may I assist you today?`,
    hi: `🙏 नमस्ते! मैं आपका AI वैद्य हूँ, आपकी आयुर्वेदिक कल्याण यात्रा में मार्गदर्शन के लिए।\n\nमैं इनमें आपकी मदद कर सकता हूँ:\n• आपकी प्रकृति (शारीरिक संरचना) समझना\n• सामान्य बीमारियों के आयुर्वेदिक उपचार\n• आहार और जीवनशैली सुझाव\n• हर्बल पूरक मार्गदर्शन\n• तनाव प्रबंधन और मानसिक कल्याण\n\nआज मैं आपकी कैसे सहायता कर सकता हूँ?`
  },
  'chat.voiceNotSupported': { en: 'Voice input is not supported in your browser.', hi: 'आपके ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।' },
  'chat.voiceError': { en: 'Could not capture voice input. Please try again.', hi: 'वॉइस इनपुट कैप्चर नहीं हो सका। कृपया पुनः प्रयास करें।' },
  'chat.listening': { en: 'Listening...', hi: 'सुन रहा हूँ...' },
  'chat.newStarted': { en: 'Started a new consultation with AI Vaidya.', hi: 'AI वैद्य के साथ नई परामर्श शुरू हुई।' },

  // Prakriti Quiz
  'prakriti.pageTitle': { en: 'Prakriti Analysis', hi: 'प्रकृति विश्लेषण' },
  'prakriti.resultsTitle': { en: 'Your Prakriti Results', hi: 'आपके प्रकृति परिणाम' },
  'prakriti.question': { en: 'Question', hi: 'प्रश्न' },
  'prakriti.of': { en: 'of', hi: 'में से' },
  'prakriti.previous': { en: 'Previous', hi: 'पिछला' },
  'prakriti.next': { en: 'Next', hi: 'अगला' },
  'prakriti.seeResults': { en: 'See Results', hi: 'परिणाम देखें' },
  'prakriti.yourPrakriti': { en: 'Your Prakriti', hi: 'आपकी प्रकृति' },
  'prakriti.basedOn': { en: 'Based on your responses, here\'s your dosha constitution', hi: 'आपकी प्रतिक्रियाओं के आधार पर, यहाँ आपकी दोष संरचना है' },
  'prakriti.whatThisMeans': { en: 'What this means for you', hi: 'आपके लिए इसका क्या अर्थ है' },
  'prakriti.explanation': { en: 'Understanding your Prakriti helps personalize your Ayurvedic health journey. Your constitution influences your dietary needs, lifestyle choices, and the types of treatments that work best for you.', hi: 'अपनी प्रकृति समझना आपकी आयुर्वेदिक स्वास्थ्य यात्रा को व्यक्तिगत बनाने में मदद करता है। आपकी शारीरिक संरचना आपकी आहार आवश्यकताओं, जीवनशैली विकल्पों और उपचारों को प्रभावित करती है।' },
  'prakriti.retake': { en: 'Retake Quiz', hi: 'दोबारा परीक्षा दें' },
  'prakriti.goDashboard': { en: 'Go to Dashboard', hi: 'डैशबोर्ड पर जाएं' },
  'prakriti.airSpace': { en: 'Air & Space', hi: 'वायु और आकाश' },
  'prakriti.fireWater': { en: 'Fire & Water', hi: 'अग्नि और जल' },
  'prakriti.earthWater': { en: 'Earth & Water', hi: 'पृथ्वी और जल' },

  // Prakriti Quiz Questions
  'prakriti.q1.category': { en: 'Body Frame', hi: 'शरीर संरचना' },
  'prakriti.q1.question': { en: 'What best describes your body frame?', hi: 'आपकी शारीरिक संरचना का सबसे अच्छा वर्णन क्या है?' },
  'prakriti.q1.vata': { en: 'Thin, light frame with visible bones and veins', hi: 'पतला, हल्का शरीर जिसमें हड्डियाँ और नसें दिखती हैं' },
  'prakriti.q1.pitta': { en: 'Medium, athletic build with good muscle definition', hi: 'मध्यम, एथलेटिक शरीर जिसमें अच्छी मांसपेशियाँ दिखती हैं' },
  'prakriti.q1.kapha': { en: 'Large, sturdy frame with tendency to gain weight', hi: 'बड़ा, मजबूत शरीर जिसमें वजन बढ़ने की प्रवृत्ति है' },
  'prakriti.q2.category': { en: 'Skin Type', hi: 'त्वचा का प्रकार' },
  'prakriti.q2.question': { en: 'How would you describe your skin?', hi: 'आप अपनी त्वचा का वर्णन कैसे करेंगे?' },
  'prakriti.q2.vata': { en: 'Dry, rough, thin, or cool to touch', hi: 'सूखी, खुरदरी, पतली, या छूने में ठंडी' },
  'prakriti.q2.pitta': { en: 'Warm, oily, prone to redness or acne', hi: 'गर्म, तैलीय, लालिमा या मुँहासे की प्रवृत्ति' },
  'prakriti.q2.kapha': { en: 'Thick, soft, smooth, and well-moisturized', hi: 'मोटी, मुलायम, चिकनी और अच्छी तरह नम' },
  'prakriti.q3.category': { en: 'Hair', hi: 'बाल' },
  'prakriti.q3.question': { en: 'What best describes your hair?', hi: 'आपके बालों का सबसे अच्छा वर्णन क्या है?' },
  'prakriti.q3.vata': { en: 'Dry, frizzy, thin, or brittle', hi: 'सूखे, उलझे, पतले या भंगुर' },
  'prakriti.q3.pitta': { en: 'Fine, straight, prone to early graying or thinning', hi: 'बारीक, सीधे, जल्दी सफेद होने या पतले होने की प्रवृत्ति' },
  'prakriti.q3.kapha': { en: 'Thick, wavy, lustrous, and oily', hi: 'घने, लहरदार, चमकदार और तैलीय' },
  'prakriti.q4.category': { en: 'Appetite', hi: 'भूख' },
  'prakriti.q4.question': { en: 'How is your appetite?', hi: 'आपकी भूख कैसी है?' },
  'prakriti.q4.vata': { en: 'Variable - sometimes strong, sometimes weak', hi: 'अनिश्चित - कभी तेज, कभी कम' },
  'prakriti.q4.pitta': { en: 'Strong - I get irritable if I miss a meal', hi: 'तेज - खाना छूट जाए तो चिड़चिड़ापन होता है' },
  'prakriti.q4.kapha': { en: 'Steady but not intense - I can skip meals easily', hi: 'स्थिर लेकिन तीव्र नहीं - मैं आसानी से खाना छोड़ सकता हूँ' },
  'prakriti.q5.category': { en: 'Digestion', hi: 'पाचन' },
  'prakriti.q5.question': { en: 'How is your digestion?', hi: 'आपका पाचन कैसा है?' },
  'prakriti.q5.vata': { en: 'Irregular with gas and bloating', hi: 'अनियमित, गैस और सूजन के साथ' },
  'prakriti.q5.pitta': { en: 'Quick and strong, may have acid reflux', hi: 'तेज और मजबूत, एसिडिटी हो सकती है' },
  'prakriti.q5.kapha': { en: 'Slow and steady, heavy feeling after meals', hi: 'धीमा और स्थिर, खाने के बाद भारीपन' },
  'prakriti.q6.category': { en: 'Sleep', hi: 'नींद' },
  'prakriti.q6.question': { en: 'How do you sleep?', hi: 'आप कैसे सोते हैं?' },
  'prakriti.q6.vata': { en: 'Light sleeper, often wake up during the night', hi: 'हल्की नींद, रात में बार-बार जागना' },
  'prakriti.q6.pitta': { en: 'Moderate, wake up feeling alert', hi: 'मध्यम, जागने पर सतर्क महसूस करना' },
  'prakriti.q6.kapha': { en: 'Deep and long, hard to wake up', hi: 'गहरी और लंबी, जागना मुश्किल' },
  'prakriti.q7.category': { en: 'Mind & Emotions', hi: 'मन और भावनाएं' },
  'prakriti.q7.question': { en: 'How would you describe your mind?', hi: 'आप अपने मन का वर्णन कैसे करेंगे?' },
  'prakriti.q7.vata': { en: 'Quick, creative, but easily distracted or anxious', hi: 'तेज, रचनात्मक, लेकिन आसानी से विचलित या चिंतित' },
  'prakriti.q7.pitta': { en: 'Sharp, focused, but can be irritable or critical', hi: 'तेज, केंद्रित, लेकिन चिड़चिड़ा या आलोचनात्मक हो सकता है' },
  'prakriti.q7.kapha': { en: 'Calm, steady, but can be slow or resistant to change', hi: 'शांत, स्थिर, लेकिन धीमा या बदलाव से प्रतिरोधी' },
  'prakriti.q8.category': { en: 'Stress Response', hi: 'तनाव प्रतिक्रिया' },
  'prakriti.q8.question': { en: 'How do you react to stress?', hi: 'आप तनाव पर कैसे प्रतिक्रिया करते हैं?' },
  'prakriti.q8.vata': { en: 'Become anxious, worried, or fearful', hi: 'चिंतित, परेशान या डरा हुआ महसूस करना' },
  'prakriti.q8.pitta': { en: 'Become irritated, frustrated, or angry', hi: 'चिड़चिड़ा, निराश या गुस्सा होना' },
  'prakriti.q8.kapha': { en: 'Become withdrawn, stubborn, or emotionally eat', hi: 'अंतर्मुखी, जिद्दी या भावनात्मक खाना' },
  'prakriti.q9.category': { en: 'Weather Preference', hi: 'मौसम पसंद' },
  'prakriti.q9.question': { en: 'Which weather do you dislike most?', hi: 'आपको कौन सा मौसम सबसे ज्यादा नापसंद है?' },
  'prakriti.q9.vata': { en: 'Cold and dry weather', hi: 'ठंडा और सूखा मौसम' },
  'prakriti.q9.pitta': { en: 'Hot and humid weather', hi: 'गर्म और उमस भरा मौसम' },
  'prakriti.q9.kapha': { en: 'Cold and damp weather', hi: 'ठंडा और नम मौसम' },
  'prakriti.q10.category': { en: 'Energy Levels', hi: 'ऊर्जा स्तर' },
  'prakriti.q10.question': { en: 'How are your energy levels throughout the day?', hi: 'दिन भर आपकी ऊर्जा का स्तर कैसा रहता है?' },
  'prakriti.q10.vata': { en: 'Variable - bursts of energy followed by fatigue', hi: 'अनिश्चित - ऊर्जा का उछाल और फिर थकान' },
  'prakriti.q10.pitta': { en: 'Intense and sustained until I burn out', hi: 'तीव्र और निरंतर जब तक थक नहीं जाता' },
  'prakriti.q10.kapha': { en: 'Steady and enduring but slow to start', hi: 'स्थिर और टिकाऊ लेकिन शुरू करने में धीमा' },

  // Products
  'products.badge': { en: 'Authentic Ayurvedic', hi: 'प्रामाणिक आयुर्वेदिक' },
  'products.title': { en: 'Ayurvedic', hi: 'आयुर्वेदिक' },
  'products.titleHighlight': { en: 'Products', hi: 'उत्पाद' },
  'products.subtitle': { en: 'Verified supplements, oils, and wellness essentials for your health journey', hi: 'आपकी स्वास्थ्य यात्रा के लिए सत्यापित पूरक, तेल और कल्याण आवश्यक सामग्री' },
  'products.search': { en: 'Search products...', hi: 'उत्पाद खोजें...' },
  'products.all': { en: 'All', hi: 'सभी' },
  'products.supplements': { en: 'Supplements', hi: 'पूरक' },
  'products.oils': { en: 'Oils & Care', hi: 'तेल और देखभाल' },
  'products.wellness': { en: 'Wellness', hi: 'कल्याण' },
  'products.addToCart': { en: 'Add to Cart', hi: 'कार्ट में डालें' },
  'products.items': { en: 'items', hi: 'सामान' },
  'products.inCart': { en: 'in your cart', hi: 'आपके कार्ट में' },
  'products.checkout': { en: 'Checkout', hi: 'चेकआउट' },
  'products.noProducts': { en: 'No products found matching your criteria.', hi: 'आपके मापदंडों से मिलता कोई उत्पाद नहीं मिला।' },

  // Login
  'login.welcome': { en: 'Welcome Back', hi: 'वापसी पर स्वागत' },
  'login.subtitle': { en: 'Sign in to continue your wellness journey', hi: 'अपनी कल्याण यात्रा जारी रखने के लिए साइन इन करें' },
  'login.patient': { en: 'Patient', hi: 'रोगी' },
  'login.doctor': { en: 'Doctor', hi: 'डॉक्टर' },
  'login.email': { en: 'Email', hi: 'ईमेल' },
  'login.password': { en: 'Password', hi: 'पासवर्ड' },
  'login.rememberMe': { en: 'Remember me', hi: 'याद रखें' },
  'login.forgotPassword': { en: 'Forgot password?', hi: 'पासवर्ड भूल गए?' },
  'login.signingIn': { en: 'Signing in...', hi: 'साइन इन हो रहा है...' },
  'login.signInAs': { en: 'Sign in as', hi: 'के रूप में साइन इन करें' },
  'login.noAccount': { en: "Don't have an account?", hi: 'खाता नहीं है?' },
  'login.signUp': { en: 'Sign up', hi: 'साइन अप करें' },
  'login.demoMode': { en: 'Demo Mode: Click "Sign in" with any credentials to explore', hi: 'डेमो मोड: एक्सप्लोर करने के लिए किसी भी क्रेडेंशियल के साथ "साइन इन" पर क्लिक करें' },

  // Dashboard
  'dashboard.home': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  'dashboard.quickActions': { en: 'Quick Actions', hi: 'त्वरित कार्य' },
  'dashboard.chatAI': { en: 'Chat with AI Vaidya', hi: 'AI वैद्य से चैट करें' },
  'dashboard.takePrakriti': { en: 'Take Prakriti Quiz', hi: 'प्रकृति परीक्षा दें' },
  'dashboard.upcomingAppointment': { en: 'Upcoming Appointment', hi: 'आगामी अपॉइंटमेंट' },
  'dashboard.recentConsultations': { en: 'Recent Consultations', hi: 'हालिया परामर्श' },
  'dashboard.recentOrders': { en: 'Recent Orders', hi: 'हालिया ऑर्डर' },
  'dashboard.doshaBalance': { en: 'Dosha Balance', hi: 'दोष संतुलन' },
  'dashboard.todaysRituals': { en: "Today's Rituals", hi: 'आज की दिनचर्या' },
  'dashboard.continueRituals': { en: 'Continue Rituals', hi: 'दिनचर्या जारी रखें' },
  'dashboard.dailyTip': { en: 'Daily Wellness Tip', hi: 'दैनिक कल्याण सुझाव' },
  'dashboard.viewAll': { en: 'View All', hi: 'सभी देखें' },

  // Payment
  'payment.payNow': { en: 'Pay Now', hi: 'अब भुगतान करें' },
  'payment.success': { en: 'Payment Successful', hi: 'भुगतान सफल रहा' },
  'payment.failed': { en: 'Payment Failed', hi: 'भुगतान असफल हुआ' },
  'payment.processing': { en: 'Processing Payment...', hi: 'भुगतान प्रोसेस हो रहा है...' },
  'payment.consultationFee': { en: 'Consultation Fee', hi: 'परामर्श शुल्क' },
  'payment.bookAppointment': { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },
  'payment.payAndBook': { en: 'Pay & Book', hi: 'भुगतान करें और बुक करें' },
  'payment.retry': { en: 'Retry Payment', hi: 'पुनः भुगतान करें' },

  // Appointments
  'appointment.selectDate': { en: 'Select Date', hi: 'तारीख चुनें' },
  'appointment.selectTime': { en: 'Select Time', hi: 'समय चुनें' },
  'appointment.yourName': { en: 'Your Name', hi: 'आपका नाम' },
  'appointment.yourEmail': { en: 'Your Email', hi: 'आपका ईमेल' },
  'appointment.reason': { en: 'Reason for Visit', hi: 'मिलने का कारण' },
  'appointment.confirmed': { en: 'Appointment Confirmed', hi: 'अपॉइंटमेंट कन्फर्म हो गया' },

  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.error': { en: 'Something went wrong', hi: 'कुछ गलत हो गया' },
  'common.success': { en: 'Success', hi: 'सफल' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.submit': { en: 'Submit', hi: 'जमा करें' },
  'common.close': { en: 'Close', hi: 'बंद करें' },
  'common.online': { en: 'Online', hi: 'ऑनलाइन' },

  // Footer
  'footer.rights': { en: 'All rights reserved', hi: 'सर्वाधिकार सुरक्षित' },
  'footer.privacy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  'footer.terms': { en: 'Terms & Conditions', hi: 'नियम और शर्तें' },
  'footer.disclaimer': { en: 'Disclaimer', hi: 'अस्वीकरण' },
  'footer.platform': { en: 'Platform', hi: 'प्लेटफ़ॉर्म' },
  'footer.company': { en: 'Company', hi: 'कंपनी' },
  'footer.legal': { en: 'Legal', hi: 'कानूनी' },
  'footer.contact': { en: 'Contact', hi: 'संपर्क' },
  'footer.tagline': { en: 'AI-powered Ayurvedic health guidance. Ancient wisdom meets modern technology.', hi: 'AI-संचालित आयुर्वेदिक स्वास्थ्य मार्गदर्शन। प्राचीन ज्ञान, आधुनिक तकनीक।' },
  'footer.disclaimerText': { en: 'AyushGyaan AI provides informational content only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider for medical concerns.', hi: 'AyushGyaan AI केवल सूचनात्मक सामग्री प्रदान करता है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। चिकित्सा चिंताओं के लिए हमेशा योग्य स्वास्थ्य सेवा प्रदाता से परामर्श करें।' },
  'footer.madeWith': { en: 'Made with 🌿 for holistic health', hi: '🌿 समग्र स्वास्थ्य के लिए बनाया गया' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language || (navigator as any).userLanguage || '';
  // Default to Hindi for Indian users
  if (browserLang.startsWith('hi') || browserLang === 'hi-IN') {
    return 'hi';
  }
  // Also check for common Indian locales
  const indianLocales = ['hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa', 'or'];
  const langCode = browserLang.split('-')[0];
  if (indianLocales.includes(langCode)) {
    return 'hi';
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ayushgyan-language');
    if (saved === 'en' || saved === 'hi') return saved;
    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem('ayushgyan-language', language);
    // Update html lang attribute
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};