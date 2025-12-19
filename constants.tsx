
import React from 'react';
import { 
  Banknote, 
  GraduationCap, 
  Briefcase, 
  User, 
  Heart,
  AlertCircle
} from 'lucide-react';
import { CategoryType, Video } from './types';

export const CATEGORIES: { id: CategoryType; label: string; icon: React.ReactNode; color: string; description: string }[] = [
  { 
    id: 'Money', 
    label: 'Money Counseling', 
    icon: <Banknote className="w-6 h-6" />, 
    color: 'bg-emerald-100 text-emerald-700',
    description: 'Practical guidance for financial stress and budgeting mindfulness.'
  },
  { 
    id: 'Study', 
    label: 'Study Counseling', 
    icon: <GraduationCap className="w-6 h-6" />, 
    color: 'bg-blue-100 text-blue-700',
    description: 'Overcome exam anxiety and improve focus with proven techniques.'
  },
  { 
    id: 'Business', 
    label: 'Business Counseling', 
    icon: <Briefcase className="w-6 h-6" />, 
    color: 'bg-indigo-100 text-indigo-700',
    description: 'Mental resilience for entrepreneurs and corporate professionals.'
  },
  { 
    id: 'Personal', 
    label: 'Personal Counseling', 
    icon: <User className="w-6 h-6" />, 
    color: 'bg-rose-100 text-rose-700',
    description: 'Navigate self-discovery and manage everyday emotional well-being.'
  },
  { 
    id: 'Marriage', 
    label: 'Marriage Counseling', 
    icon: <Heart className="w-6 h-6" />, 
    color: 'bg-purple-100 text-purple-700',
    description: 'Strengthen bonds and resolve conflicts through empathetic communication.'
  },
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Mindful Budgeting',
    description: 'Learn how to manage finances without the overwhelming stress.',
    category: 'Money',
    thumbnail: 'https://picsum.photos/seed/money1/800/450',
    views: 1240
  },
  {
    id: '2',
    title: 'Focus Under Pressure',
    description: 'Techniques for staying calm during high-stakes exams.',
    category: 'Study',
    thumbnail: 'https://picsum.photos/seed/study1/800/450',
    views: 890
  },
  {
    id: '3',
    title: 'Leadership Resilience',
    description: 'Building mental toughness in the modern boardroom.',
    category: 'Business',
    thumbnail: 'https://picsum.photos/seed/biz1/800/450',
    views: 3200
  },
  {
    id: '4',
    title: 'Healing Inner Child',
    description: 'A deep dive into self-compassion and personal growth.',
    category: 'Personal',
    thumbnail: 'https://picsum.photos/seed/pers1/800/450',
    views: 5600
  },
  {
    id: '5',
    title: 'Communication in Love',
    description: 'Active listening skills for long-term partnership success.',
    category: 'Marriage',
    thumbnail: 'https://picsum.photos/seed/mar1/800/450',
    views: 2100
  }
];
