import type { Category } from '../types';
import gymImg from '../assets/challenges/gym.png';
import foodImg from '../assets/challenges/food.png';
import detoxImg from '../assets/challenges/detox.png';

export const categories: Category[] = [
  {
    id: '1',
    slug: 'sport',
    name: 'Sport & Fitness',
    description: 'Bewege deinen Körper, stärke deinen Geist.',
    imageUrl: gymImg,
    count: 12,
    newCount: 3,
    totalParticipants: '12.4k',
    challenges: [
      {
        id: 's1',
        title: '7 Tage Strength Streak',
        subtitle: 'Täglich 1 Stunde intensive körperliche Aktivität.',
        duration: '7 Tage',
        difficulty: 'Anfänger',
        jokers: 1,
        startDate: 'Jeden Montag',
        participants: 245
      },
      {
        id: 's2',
        title: '14 Tage Power Push',
        subtitle: '1 Stunde Sport am Tag ohne Ausreden.',
        duration: '14 Tage',
        difficulty: 'Mittel',
        jokers: 2,
        startDate: 'Demnächst',
        participants: 120
      },
      {
        id: 's3',
        title: '21 Tage Elite Grind',
        subtitle: 'Die ultimative Disziplin-Probe für Sportbegeisterte.',
        duration: '21 Tage',
        difficulty: 'Profi',
        jokers: 3,
        startDate: 'In 2 Wochen',
        participants: 85
      }
    ]
  },
  {
    id: '2',
    slug: 'ernaehrung',
    name: 'Ernährung',
    description: 'Du bist, was du isst. Tanke Energie.',
    imageUrl: foodImg,
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
        startDate: 'Nächste Woche',
        participants: 512
      },
      {
        id: 'e2',
        title: 'Clean Eating 14',
        subtitle: 'Nur unverarbeitete Lebensmittel auf deinem Teller.',
        duration: '14 Tage',
        difficulty: 'Mittel',
        jokers: 2,
        startDate: '01. April',
        participants: 320
      }
    ]
  },
  {
    id: '3',
    slug: 'verzicht',
    name: 'Detox & Verzicht',
    description: 'Digitale Freiheit und physische Unabhängigkeit.',
    imageUrl: detoxImg,
    count: 15,
    newCount: 5,
    totalParticipants: '24.1k',
    challenges: [
      {
        id: 'v1',
        title: 'Digital Fasting',
        subtitle: 'Kein Social Media nach 20 Uhr für 14 Tage.',
        duration: '14 Tage',
        difficulty: 'Mittel',
        jokers: 2,
        startDate: 'Jederzeit',
        participants: 890
      },
      {
        id: 'v2',
        title: 'Smoke Free Mission',
        subtitle: '21 Tage ohne Zigaretten – Starte dein neues Leben.',
        duration: '21 Tage',
        difficulty: 'Profi',
        jokers: 1,
        startDate: 'Morgen',
        participants: 145
      },
       {
        id: 'v3',
        title: 'Alcohol Clear',
        subtitle: '30 Tage Fokus ohne Alkohol.',
        duration: '30 Tage',
        difficulty: 'Profi',
        jokers: 2,
        startDate: 'Am 1. des Monats',
        participants: 334
      }
    ]
  }
];
