import {
  Brain,
  MessageSquare,
  CalendarDays,
  Code,
  Database,
} from "lucide-react";

export interface Project {
  title: string;
  tech: string;
  status: string | null;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  github?: string;
  demo?: string;
}

export const projects = [
  {
    title: "Malayalam Speech-to-Text",
    tech: "Python, NLP, Deep Learning",
    status: "Ongoing",
    description:
      "Developing an Automatic Speech Recognition (ASR) system for Malayalam language using 100+ hour annotated dataset. Focus on handling linguistic complexities and regional variations.",
    icon: Brain,
    color: "from-purple-600 to-pink-600",
    github: "https://github.com/jvaisag",
  },
  {
    title: "Real-time Messenger",
    tech: "MERN Stack, Socket.IO, JWT",
    status: null,
    description:
      "Full-featured real-time chat application with end-to-end encryption, file sharing, group chats, and online status indicators using WebSocket connections.",
    icon: MessageSquare,
    color: "from-blue-600 to-cyan-600",
    github: "https://github.com/jvaisag",
    demo: "https://messenger-demo.vercel.app",
  },
  {
    title: "Leave Management System",
    tech: "MERN Stack, Express.js",
    status: null,
    description:
      "Streamlined leave request and approval workflow system with admin dashboard, employee self-service portal, and automated notifications.",
    icon: CalendarDays,
    color: "from-orange-600 to-red-600",
    github: "https://github.com/jvaisag",
  },
  {
    title: "Tours description API",
    tech: "Node.js, Express, MongoDB",
    status: null,
    description:
      "RESTful API that provides details about various tour plans with search,filter options.",
    icon: Code,
    color: "from-indigo-600 to-violet-600",
    github: "https://github.com/jvaisag",
  },
  {
    title: "Mini Linux Shell",
    tech: "C",
    status: null,
    description:
      "Built a simple Linux shell in C supporting command execution, I/O redirection, and basic process handling using system calls..",
    icon: Database,
    color: "from-yellow-600 to-amber-600",
    github: "https://github.com/jvaisag/linux-shell",
  },
];
