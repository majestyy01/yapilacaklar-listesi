import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from '../types';

const quotes: Quote[] = [
  { text: "Hayatta en hakiki mürşit ilimdir.", author: "Mustafa Kemal Atatürk" },
  { text: "Başarı, her gün tekrarlanan küçük çabaların toplamıdır.", author: "Robert Collier" },
  { text: "Bugün yapabileceğini yarına bırakma.", author: "Benjamin Franklin" },
  // Add more quotes as needed
];

function DailyQuote() {
  const [quote, setQuote] = useState<Quote>(quotes[0]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8 text-white"
    >
      <p className="text-xl font-medium italic mb-2">"{quote.text}"</p>
      <p className="text-sm opacity-80">- {quote.author}</p>
    </motion.div>
  );
}

export default DailyQuote;