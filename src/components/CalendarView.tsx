import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { tr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

interface CalendarViewProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

function CalendarView({ onDateSelect, selectedDate }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const { tasks } = useStore();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => task.date === format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(currentMonth, 'MMMM yyyy', { locale: tr })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            const dayTasks = getTasksForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentMonth);

            return (
              <motion.button
                key={day.toString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDateSelect(day)}
                className={`
                  aspect-square p-2 rounded-lg relative
                  ${isSelected ? 'bg-indigo-500 text-white' : 'hover:bg-gray-50'}
                  ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                `}
              >
                <span className="text-sm">{format(day, 'd')}</span>
                {dayTasks.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {dayTasks.length <= 3 ? (
                      dayTasks.map((_, i) => (
                        <Circle
                          key={i}
                          className={`w-1.5 h-1.5 ${
                            isSelected ? 'text-white' : 'text-indigo-500'
                          }`}
                          fill="currentColor"
                        />
                      ))
                    ) : (
                      <span className={`text-xs ${
                        isSelected ? 'text-white' : 'text-indigo-500'
                      }`}>
                        {dayTasks.length}
                      </span>
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          {format(selectedDate, 'd MMMM yyyy', { locale: tr })} Görevleri
        </h3>
        <div className="space-y-2">
          {getTasksForDate(selectedDate).map(task => (
            <div
              key={task.id}
              className="p-3 bg-gray-50 rounded-lg flex items-center gap-3"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  task.priority === 'high'
                    ? 'bg-red-500'
                    : task.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarView;