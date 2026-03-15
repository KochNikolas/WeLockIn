export interface Challenge {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'Anfänger' | 'Mittel' | 'Profi';
  jokers: number;
  startDate: string;
  participants: number;
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
