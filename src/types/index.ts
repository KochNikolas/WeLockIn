export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'Anfänger' | 'Mittel' | 'Profi';
  jokers: number;
  startDate: string;
  participants: number;
  imageUrl?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  count: number;
  newCount: number;
  totalParticipants: string;
  challenges: Challenge[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  badges?: string[];
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  text: string;
  timestamp: string;
  isMe?: boolean;
}
