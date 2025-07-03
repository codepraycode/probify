import { User, UserProgress } from "@/types/user.types";

export const dummyUsers: User[] = [
  {
    id: "u_grace13",
    name: "Grace Akintoye",
    email: "grace.akintoye@example.com",
    passwordHash: "$2b$10$examplehash1", // bcrypt hash placeholder
    avatarUrl: "https://i.pravatar.cc/150?img=10",
    username: "gracie13",
    bio: "Lover of logic and stats. Let’s calculate the odds!",
    school: "Queens College Lagos",
    gradeLevel: "SS2",
    country: "Nigeria",
    streak: 3,
    createdAt: new Date("2010-02-03"),
    updatedAt: new Date("2010-02-10"),
  },
  {
    id: "u_dave12",
    name: "David Ajayi",
    email: "david.ajayi@example.com",
    passwordHash: "$2b$10$examplehash2",
    avatarUrl: "https://i.pravatar.cc/512?",
    username: "dave_math",
    bio: "Learning probability one roll at a time 🎲",
    school: "King’s College Lagos",
    gradeLevel: "SS1",
    country: "Nigeria",
    streak: 7,
    createdAt: new Date("2010-01-03"),
    updatedAt: new Date("2010-02-10"),
  },
  {
    id: "u_susanx",
    name: "Susan Bello",
    email: "susan.bello@example.com",
    passwordHash: "$2b$10$examplehash3",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
    username: "susanx",
    bio: "14 y/o. I love solving things that look impossible!",
    school: "Federal Girls’ College, Akure",
    gradeLevel: "JSS3",
    country: "Nigeria",
    streak: 5,
    createdAt: new Date("2010-01-03"),
    updatedAt: new Date("2010-02-10"),
  },
];


export const dummyProgress: UserProgress[] = [
  {
    id: "tp1",
    topicSlug: "basic-probability",
    completed: true,
    score: 85,
    userId: "u_grace13",
    completedAt: new Date("2025-06-30T10:00:00Z"),
  },
  {
    id: "tp2",
    topicSlug: "probability-rules",
    completed: true,
    score: 72,
    userId: "u_dave12",
    completedAt: new Date("2025-06-29T08:45:00Z"),
  },
  {
    id: "tp3",
    topicSlug: "simple-events",
    completed: false,
    score: 50,
    userId: "u_susanx",
    completedAt: null,
  },
];

