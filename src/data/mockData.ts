import type { Category, User, Message } from '../types';
import sportBg from '../assets/categories/sport.jpg';
import foodBg from '../assets/categories/ernährung.jpg';
import verzichtBg from '../assets/categories/verzicht.jpg';
import digitalDetoxBg from '../assets/challenges/digital-detox.png';
import walkingImg from '../assets/challenges/walking.jpg';

export const categories: Category[] = [
  {
    id: '1',
    slug: 'sport',
    name: 'Sport & Fitness',
    description: 'Bewege deinen Körper, stäre deinen Geist.',
    imageUrl: sportBg,
    count: 13,
    newCount: 4,
    totalParticipants: '12.4k',
    challenges: [
      {
        id: 's1',
        title: '7 Tage Strength Streak',
        subtitle: 'Täglich 1 Stunde intensive körperliche Aktivität.',
        duration: '7 Tage',
        difficulty: 'Anfänger',
        jokers: 1,
        startDate: 'Morgen',
        participants: 245
      },
      {
        id: 's4',
        title: 'Daily Walk: Lite',
        subtitle: 'Bewege dich täglich: 6.000 Schritte für eine Woche.',
        duration: '7 Tage',
        difficulty: 'Anfänger',
        jokers: 2,
        startDate: 'Übermorgen',
        participants: 512,
        imageUrl: walkingImg
      },
      {
        id: 's5',
        title: 'Daily Walk: Pro',
        subtitle: 'Steigere dein Ziel: 10.000 Schritte für eine Woche.',
        duration: '7 Tage',
        difficulty: 'Mittel',
        jokers: 1,
        startDate: 'Übermorgen',
        participants: 342,
        imageUrl: walkingImg
      },
      {
        id: 's6',
        title: 'Daily Walk: Elite',
        subtitle: 'Die ultimative Distanz: 15.000 Schritte für eine Woche.',
        duration: '7 Tage',
        difficulty: 'Profi',
        jokers: 0,
        startDate: 'Übermorgen',
        participants: 128,
        imageUrl: walkingImg
      },
      {
        id: 's2',
        title: '14 Tage Power Push',
        subtitle: '1 Stunde Sport am Tag ohne Ausreden.',
        duration: '14 Tage',
        difficulty: 'Mittel',
        jokers: 2,
        startDate: 'In 3 Tagen',
        participants: 120
      },
      {
        id: 's3',
        title: '21 Tage Elite Grind',
        subtitle: 'Die ultimative Disziplin-Probe für Sportbegeisterte.',
        duration: '21 Tage',
        difficulty: 'Profi',
        jokers: 3,
        startDate: '23. März',
        participants: 85
      }
    ]
  },
  {
    id: '2',
    slug: 'ernaehrung',
    name: 'Ernährung',
    description: 'Du bist, was du isst. Tanke Energie.',
    imageUrl: foodBg,
    count: 8,
    newCount: 1,
    totalParticipants: '8.2k',
    challenges: [
      {
        id: 'e1',
        title: 'Sugar Free 7',
        subtitle: 'Vollständiger Verzicht auf industriellen Zucker.',
        duration: '7 Tage',
        difficulty: 'Anfänger',
        jokers: 1,
        startDate: 'In 5 Tagen',
        participants: 512
      },
      {
        id: 'e2',
        title: 'Clean Eating 14',
        subtitle: 'Nur unverarbeitete Lebensmittel auf deinem Teller.',
        duration: '14 Tage',
        difficulty: 'Mittel',
        jokers: 2,
        startDate: '30. März',
        participants: 320
      }
    ]
  },
  {
    id: '3',
    slug: 'digital-detox',
    name: 'Digital Detox',
    description: 'Fokus auf das Wesentliche. Offline ist der neue Luxus.',
    imageUrl: digitalDetoxBg,
    count: 6,
    newCount: 2,
    totalParticipants: '10.5k',
    challenges: [
      {
        id: 'v1',
        title: 'Digital Fasting',
        subtitle: 'Kein Social Media nach 20 Uhr für 14 Tage.',
        duration: '14 Tage',
        difficulty: 'Mittel',
        jokers: 2,
        startDate: 'Morgen',
        participants: 890
      }
    ]
  },
  {
    id: '4',
    slug: 'verzicht',
    name: 'Verzicht',
    description: 'Überwinde deine Laster für mehr Freiheit.',
    imageUrl: verzichtBg,
    count: 9,
    newCount: 3,
    totalParticipants: '13.6k',
    challenges: [
      {
        id: 'v2',
        title: 'Smoke Free Mission',
        subtitle: '21 Tage ohne Zigaretten – Starte dein neues Leben.',
        duration: '21 Tage',
        difficulty: 'Profi',
        jokers: 1,
        startDate: 'In 2 Tagen',
        participants: 145
      },
       {
        id: 'v3',
        title: 'Alcohol Clear',
        subtitle: '30 Tage Fokus ohne Alkohol.',
        duration: '30 Tage',
        difficulty: 'Profi',
        jokers: 2,
        startDate: '1. April',
        participants: 334
      }
    ]
  }
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Nikolas',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nikolas',
    bio: 'Challenge enthusiast & developer.',
    location: 'Berlin, DE',
    badges: ['Early Bird', 'Consistency King']
  },
  {
    id: 'u2',
    name: 'Sarah',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Let\'s crush those goals together!',
    location: 'Hamburg, DE',
    badges: ['Fitness Freak']
  },
  {
    id: 'u3',
    name: 'Marc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marc',
    bio: 'Consistency is key.',
    location: 'München, DE',
    badges: ['Discipline Pro']
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    userId: 'u2',
    userName: 'Sarah',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    text: 'Hey Leute! Wer ist heute auch schon um 6 Uhr gestartet? ☀️',
    timestamp: '06:15'
  },
  {
    id: 'm2',
    userId: 'u3',
    userName: 'Marc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marc',
    text: 'Hier! ✋ Die ersten 2km sind geschafft.',
    timestamp: '06:42'
  },
  {
    id: 'm3',
    userId: 'u2',
    userName: 'Sarah',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    text: 'Stark Marc! Dranbleiben! 🔥',
    timestamp: '06:45'
  }
];
