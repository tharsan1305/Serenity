
export type CategoryType = 'Money' | 'Study' | 'Business' | 'Personal' | 'Marriage';

export interface User {
  id: string;
  name: string;
  age: string;
  mobile: string;
  address: string;
  isPremium: boolean;
  isLoggedIn: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  thumbnail: string;
  views: number;
}

export interface MoodEntry {
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'angry';
  note: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  summary?: string;
}
