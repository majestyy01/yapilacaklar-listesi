import React from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Download, FileDown } from 'lucide-react';
import { useStore } from '../store';

function SavedRecords() {
  const { tasks, notes } = useStore();

  const generateDailyReport = (date: string) => {
    const dayTasks = tasks.filter(task => task.date === date);
    const dayNotes = notes.filter(note => note.date === date);

    const report = {
      date,
      tasks: dayTasks.map(task => ({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        completed: task.completed,
      })),
      notes: dayNotes.map(note => note.content),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-report-${date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateMonthlyReport = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const report = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayTasks = tasks.filter(task => task.date === dateStr);
      const dayNotes = notes.filter(note => note.date === dateStr);

      return {
        date: dateStr,
        tasks: dayTasks.map(task => ({
          title: task.title,
          description: task.description,
          category: task.category,
          priority: task.priority,
          completed: task.completed,
        })),
        notes: dayNotes.map(note => note.content),
      };
    });

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monthly-report-${format(date, 'yyyy-MM')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Get unique dates from both tasks and notes
  const allDates = [...new Set([
    ...tasks.map(task => task.date),
    ...notes.map(note => note.date),
  ])].sort().reverse();

  // Group dates by month
  const monthlyGroups = allDates.reduce((acc, date) => {
    const monthKey = date.substring(0, 7); // YYYY-MM
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(date);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Kaydedilen Raporlar</h2>
        
        {Object.entries(monthlyGroups).map(([monthKey, dates]) => (
          <motion.div
            key={monthKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-700">
                {format(new Date(monthKey), 'MMMM yyyy', { locale: tr })}
              </h3>
              <button
                onClick={() => generateMonthlyReport(new Date(monthKey))}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FileDown className="w-4 h-4" />
                Aylık Rapor
              </button>
            </div>
            
            <div className="grid gap-2">
              {dates.map(date => {
                const dayTasks = tasks.filter(task => task.date === date);
                const dayNotes = notes.filter(note => note.date === date);
                
                return (
                  <div
                    key={date}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="text-gray-700">
                        {format(new Date(date), 'd MMMM yyyy', { locale: tr })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {dayTasks.length} görev, {dayNotes.length} not
                      </div>
                    </div>
                    <button
                      onClick={() => generateDailyReport(date)}
                      className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      İndir
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SavedRecords;