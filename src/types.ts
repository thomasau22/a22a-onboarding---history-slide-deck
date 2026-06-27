export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  date?: string;
}

export interface ClassRecord {
  date: string;
  studentCount: number;
  salesAmount: number; // relative sales amount / scale as seen in screenshot
  highlighted?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
