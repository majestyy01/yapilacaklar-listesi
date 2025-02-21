import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { PlusCircle, Save } from 'lucide-react';
import { useStore } from '../store';
import { DailyNote } from '../types';

interface DailyNotesProps {
  date: Date;
}

function DailyNotes({ date }: DailyNotesProps) {
  const { notes, addNote, deleteNote } = useStore();
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const note: DailyNote = {
      id: Date.now().toString(),
      content: newNote,
      date: format(date, 'yyyy-MM-dd'),
    };
    addNote(note);
    setNewNote('');
  };

  const filteredNotes = notes.filter(
    (note) => note.date === format(date, 'yyyy-MM-dd')
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Günlük Notlar</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Bugün için not ekle..."
            className="w-full h-32 resize-none border-0 focus:ring-0 p-0"
          />
          <div className="flex justify-end mt-2 border-t pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Kaydet
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
              <div className="flex justify-between items-center mt-4 pt-2 border-t">
                <span className="text-sm text-gray-500">
                  {format(new Date(note.date), 'dd MMMM yyyy')}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Sil
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DailyNotes;