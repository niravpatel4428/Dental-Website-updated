export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingItem {
  treatment: string;
  price: string;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}