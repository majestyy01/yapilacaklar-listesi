import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ListTodo,
  Download,
  Code2,
} from 'lucide-react';
import { useStore } from './store';
import TaskList from './components/TaskList';
import DailyQuote from './components/DailyQuote';
import Analytics from './components/Analytics';
import DailyNotes from './components/DailyNotes';
import CalendarView from './components/CalendarView';
import SavedRecords from './components/SavedRecords';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Günlük Planlayıcı</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateDate('prev')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-indigo-500" />
                  <span className="text-lg font-medium text-gray-700">
                    {format(currentDate, 'dd MMMM yyyy', { locale: tr })}
                  </span>
                </div>
                <button
                  onClick={() => navigateDate('next')}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex space-x-4 border-b overflow-x-auto pb-1">
              {[
                { id: 'tasks', icon: ListTodo, label: 'Görevler' },
                { id: 'calendar', icon: CalendarIcon, label: 'Takvim' },
                { id: 'analytics', icon: BarChart2, label: 'Analiz' },
                { id: 'notes', icon: BookOpen, label: 'Notlar' },
                { id: 'saved', icon: Download, label: 'Kaydedilenler' },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <DailyQuote />
            
            {activeTab === 'tasks' && <TaskList date={currentDate} />}
            {activeTab === 'calendar' && <CalendarView onDateSelect={setCurrentDate} selectedDate={currentDate} />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'notes' && <DailyNotes date={currentDate} />}
            {activeTab === 'saved' && <SavedRecords />}
          </div>

          <div className="p-4 bg-gray-50 border-t">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Code2 className="w-4 h-4" />
              <span>Made by</span>
              <a
                href="https://github.com/majestyy01"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                woxicdev
              </a>
              <span>- 2025</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
