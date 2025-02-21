import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, DailyNote } from './types';

interface AppState {
  tasks: Task[];
  notes: DailyNote[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  addNote: (note: DailyNote) => void;
  deleteTask: (id: string) => void;
  deleteNote: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      notes: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);