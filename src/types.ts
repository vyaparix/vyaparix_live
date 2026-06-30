export interface LeadDetails {
  fullName: string;
  businessName: string;
  mobileNumber: string;
  email: string;
  businessType: string;
  city: string;
  state: string;
  plan?: string;
  amount?: number;
  paymentId?: string;
  orderId?: string;
  submittedAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  businessName: string;
  rating: number;
  text: string;
  avatar?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface IndustryItem {
  name: string;
  description: string;
  benefits: string[];
  iconName: string;
}
