import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from '../types';

const quotes: Quote[] = [
  { text: "Hayatta en hakiki mürşit ilimdir.", author: "Mustafa Kemal Atatürk" },
  { text: "Bütün dünya üzerinize gelse bile, doğru bildiğiniz yolda yürümekten vazgeçmeyin.", author: "Hz. Ali" },
  { text: "Başarı, her gün tekrarlanan küçük çabaların toplamıdır.", author: "Robert Collier" },
  { text: "Bugün yapabileceğini yarına bırakma.", author: "Benjamin Franklin" },
  { text: "Ne kadar bilirsen bil, söylediklerin karşındakinin anlayabildiği kadardır.", author: "Mevlana" },
  { text: "Mutluluk, düşündüğün, söylediğin ve yaptığının uyum içinde olmasıdır.", author: "Mahatma Gandhi" },
  { text: "Zorlukları aşmanın en iyi yolu, onları yaşamaktır.", author: "Albert Einstein" },
  { text: "Başarıya ulaşmanın en kesin yolu, bir kez daha denemektir.", author: "Thomas Edison" },
  { text: "Bilgi güçtür, ama karakter daha da büyük bir güçtür.", author: "Bruce Lee" },
  { text: "Başkalarının senin hakkında ne düşündüğü önemli değildir, senin kendin hakkında ne düşündüğün önemlidir.", author: "Paulo Coelho" },
  { text: "İmkansız diye bir şey yoktur, sadece biraz zaman alır.", author: "Napoleon Bonaparte" },
  { text: "Cesaret, korkuya direnmek ve korkuya hükmetmektir; korkusuzluk değildir.", author: "Mark Twain" },
  { text: "Eğer mutlu bir hayat yaşamak istiyorsan, bir amaca bağlan, insanlara ya da eşyalara değil.", author: "Albert Einstein" },
  { text: "Küçük şeylerden keyif almasını bilmeyen, büyük mutlulukları da yaşayamaz.", author: "William Hazlitt" },
  { text: "Eğer yürüdüğün yolda engeller yoksa, o yol seni bir yere götürmez.", author: "Bernard Shaw" },
  { text: "Güçlü olan, yenilmeyen yalnızca azmedendir.", author: "Napoleon Bonaparte" },
  { text: "İnsanın kaderi, karakteridir.", author: "Herakleitos" },
  { text: "Gerçek özgürlük, başkalarının ne düşündüğüne aldırmamaktır.", author: "Epiktetos" },
  { text: "İnsanlar genellikle olduklarından daha mutlu görünmeye çalışırlar.", author: "La Rochefoucauld" },
  { text: "Büyük işler, küçük adımlarla başlar.", author: "Lao Tzu" },
  { text: "Başarı, düşmek değil, her düştüğünde ayağa kalkabilmektir.", author: "Vince Lombardi" },
  { text: "Zamanınızı boşa harcamayın, çünkü hayat zamanın ta kendisidir.", author: "Bruce Lee" },
  { text: "Hiçbir zaman çıktığın yolda vazgeçme. Çünkü en karanlık an, güneşin doğmasına en yakın andır.", author: "Paulo Coelho" },
  { text: "Düşersen, ayağa kalk. Tekrar dene. Daha akıllıca dene.", author: "Henry Ford" },
  { text: "Güçlü olan, yenilmeyen yalnızca azmedendir.", author: "Napoleon Bonaparte" },
  { text: "Başarı, kendine inananlarındır.", author: "Virgil" },
  { text: "İnsanlar genellikle olduklarından daha mutlu görünmeye çalışırlar.", author: "La Rochefoucauld" },
  { text: "Zafer, en çok dayanabilene aittir.", author: "Napoleon Bonaparte" },
  { text: "Hedefi olmayan gemiye hiçbir rüzgar yardım edemez.", author: "Montaigne" },
  { text: "Küçük adımlar, büyük zaferlerin başlangıcıdır.", author: "Tony Robbins" },
  { text: "Büyük işler, küçük adımlarla başlar.", author: "Lao Tzu" },
  { text: "Her büyük başarı, küçük bir adımla başlar.", author: "Confucius" },
  { text: "Hayat, sınırlarını zorlayanlar için ödüllerle doludur.", author: "Richard Branson" }
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
