import { Service, Review, FaqItem, PricingItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'general',
    title: 'General Dentistry',
    description: 'Routine check-ups, cleanings, and preventive care to keep your smile healthy year-round.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Whitening, veneers, and smile makeovers to give you the confidence you deserve.',
    iconName: 'Sparkles'
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description: 'Invisalign and traditional braces for children and adults to align your perfect smile.',
    iconName: 'Smile'
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent, natural-looking solutions for missing teeth using the latest titanium tech.',
    iconName: 'Anchor'
  },
  {
    id: 'surgery',
    title: 'Oral Surgery',
    description: 'Expert wisdom tooth removal and corrective jaw surgeries with minimal discomfort.',
    iconName: 'Stethoscope'
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: 'Same-day appointments for toothaches, chips, and urgent dental needs.',
    iconName: 'Zap'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    rating: 5,
    text: "I used to be terrified of the dentist, but Dr. Emily and her team made me feel so comfortable. The painless injection technology is a game changer!",
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '2',
    name: 'Michael Ross',
    rating: 5,
    text: "Incredible results with my Invisalign treatment. The clinic is modern, clean, and the staff is super friendly. Highly recommended!",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    rating: 5,
    text: "Had an emergency root canal on a Sunday. They got me in immediately and fixed the pain. Forever grateful to Lumina Dental.",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major PPO insurance plans including Delta Dental, Cigna, MetLife, and Aetna. We also offer financing options via CareCredit."
  },
  {
    question: "How often should I get a dental cleaning?",
    answer: "For most patients, we recommend a professional cleaning and exam every six months. Patients with gum disease may need to visit more frequently."
  },
  {
    question: "Is teeth whitening safe?",
    answer: "Yes, professional teeth whitening is very safe when supervised by a dentist. We use medical-grade products that protect your enamel while lifting stains."
  },
  {
    question: "What should I do in a dental emergency?",
    answer: "Call us immediately at (555) 123-4567. We set aside time daily for emergency appointments. If it is outside hours, our answering service will direct you."
  }
];

export const PRICING: PricingItem[] = [
  {
    treatment: "New Patient Special",
    price: "$99",
    features: ["Comprehensive Exam", "Full Mouth X-Rays", "Basic Cleaning", "Consultation"]
  },
  {
    treatment: "Teeth Whitening",
    price: "$299",
    features: ["In-Office Zoom! Treatment", "Take-Home Touch-up Kit", "Desensitizing Gel", "1 Hour Session"]
  },
  {
    treatment: "Invisalign",
    price: "$3,500+",
    features: ["3D Scans", "All Aligners Included", "Retainers", "Monthly Check-ups"]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Experienced Team",
    description: "Our doctors have over 20 years of combined clinical experience in complex restorative cases.",
    iconName: "Award"
  },
  {
    title: "Modern Technology",
    description: "We use digital X-rays, 3D imaging, and intraoral cameras for precise diagnoses.",
    iconName: "Cpu"
  },
  {
    title: "Painless Dentistry",
    description: "Relax during your visit with our advanced sedation options and gentle techniques.",
    iconName: "Heart"
  },
  {
    title: "Emergency Care",
    description: "We understand that tooth pain can't wait. Same-day appointments are available.",
    iconName: "Zap"
  }
];