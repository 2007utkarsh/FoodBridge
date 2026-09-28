import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldAlert,
  ShieldCheck,
  Key,
  RotateCcw,
  UtensilsCrossed,
  HelpCircle,
  Mic,
  ChevronDown,
  Globe,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useFoodBridge } from '../../context/FoodBridgeContext';

// Helper: Detect script and language style
function detectLanguage(text) {
  if (!text) return 'english';
  // Devanagari Hindi Unicode block: \u0900-\u097F
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hindi';
  }

  const lower = text.toLowerCase();
  const hinglishMarkers = [
    'khana', 'bhojan', 'kaise', 'kare', 'karein', 'kya', 'hai', 'hain', 'batao', 'bataiye',
    'chahiye', 'nahi', 'karo', 'mujhe', 'humara', 'kahan', 'kitna', 'kitni', 'raat', 'sham',
    'shaam', 'subah', 'dedo', 'dena', 'lejao', 'bacha', 'bache', 'hoga', 'hogi', 'lagta',
    'paisa', 'paise', 'samajh', 'aasan', 'kharab', 'bhaiya', 'bhi', 'se', 'ko', 'par'
  ];

  const words = lower.split(/\s+/);
  const matchCount = words.filter(w => hinglishMarkers.includes(w)).length;

  if (matchCount >= 1 || lower.includes('kaise') || lower.includes('kya') || lower.includes('khana')) {
    return 'hinglish';
  }

  return 'english';
}

// Strict Domain Guardrail Check
function isFoodRelatedQuery(query) {
  const q = query.toLowerCase();

  const foodKeywords = [
    // English
    'food', 'waste', 'surplus', 'donate', 'donation', 'caterer', 'catering', 'hotel', 'banquet',
    'mess', 'hostel', 'canteen', 'kitchen', 'restaurant', 'ngo', 'shelter', 'charity', 'hunger',
    'meal', 'serving', 'servings', 'portion', 'leftover', 'leftovers', 'expiry', 'shelf life',
    'safety', 'hygiene', 'fssai', 'haccp', 'temperature', 'chiller', 'fridge', 'refrigerate',
    'hot hold', 'cold chain', 'tracking', 'pickup', 'pin', 'volunteer', 'driver', 'recipe',
    'produce', 'bread', 'bakery', 'rice', 'curry', 'vegetable', 'fruit', 'meat', 'chicken',
    'diet', 'vegetarian', 'vegan', 'biogas', 'compost', 'esg', 'carbon', 'methane', 'cost',
    'price', 'good samaritan', 'platform', 'foodbridge', 'app', 'sos', 'midnight', 'cascade',
    // Hindi & Hinglish
    'खाना', 'भोजन', 'बचा', 'अतिरिक्त', 'दान', 'वेस्ट', 'सुरक्षा', 'खराब', 'शेल्फ', 'तापमान',
    'रोटी', 'चावल', 'सब्जी', 'पनीर', 'दाल', 'बिरयानी', 'कैटरर', 'होटल', 'मेस', 'रसोई',
    'शेल्टर', 'ट्रैकिंग', 'पिकअप', 'पिन', 'लागत', 'फ्री', 'मुफ्त', 'खाद्य', 'भूख',
    'khana', 'bhojan', 'bacha', 'daan', 'donate', 'surplus', 'rasoi', 'roti', 'chawal', 'paneer',
    'dal', 'sabzi', 'biryani', 'kharab', 'fssai', 'hygiene', 'safety'
  ];

  const blacklistPatterns = [
    'python', 'javascript', 'java', 'c++', 'html', 'css', 'code', 'coding', 'program', 'bug', 'function',
    'cricket', 'football', 'ipl', 'match', 'score', 'stadium', 'movie', 'cinema', 'bollywood', 'actor',
    'actress', 'modi', 'rahul', 'bjp', 'congress', 'politics', 'election', 'vote', 'prime minister',
    'joke', 'shayari', 'song', 'gaana', 'love', 'dating', 'girlfriend', 'boyfriend', 'capital of',
    'weather in london', 'who is', 'history of war', 'math', 'calculate', 'solve', 'equation'
  ];

  for (const bl of blacklistPatterns) {
    if (q.includes(bl) && !q.includes('food') && !q.includes('khana') && !q.includes('bhojan')) {
      return false;
    }
  }

  return foodKeywords.some(keyword => q.includes(keyword));
}

// Multilingual Knowledge Base: Natural Hindi, Natural Hinglish, and Professional English
const MULTILINGUAL_KNOWLEDGE = {
  donate: {
    triggers: ['donate', 'post', 'khana kaise', 'kaise de', 'दान', 'कैसे दें', 'surplus', 'bacha hua'],
    hindi: `नमस्ते! FoodBridge पर अतिरिक्त (surplus) भोजन दान करना बहुत ही सरल है:

1. मुख्य नेविगेशन में **"Post Surplus"** पर क्लिक करें।
2. भोजन का विवरण भरें — जैसे व्यंजन का नाम (उदा. शाही पनीर, पुलाव, रोटी), कुल मात्रा (किलोग्राम में), और बनने का समय।
3. **Pickup Deadline (समय सीमा)** निर्धारित करें ताकि भोजन सुरक्षित तापमान पर ही वितरित हो सके।
4. आप हमारे **"🎙️ Voice AI"** बटन का उपयोग करके बोलकर भी फॉर्म भर सकते हैं।
5. फॉर्म सबमिट करते ही आपके क्षेत्र के पंजीकृत और सत्यापित NGOs को तुरंत सूचना (alert) चली जाती है।`,

    hinglish: `Namaste! FoodBridge par surplus khana donate karna bohot hi simple hai:

1. Top menu me **"Post Surplus"** par click karein.
2. Apne khane ka naam (jaise Shahi Paneer, Dal, Pulao), total quantity ($kg$ me) aur preparation time dalein.
3. Ek **Pickup Deadline** set karein taaki khana kharab hone se pehle pick ho sake.
4. Aap hamare **"🎙️ Voice AI"** mic button se bol kar bhi pura form 1 second me bhar sakte hain!
5. Submit karte hi aas-paas ke verified NGOs ko instant notification chala jata hai.`,

    english: `Hello! Donating surplus food on FoodBridge is seamless and takes under two minutes:

1. Click **"Post Surplus"** in the top navigation bar.
2. Enter the meal description (e.g. Basmati Rice, Curries, Rotis), net quantity in kilograms, and preparation time.
3. Specify a strict **Pickup Deadline** to guarantee consumption within safe HACCP shelf-life limits.
4. You can also use our **"🎙️ Voice AI"** feature to dictate details hands-free in Hindi or English.
5. Once submitted, nearby verified NGOs and community shelters receive an instant claim broadcast.`
  },

  safety: {
    triggers: ['safety', 'safe', 'fssai', 'poisoning', 'hygiene', 'सुरक्षा', 'सुरक्षित', 'कानूनी', 'legal', 'liability', 'good samaritan'],
    hindi: `भोजन की सुरक्षा और कानूनी संरक्षण FoodBridge की सर्वोच्च प्राथमिकता है:

• **तापमान दिशानिर्देश (HACCP):** पका हुआ गर्म भोजन 60°C से अधिक गर्म और ठंडा भोजन 4°C से कम तापमान पर रखा जाना चाहिए।
• **Digital Food Safety Passport:** प्रत्येक भोजन बैच के साथ एक डिजिटल QR पासपोर्ट जारी होता है, जिसमें कुकिंग तापमान (74°C) और कोल्ड-चेन लॉग दर्ज होते हैं।
• **Good Samaritan Legal Protection:** FSSAI (Surplus Food Recovery Regulations, 2019) के तहत भोजन दानदाताओं को पूर्ण कानूनी सुरक्षा (सिविल व क्रिमिनल छूट) प्राप्त है, यदि भोजन सद्भाव और स्वच्छता के साथ दिया गया हो।`,

    hinglish: `Food safety aur legal security FoodBridge par 100% ensured hai:

• **Temperature Control:** Paka hua khana >60°C par hot-held ya <4°C par chilled hona zaroori hai.
• **Digital Food Safety Passport:** Har surplus batch ke sath ek digital QR Passport banta hai jisme cooking temperature ($74°C$ kill-step) aur storage verified hote hain.
• **Good Samaritan Law:** FSSAI 2019 regulations ke mutabiq donors (hotels/caterers) par kisi bhi tarah ki legal liability nahi hoti agar khana standard hygiene ke sath donate kiya gaya ho.`,

    english: `Food safety and legal protection are strictly guaranteed on FoodBridge:

• **HACCP Temperature Protocol:** Cooked hot meals must be held above 60°C, and chilled items maintained below 4°C.
• **Digital Food Safety Passport:** Every lot receives a cryptographic QR Passport recording cooking core temperatures (74°C kill-step) and thermal transit logs.
• **Good Samaritan Legal Indemnity:** Under India's FSSAI (Recovery & Distribution of Surplus Food) Regulations 2019, honest donors are completely protected from civil and criminal liability when donating in good faith.`
  },

  claim: {
    triggers: ['ngo', 'claim', 'accept', 'receive', 'दावा', 'कैसे मिलेगा', 'शेल्टर', 'shelter', 'kaise milega'],
    hindi: `NGOs और सामुदायिक रसोईयाँ (Community Kitchens) अतिरिक्त भोजन इस प्रकार प्राप्त कर सकती हैं:

1. **"NGO Discovery"** पेज पर जाएँ।
2. शहर में उपलब्ध भोजन की सूची में से आवश्यकतानुसार (पका हुआ, बेकरी, ताज़ी उपज) और दूरी के अनुसार फ़िल्टर करें।
3. किसी भी उपलब्ध बैच पर **"Claim / Accept"** पर क्लिक करें।
4. अपने वाहन का प्रकार (जैसे Insulated Food Van) और स्वयंसेवक का विवरण दर्ज करें।
5. सिस्टम तुरंत एक सुरक्षित **Pickup Tracking Code** और हैंडओवर पास जारी कर देगा।`,

    hinglish: `NGOs aur community shelters surplus khana is tarah claim kar sakte hain:

1. **"NGO Discovery"** tab par jayein.
2. Apne shehar me active listings ko category aur distance ke hisab se browse karein.
3. Kisi bhi batch par **"Claim / Accept"** click karein.
4. Apna transport mode (Insulated Van / E-Rickshaw) aur volunteer contact confirm karein.
5. System turant ek tracking order aur secure pickup code generate kar dega.`,

    english: `Registered NGOs, food banks, and shelters can claim surplus food in these steps:

1. Navigate to the **"NGO Discovery"** portal.
2. Browse active city listings filtered by meal type, dietary category, and proximity.
3. Click **"Claim / Accept"** on any available surplus lot.
4. Confirm your assigned volunteer coordinator and transport method (e.g. Insulated Food Van).
5. The system immediately generates an order and dispatch pass for pickup.`
  },

  tracking: {
    triggers: ['track', 'pickup', 'pin', 'delivery', 'कहाँ पहुंचा', 'ट्रैक', 'ड्राइवर', 'kahan pahuncha', 'driver'],
    hindi: `लाइव पिकअप और हैंडओवर ट्रैकिंग प्रणाली:

• **4-अंकीय सत्यापन पिन (PIN):** जैसे ही NGO भोजन स्वीकार करता है, एक गोपनीय 4-डिजिट PIN (उदा. 4829) बनता है।
• **हैंडओवर सुरक्षा:** जब ड्राइवर कैटरर/होटल पर पहुँचता है, तो वह किचन मैनेजर को यह PIN दिखाकर भोजन प्राप्त करता है।
• **लाइव GPS रूट:** वाहन का वास्तविक समय (real-time) स्थान, तापमान सेंसर रीडिंग, और शेल्टर पहुँचने का समय (ETA) मैप पर लाइव दिखाई देता है।`,

    hinglish: `Live Pickup aur Delivery Tracking aise kaam karta hai:

• **4-Digit Handover PIN:** Jab NGO khana claim karta hai, ek unique 4-digit PIN (e.g. 4829) generate hota hai.
• **Safe Handover:** Volunteer driver kitchen gate par pahunch kar PIN verify karwata hai, jisse wrong handover nahi hota.
• **Live GPS Route:** Map par van ka live movement aur beneficiary shelter tak ka ETA real-time me dikhta hai.`,

    english: `Live Pickup & Delivery Tracking Workflow:

• **4-Digit Verification PIN:** Upon claiming, a unique 4-digit security PIN (e.g. 4829) is generated for the order.
• **Secure Handover:** The NGO driver presents this digital PIN to the kitchen manager at the loading dock to release the containers.
• **Live GPS Telemetry:** Real-time route progression, onboard thermal holding temperatures, and estimated transit time (ETA) are continuously displayed on the map.`
  },

  shelf_life: {
    triggers: ['expiry', 'shelf life', 'kharab', 'खराब', 'अवधि', 'kab tak', 'समय सीमा'],
    hindi: `भोजन की सुरक्षित शेल्फ़-लाइफ़ और उपभोग सीमा:

• **पका हुआ गर्म भोजन:** अधिकतम 3 से 4 घंटे (60°C से ऊपर)। इसके पश्चात जीवाणु पनपने का जोखिम रहता है।
• **प्रशीतित (Chilled) भोजन:** 2°C से 4°C पर 24 से 48 घंटे तक सुरक्षित रहता है।
• **बेकरी उत्पाद:** सूखे व सामान्य तापमान पर 12 से 24 घंटे।
• हमारे प्लेटफ़ॉर्म पर **Computer Vision AI** फ़ोटो स्कैन करके फ़्रेशनेस स्कोर (0–100%) और बची हुई शेल्फ़-लाइफ़ स्वतः बता देता है।`,

    hinglish: `Khane ki shelf life aur safety limits:

• **Paka hua garam khana:** Max 3 se 4 ghante (>60°C hot-held). Iske baad khana kharab hone ka risk rehta hai.
• **Chilled khana:** 2°C se 4°C par 24 se 48 ghante tak safe rehta hai.
• **Bakery items:** Room temperature par 12 se 24 ghante tak fresh rehte hain.
• Hamara **Computer Vision AI** food photo scan karke automatically Freshness Score aur safe ghante calculate kar leta hai.`,

    english: `Food Shelf-Life and HACCP Holding Thresholds:

• **Hot-Held Cooked Meals:** Safe for up to 3 to 4 hours held strictly above 60°C. Exceeding this risks bacterial proliferation.
• **Chilled / Refrigerated Foods:** Safe for 24 to 48 hours maintained continuously at 2°C to 4°C.
• **Bakery & Dry Goods:** Safe for 12 to 24 hours at ambient dry conditions.
• Our **Computer Vision Freshness Inspector** automatically estimates the remaining safe consumption window using optical surface analysis.`
  },

  sos: {
    triggers: ['sos', 'emergency', 'midnight', 'shaadi', 'शादी', 'रात्री', 'raat', 'night'],
    hindi: `शादी व बड़े कार्यक्रमों के लिए Midnight SOS आपातकालीन सुविधा:

• यदि देर रात (जैसे 11:30 PM) 50 से 150 किलोग्राम भोजन बच जाता है, तो शीर्ष बार में **"Midnight SOS"** बटन दबाएँ।
• यह तुरंत 8 किमी के दायरे में मौजूद 24/7 खुले नाइट शेल्टर्स और ऑन-कॉल इन्सुलेटेड वैनों को उच्च-प्राथमिकता वाला सायरन व SMS अलर्ट भेजता है।
• इससे भोजन सुबह होने से पहले ही ज़रूरतमंदों तक सुरक्षित पहुँचा दिया जाता है।`,

    hinglish: `Late-night wedding receptions ke liye Midnight SOS feature:

• Agar raat 11:30 PM par banquet me 50-100 kg khana bach jaye, to top bar me **Midnight SOS** click karein.
• Ye turant 8 km ke radius me 24/7 open night-shelters aur on-call delivery vans ko high-priority siren SMS bhejta hai.
• Subah khana kharab hone se pehle raat me hi rescue ho jata hai.`,

    english: `Midnight SOS Emergency Surplus Rescue:

• Designed specifically for late-night wedding receptions and banquets generating 50–150 kg of untouched surplus around 11:30 PM.
• Clicking the **"Midnight SOS"** button broadcasts a high-priority siren alert to all registered 24/7 shelters and on-call thermal rescue vans within an 8 km radius.
• This ensures rapid dispatch before morning spoilage.`
  }
};

// Guardrail Rejection Messages by Language
const GUARDRAIL_REJECTIONS = {
  hindi: `नमस्ते! 🙏 मैं **FoodBridge AI सहायक** हूँ।

मैं **केवल और केवल** भोजन दान, फ़ूड वेस्ट प्रिवेंशन, फ़ूड सेफ़्टी और FoodBridge प्लेटफ़ॉर्म से जुड़े प्रश्नों के उत्तर दे सकता हूँ।

आपका यह प्रश्न भोजन या redistribution के दायरे से बाहर है। कृपया भोजन, शेल्फ़-लाइफ़, NGO क्लेम, या प्लेटफ़ॉर्म से संबंधित कोई प्रश्न पूछें!`,

  hinglish: `Namaste! 🙏 Mai **FoodBridge ka dedicated AI Assistant** hu.

Mai **sirf aur sirf** surplus food donation, FoodBridge platform, aur food safety se jude sawalon ke jawab de sakta hu.

Aapka ye sawal food redistribution ke topic se bahar hai. Kripya bhojan, storage, donation ya platform se juda koi sawal puchein!`,

  english: `Hello! 🙏 I am the **FoodBridge AI Assistant**.

I am strictly specialized in surplus food redistribution, institutional food waste management, food safety standards (FSSAI/HACCP), and FoodBridge platform workflows.

Your question is outside the food redistribution domain. Please ask a question related to food donation, safe storage, NGO claims, or platform operations!`
};

// Fallback Answer by Language
const GENERAL_FALLBACK = {
  hindi: `आपका प्रश्न भोजन और redistribution प्रणाली से जुड़ा है।

FoodBridge प्लेटफ़ॉर्म पर:
• **खाद्य स्रोत (Caterers/Hotels/Messes):** अपना अतिरिक्त भोजन 'Post Surplus' में दर्ज करते हैं।
• **NGOs व शेल्टर्स:** 'NGO Discovery' से तुरंत क्लेम करके पिकअप शेड्यूल करते हैं।
• सुरक्षित हैंडओवर के लिए **4-डिजिट PIN** और **डिजिटल फ़ूड पासपोर्ट** का उपयोग होता है।

आप विशिष्ट विषय पूछ सकते हैं — जैसे: *"भोजन कैसे दान करें?"*, *"फ़ूड सेफ़्टी नियम क्या हैं?"*, या *"लाइव पिकअप कैसे ट्रैक करें?"*`,

  hinglish: `Aapka sawal food redistribution aur platform se juda hai.

FoodBridge par:
• **Food Donors (Caterers/Hotels):** Apna surplus khana 'Post Surplus' me add karte hain.
• **NGOs & Shelters:** 'NGO Discovery' se khana claim karke volunteer dispatch karte hain.
• Safe handover ke liye **4-digit PIN** aur **FSSAI Food Safety Passport** use hota hai.

Aap specific sawal pooch sakte hain jaise: *"Khana kaise donate karein?"*, *"Food safety guidelines kya hain?"*, ya *"Pickup tracking kaise kaam karti hai?"*`,

  english: `Your question relates to food redistribution and platform operations.

On FoodBridge:
• **Food Sources (Hotels/Caterers/Messes):** Log surplus batches on the 'Post Surplus' portal.
• **NGOs & Food Banks:** Browse and claim batches on 'NGO Discovery' with assigned volunteers.
• **Safety & Integrity:** Verified via a **4-digit handover PIN** and **FSSAI Digital Food Passport**.

Feel free to ask specific questions such as: *"How to donate food?"*, *"What are the food safety guidelines?"*, or *"How does live pickup tracking work?"*`
};

export default function FoodBridgeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: `नमस्ते! I am the FoodBridge AI Assistant. 
आप मुझसे हिंदी (Devanagari), Hinglish, या English में FoodBridge प्लेटफ़ॉर्म, सरप्लस भोजन दान, और फ़ूड सेफ़्टी से जुड़े सवाल पूछ सकते हैं।`,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('fb_llm_api_key') || '');
  const [showKeyConfig, setShowKeyConfig] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const detectedLang = detectLanguage(query);

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lang: detectedLang
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // 1. If user provided a Gemini API Key (starts with AIza), use live Google Gemini with strict guardrails
    if (apiKey && apiKey.trim().startsWith('AIza')) {
      try {
        const systemPrompt = `You are FoodBridge AI Assistant, an expert on the FoodBridge platform, surplus food redistribution, institutional kitchen waste reduction, and food safety standards (FSSAI/HACCP).

STRICT LANGUAGE REQUIREMENT:
- If the user wrote in Hindi (Devanagari script), you MUST reply in pure, natural, respectful Hindi (Devanagari script).
- If the user wrote in English, you MUST reply in professional, clear, articulate English.
- If the user wrote in Hinglish (Hindi words in Latin letters), reply in natural, conversational Hinglish.
DO NOT MIX SCRIPTS ABNORMALLY. Match the user's language and tone seamlessly.

STRICT DOMAIN GUARDRAIL:
You must ONLY answer questions directly related to food, cooking, shelf life, food waste, food donation, NGOs, caterers, food safety, nutrition, or the FoodBridge platform.
If the user asks about ANYTHING ELSE (such as coding, general trivia, politics, sports, movies, math problems), you MUST POLITELY REFUSE in the user's language, stating that you are strictly dedicated to food waste management and redistribution.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }]
              }
            ]
          })
        });

        const data = await response.json();
        const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (botReply) {
          const isBlocked = botReply.toLowerCase().includes('refuse') || botReply.toLowerCase().includes('only answer') || botReply.includes('केवल') || botReply.includes('sirf');
          setMessages(prev => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: botReply,
              isGuarded: isBlocked,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              source: 'Gemini 1.5 Flash (Live Cloud LLM)'
            }
          ]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local multilingual knowledge engine:', err);
      }
    }

    // 2. Intelligent Built-in Multilingual Engine (Zero API Key Needed)
    setTimeout(() => {
      // Check Guardrail
      if (!isFoodRelatedQuery(query)) {
        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: GUARDRAIL_REJECTIONS[detectedLang] || GUARDRAIL_REJECTIONS.english,
            isGuarded: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            source: 'FoodBridge AI Guardrail Engine'
          }
        ]);
        setIsTyping(false);
        return;
      }

      // Match Knowledge Base
      const qLower = query.toLowerCase();
      let matchedResponse = null;

      for (const key of Object.keys(MULTILINGUAL_KNOWLEDGE)) {
        const item = MULTILINGUAL_KNOWLEDGE[key];
        if (item.triggers.some(trig => qLower.includes(trig) || query.includes(trig))) {
          matchedResponse = item[detectedLang] || item.english;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = GENERAL_FALLBACK[detectedLang] || GENERAL_FALLBACK.english;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: matchedResponse,
          isGuarded: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: `FoodBridge NLP (${detectedLang.toUpperCase()})`
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickChips = [
    { label: 'खाना कैसे दान करें? (Hindi)', text: 'खाना कैसे दान करें?' },
    { label: 'How to claim food? (English)', text: 'How do NGOs claim surplus food?' },
    { label: 'Food safety rules kya hai? (Hinglish)', text: 'Khana kharab hone se kaise bachta hai fssai rules kya hai?' },
    { label: 'Write python code (Guardrail Test)', text: 'Write a python code for sorting numbers' }
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-2xl border border-emerald-500/40 hover:scale-105 transition-all group"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 animate-ping" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block tracking-wide">FoodBridge AI Chat</span>
              <span className="text-[10px] text-emerald-400 font-medium">हिंदी • English • Food Only</span>
            </div>
          </button>
        )}
      </div>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full sm:w-[440px] h-[600px] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white">FoodBridge AI Assistant</h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">हिंदी & English Adaptive</span>
                  <span>•</span>
                  <span>Food Only</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowKeyConfig(!showKeyConfig)}
                title="Connect Gemini / OpenAI Key"
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                  apiKey ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">{apiKey ? 'Gemini Active' : 'API Key'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Optional API Key Configuration Panel */}
          {showKeyConfig && (
            <div className="p-3.5 bg-slate-950 text-white text-xs border-b border-slate-800 space-y-2.5 animate-in fade-in">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[11px] text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Connect Google Gemini 1.5 Flash (Free Cloud LLM)
                </span>
                <span className="text-[10px] text-slate-400">Optional</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                By default, this bot uses our <strong>built-in Multilingual Engine for free</strong>. If you want Google Gemini Cloud LLM generation, paste your free Gemini API key below:
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste Gemini Key (starts with AIza...)"
                  className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    localStorage.setItem('fb_llm_api_key', apiKey.trim());
                    setShowKeyConfig(false);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Save
                </button>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                <span>Free Key from Google AI Studio</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Get Free Key</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              </div>
            </div>
          )}

          {/* Language Indicator Strip */}
          <div className="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-950 font-medium">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>Language: <strong>हिंदी में पूछें</strong> या <strong>English</strong></span>
            </span>
            <span className="text-[10px] text-emerald-800 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
              Only Food Topics
            </span>
          </div>

          {/* Quick FAQ Chips */}
          <div className="p-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.text)}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-800 font-medium whitespace-nowrap shrink-0 transition-colors shadow-2xs text-[10.5px]"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    msg.sender === 'user' ? 'bg-slate-800' : 'bg-emerald-600'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-1.5 ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-xs'
                      : msg.isGuarded
                      ? 'bg-amber-50 text-amber-950 border border-amber-200 rounded-tl-xs'
                      : 'bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/60'
                  }`}
                >
                  {msg.isGuarded && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 pb-1 border-b border-amber-200/60">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      <span>Irrelevant Query Blocked (Only Food Allowed)</span>
                    </div>
                  )}

                  <p className="whitespace-pre-line leading-relaxed text-xs">
                    {msg.text}
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-200/40">
                    <span>{msg.source || 'FoodBridge AI'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                <div className="flex items-center gap-1 bg-slate-100 px-3 py-2 rounded-2xl border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] font-medium text-slate-600 ml-1">Typing answer...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="हिंदी में लिखें या Type in English..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim()}
              className={`p-2.5 rounded-xl text-white font-bold transition-all shadow-md ${
                inputQuery.trim()
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
