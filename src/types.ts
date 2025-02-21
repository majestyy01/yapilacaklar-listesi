export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface DailyNote {
  id: string;
  content: string;
  date: string;
}

export interface Quote {
  text: string;
  author: string;
}