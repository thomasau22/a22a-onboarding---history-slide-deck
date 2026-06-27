import { ClassRecord, QuizQuestion } from "./types";

// Class history up to today's date (June 26, 2026)
// We DO NOT go past today's date. The class on 20/06/2026 is the last one before today.
// All July, August, and September classes are excluded.
export const classRecords: ClassRecord[] = [
  { date: "28/02/2026", studentCount: 7, salesAmount: 2, highlighted: true }, // Launch class!
  { date: "14/03/2026", studentCount: 7, salesAmount: 2 },
  { date: "28/03/2026", studentCount: 8, salesAmount: 4 },
  { date: "11/04/2026", studentCount: 18, salesAmount: 15 },
  { date: "25/04/2026", studentCount: 15, salesAmount: 17 },
  { date: "09/05/2026", studentCount: 29, salesAmount: 22 },
  { date: "21/05/2026", studentCount: 12, salesAmount: 13 },
  { date: "23/05/2026", studentCount: 31, salesAmount: 27 },
  { date: "06/06/2026", studentCount: 14, salesAmount: 11 },
  { date: "13/06/2026", studentCount: 33, salesAmount: 33 },
  { date: "20/06/2026", studentCount: 40, salesAmount: 25, highlighted: true } // Peak class up to today!
];

export interface Founder {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export const founders: Founder[] = [
  {
    name: "Thomas Au",
    role: "Co-Founder",
    bio: "Pioneering AI strategies and transforming Malaysian enterprise capabilities.",
    initials: "TA"
  },
  {
    name: "Daryl Diong",
    role: "Co-Founder",
    bio: "Structuring education pathways and empowering teams with real-world AI applications.",
    initials: "DD"
  },
  {
    name: "Bobby Hiew",
    role: "Co-Founder",
    bio: "Driving growth marketing and accelerating modern content automation standards.",
    initials: "BH"
  }
];

export interface CoreValue {
  id: number;
  title: string;
  jpTitle?: string;
  description: string;
  impact: string;
}

export const coreValues: CoreValue[] = [
  {
    id: 1,
    title: "Student Success is Our Success",
    description: "Our success depends on our students' success. We strive to teach them the most value during the class, ensuring they can make the highest quality outcome.",
    impact: "Always go the extra mile to provide feedback and review student outcomes to ensure they build real, production-ready portfolios."
  },
  {
    id: 2,
    title: "Kaizen (改善)",
    jpTitle: "改善",
    description: "Kaizen is a Japanese term that carries the meaning of 'continuous improvement' or 'change for the better'. To adopt this working culture, we constantly challenge ourselves to do better each day, and never allow achievements to plateau by only sticking to what worked well in the past.",
    impact: "Refine class slides every week, study new AI models daily, and constantly update our training methodologies to stay ahead."
  },
  {
    id: 3,
    title: "High Freedom, High Accountability",
    description: "In A22A, we provide flexibility in our day-to-day working arrangements and expect full accountability in our daily tasks. We expect you to keep the trust!",
    impact: "Manage your own hours, focus on outcomes rather than desk time, and communicate transparently about deliverables."
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    question: "When did A22A officially start?",
    options: ["12 December 2025", "28 February 2026", "19 June 2026", "1 July 2026"],
    correctAnswerIndex: 0,
    explanation: "A22A started on 12 December 2025 with co-founders Thomas Au, Daryl Diong, and Bobby Hiew!"
  },
  {
    question: "What is A22A's goal for professional training by 2030?",
    options: ["Train 1,000 professionals", "Train 3,000 professionals", "Train 5,000 professionals", "Train 10,000 professionals"],
    correctAnswerIndex: 2,
    explanation: "Our core mission is training 5,000 professionals by 2030, leveling the playing field for Malaysian brands!"
  },
  {
    question: "What does the term 'Kaizen' stand for in our culture?",
    options: [
      "Maximum speed and efficiency",
      "Continuous improvement & change for the better",
      "High freedom and flexibility",
      "Student satisfaction guarantee"
    ],
    correctAnswerIndex: 1,
    explanation: "Kaizen is a Japanese term meaning 'continuous improvement'—constantly challenging ourselves to do better every day."
  }
];
