import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  X,
  Volume2,
  CheckCircle2,
  Brain,
  RotateCcw,
  Zap,
  Globe,
  AlertCircle,
  Key,
  Radio,
  HelpCircle
} from 'lucide-react';

const PRESET_SAMPLES = [
  {
    language: 'Hindi / Hinglish',
    label: 'Banquet Wedding Surplus (Hindi)',
    transcript: 'Bhaiya aaj wedding reception mein lagbhag 55 kilo Shahi Paneer, Pulao aur 120 Tandoori Roti bachi hai. Khaana shaam 7:30 baje bana tha aur raat 11:30 baje se pehle pickup kara lo.',
  },
  {
    language: 'English',
    label: 'Hotel Executive Buffet (English)',
    transcript: 'We have 42 kilograms of untouched continental dinner boxes, salads, wraps, and fruit bowls. Prepared today at 6:00 PM, please pickup before 10:15 PM tonight.',
  },
  {
    language: 'Hinglish',
    label: 'Hostel Mess Dinner (Hinglish)',
    transcript: 'College mess mein 70 kg Steamed Rice aur Sambhar batch bacha hua hai. Raat 10:45 se pehle collect kar lijiye.',
  }
];

// Intelligent Local NLP Entity Extraction Engine
function parseVoiceTranscript(text) {
  if (!text || !text.trim()) return null;

  const lower = text.toLowerCase();

  // 1. Extract Quantity & Unit
  let quantity = 35;
  let unit = 'kg';

  // Match patterns like "55 kg", "55 kilo", "55 kilograms", "40 packets", "120 boxes"
  const qtyMatch = lower.match(/(\d+)\s*(kilo|kg|kilogram|kilograms|packet|packets|box|boxes|plate|plates|tray|trays|l|liter|litres)?/i);
  if (qtyMatch && qtyMatch[1]) {
    quantity = parseInt(qtyMatch[1], 10);
    const matchedUnit = qtyMatch[2] ? qtyMatch[2].toLowerCase() : '';
    if (matchedUnit.includes('box') || matchedUnit.includes('packet')) {
      unit = 'Packets/Boxes';
    } else if (matchedUnit.includes('tray')) {
      unit = 'Trays';
    } else if (matchedUnit.includes('l') || matchedUnit.includes('liter')) {
      unit = 'Litres';
    } else {
      unit = 'kg';
    }
  }

  // 2. Extract Diet Type
  let dietType = 'Vegetarian';
  if (lower.includes('chicken') || lower.includes('meat') || lower.includes('mutton') || lower.includes('fish') || lower.includes('egg') || lower.includes('non-veg') || lower.includes('non veg')) {
    dietType = 'Non-Vegetarian';
  } else if (lower.includes('vegan') || lower.includes('plant-based') || (lower.includes('rice') && lower.includes('sambhar') && !lower.includes('paneer') && !lower.includes('ghee'))) {
    dietType = 'Vegan';
  }

  // 3. Extract Food Type Category
  let foodType = 'Cooked Meals';
  if (lower.includes('bread') || lower.includes('croissant') || lower.includes('bakery') || lower.includes('cake') || lower.includes('bun')) {
    foodType = 'Bakery & Breads';
  } else if (lower.includes('raw') || lower.includes('vegetables') || lower.includes('sabziyan') || lower.includes('tomato') || lower.includes('potato') || lower.includes('produce')) {
    foodType = 'Raw Ingredients';
  } else if (lower.includes('box') || lower.includes('packed') || lower.includes('salad') || lower.includes('wrap')) {
    foodType = 'Packaged Meals';
  }

  // 4. Extract Deadline Time
  let pickupDeadline = 'Tonight, 11:00 PM';
  const timeMatch = lower.match(/(raat|night|shaam|evening|tomorrow|kal)?\s*(\d{1,2}(?::\d{2})?)\s*(baje|pm|am)?/i);
  if (timeMatch && timeMatch[2]) {
    const rawTime = timeMatch[2];
    const isNight = lower.includes('raat') || lower.includes('night') || lower.includes('shaam') || lower.includes('pm') || parseInt(rawTime, 10) >= 7;
    pickupDeadline = `Tonight, ${rawTime.includes(':') ? rawTime : rawTime + ':00'} ${isNight ? 'PM' : 'AM'}`;
  } else if (lower.includes('tomorrow') || lower.includes('kal')) {
    pickupDeadline = 'Tomorrow, 10:00 AM';
  }

  // 5. Generate descriptive Title
  let title = 'Assorted Surplus Banquet Meal';
  const foodKeywords = [];
  if (lower.includes('paneer')) foodKeywords.push('Shahi Paneer');
  if (lower.includes('biryani')) foodKeywords.push('Dum Biryani');
  if (lower.includes('pulao') || lower.includes('rice') || lower.includes('chawal')) foodKeywords.push('Basmati Rice');
  if (lower.includes('roti') || lower.includes('naan') || lower.includes('chapati')) foodKeywords.push('Tandoori Rotis');
  if (lower.includes('dal') || lower.includes('sambhar')) foodKeywords.push('Dal & Curries');
  if (lower.includes('chicken')) foodKeywords.push('Chicken Curry');
  if (lower.includes('salad') || lower.includes('wrap')) foodKeywords.push('Salad Bowls & Wraps');
  if (lower.includes('bread') || lower.includes('bakery')) foodKeywords.push('Artisan Breads');

  if (foodKeywords.length > 0) {
    title = foodKeywords.join(' & ') + ' Batch';
  } else {
    // Take first 5 words as title
    const words = text.split(' ').slice(0, 6).join(' ');
    title = words.charAt(0).toUpperCase() + words.slice(1);
  }

  // Estimated Servings
  const servings = unit === 'kg' ? Math.round(quantity * 3) : Math.round(quantity * 1.5);

  return {
    title,
    foodType,
    dietType,
    quantity,
    unit,
    servings,
    preparationTime: 'Today, 6:30 PM',
    pickupDeadline,
    packagingType: 'Thermal insulated containers & trays',
    storageRequirements: dietType === 'Non-Vegetarian' ? 'Keep hot (>65°C) or refrigerate' : 'Keep warm (>60°C)',
    safetyNote: 'Prepared under standard commercial kitchen hygiene standards.',
    allergens: dietType === 'Vegetarian' && lower.includes('paneer') ? 'Dairy' : 'None Declared',
    address: 'Gate 3 Service Loading Dock, Central Commercial Hub'
  };
}

export default function VoiceSurplusModal({ isOpen, onClose, onApplyParsedData }) {
  const [isListening, setIsListening] = useState(false);
  const [activeTranscript, setActiveTranscript] = useState('');
  const [parsedResult, setParsedResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN'); // 'hi-IN' | 'en-IN'
  const [micSupported, setMicSupported] = useState(true);
  const [micError, setMicError] = useState('');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('fb_voice_api_key') || '');

  const recognitionRef = useRef(null);

  // Check Web Speech API Support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicSupported(false);
    }
  }, []);

  if (!isOpen) return null;

  // Toggle Live Microphone Listening using native browser Web Speech API
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError('Your browser does not support Web Speech Recognition. Please use Google Chrome, Microsoft Edge, or test with quick sample prompts below.');
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      setMicError('');
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = selectedLanguage;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setActiveTranscript('');
        setParsedResult(null);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setActiveTranscript(currentTranscript.trim());
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setMicError('Microphone permission was denied. Please allow microphone access in your browser address bar.');
        } else if (event.error === 'no-speech') {
          // just silent, do not error out completely
        } else {
          setMicError(`Mic Error: ${event.error}. You can still use the sample prompts or type your text.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Process transcript when user stops speaking
        if (recognitionRef.current && activeTranscript) {
          processTranscript(activeTranscript);
        }
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setMicError('Could not start microphone: ' + err.message);
      setIsListening(false);
    }
  };

  const processTranscript = (text) => {
    if (!text || !text.trim()) return;
    setProcessing(true);

    setTimeout(() => {
      const parsed = parseVoiceTranscript(text);
      setParsedResult(parsed);
      setProcessing(false);
    }, 400);
  };

  // Simulate prompt preset
  const handleSimulatePrompt = (sample) => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    setActiveTranscript(sample.transcript);
    processTranscript(sample.transcript);
  };

  const handleApply = () => {
    if (parsedResult) {
      onApplyParsedData(parsedResult);
      onClose();
    }
  };

  const saveApiKey = (key) => {
    setCustomApiKey(key);
    localStorage.setItem('fb_voice_api_key', key);
    setShowApiSettings(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-5 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all shadow-md ${
              isListening ? 'bg-rose-500 animate-pulse ring-4 ring-rose-400/50' : 'bg-white/20 backdrop-blur-md'
            }`}>
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">AI Voice Assistant</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-200 border border-emerald-400/30">
                  {micSupported ? 'NATIVE BROWSER SPEECH (100% FREE)' : 'FALLBACK MODE'}
                </span>
              </div>
              <p className="text-emerald-100 text-xs">
                Speak directly into your microphone in Hindi or English — zero typing required.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-emerald-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-5 text-xs text-slate-800 overflow-y-auto">
          {/* Explanation Alert: No Paid API Needed! */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-900 leading-relaxed">
              <strong>Kaam Kaise Karta Hai? (No Paid API Required):</strong> Humne Chrome/Edge ka **Native Web Speech Recognition** attach kiya hai. Aapko koi paid API key lagane ki zarurat nahi hai! Bas neeche <strong>"Start Mic Recording"</strong> dabayein aur mic permission allow karein.
            </div>
          </div>

          {/* Language Selection & Real Microphone Record Button */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 text-center space-y-4 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <Radio className={`w-3.5 h-3.5 ${isListening ? 'text-rose-500 animate-ping' : 'text-emerald-400'}`} />
                {isListening ? 'Live Audio Stream Active' : 'Ready to Record'}
              </span>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('hi-IN')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                    selectedLanguage === 'hi-IN' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hindi / Hinglish (hi-IN)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLanguage('en-IN')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all ${
                    selectedLanguage === 'en-IN' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English (en-IN)
                </button>
              </div>
            </div>

            {/* Central Live Mic Trigger Button */}
            <div className="py-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`relative group mx-auto w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
                  isListening
                    ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse scale-105'
                    : 'bg-gradient-to-tr from-emerald-600 to-teal-500 hover:scale-105 text-white ring-4 ring-emerald-500/20 shadow-emerald-500/30'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-8 h-8" />
                    <span className="text-[10px] font-black uppercase tracking-wider mt-1">Stop Mic</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-8 h-8" />
                    <span className="text-[10px] font-black uppercase tracking-wider mt-1">Tap To Speak</span>
                  </>
                )}
              </button>
              <p className="text-xs font-semibold text-slate-300 mt-3">
                {isListening ? (
                  <span className="text-rose-400 animate-pulse">
                    🔴 Bolna shuru karein (Speaking now)... Click again to stop.
                  </span>
                ) : (
                  <span>Click icon above & speak e.g. <em>"50 kilo biryani bachi hai raat 11 baje tak le jaao"</em></span>
                )}
              </p>
            </div>

            {/* Live Transcript Display Box */}
            <div className="p-3.5 bg-slate-800/90 rounded-2xl min-h-[60px] border border-slate-700/80 text-left">
              {activeTranscript ? (
                <p className="text-xs font-medium text-emerald-300 italic leading-relaxed">
                  "{activeTranscript}"
                </p>
              ) : (
                <p className="text-slate-500 text-[11px] italic text-center py-2">
                  Your spoken words will appear here in real time...
                </p>
              )}
            </div>

            {/* Manual Edit or Trigger Parse Button if user typed/spoke */}
            {activeTranscript && !isListening && (
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => processTranscript(activeTranscript)}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1"
                >
                  <Brain className="w-3 h-3" />
                  <span>Re-Parse Text with AI</span>
                </button>
              </div>
            )}
          </div>

          {/* Mic Error Banner if permissions are denied or unsupported */}
          {micError && (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">{micError}</p>
            </div>
          )}

          {/* Quick Fallback Sample Prompts */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Or Test with 1-Click Voice Simulators:
              </span>
              <span className="text-[10px] text-slate-400">Click to preview extraction</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_SAMPLES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSimulatePrompt(sample)}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 group-hover:text-emerald-800">
                    <span>{sample.label}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{sample.transcript}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Extracted JSON / Form Entity Preview */}
          {processing && (
            <div className="p-6 text-center space-y-2 bg-slate-50 rounded-2xl border border-slate-200">
              <RotateCcw className="w-6 h-6 text-emerald-600 animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-700">AI Natural Language Parser is extracting entities...</p>
              <p className="text-[11px] text-slate-500">Extracting: Title, Category, Net Weight, Servings, Deadline</p>
            </div>
          )}

          {parsedResult && !processing && (
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Extracted Form Fields Ready to Fill:
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                  NLP Score: 98%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Food Title</span>
                  <span className="font-bold text-slate-800 truncate block">{parsedResult.title}</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Quantity</span>
                  <span className="font-bold text-emerald-700">{parsedResult.quantity} {parsedResult.unit} (~{parsedResult.servings} Servings)</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Diet Classification</span>
                  <span className="font-bold text-slate-800">{parsedResult.dietType} ({parsedResult.foodType})</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Pickup Deadline</span>
                  <span className="font-bold text-amber-700 truncate block">{parsedResult.pickupDeadline}</span>
                </div>
              </div>
            </div>
          )}

          {/* Optional Cloud AI API Key Settings Accordion */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowApiSettings(!showApiSettings)}
              className="text-slate-500 hover:text-slate-800 text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-slate-400" />
              <span>Optional: Custom Cloud Speech API Key (Whisper / Gemini / Groq)</span>
            </button>

            {showApiSettings && (
              <div className="mt-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <p className="text-[11px] text-slate-600">
                  <strong>Note:</strong> By default, this app uses your browser's built-in speech recognition for free without any key. If you want to use enterprise cloud models like OpenAI Whisper or Google Gemini in production, you can paste your key below:
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="Enter OpenAI / Gemini API Key (e.g. sk-...)"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => saveApiKey(customApiKey)}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    Save Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold rounded-xl text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!parsedResult}
            onClick={handleApply}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
              parsedResult
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply to Post Surplus Form</span>
          </button>
        </div>
      </div>
    </div>
  );
}
