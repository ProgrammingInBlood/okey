export const faqs = [
  {
    question: "Mentor",
    answer:
      "I am a business mentor with multiple case studies to show my abilities in mentoring.",
  },
  {
    question: "Board advisor",
    answer:
      "I have demonstrable experience advising startups of best practices and driving growth.",
  },
  {
    question: "Business coach",
    answer:
      "I have coached at least 3 businesses in the last 10 years and can demonstrate growth.",
  },
  {
    question: "Life coach",
    answer:
      "I coach individuals on general welfare and life events that may arise building a startup.",
  },
];

const childExapmle = [
  { name: "IT", id: 1, selected: false },
  { name: "Development", id: 2, selected: false },
  { name: "Dev ops", id: 3, selected: false },
  { name: "Networking", id: 4, selected: false },
];

export const ExpertIndustries = [
  {
    name: "Development & IT",
    id: 2,
    child: childExapmle,
    selected: false,
  },
  { name: "Design & Creative", id: 3, selected: false },
  { name: "Sales & Marketing", id: 4, selected: false },
  { name: "Writing & Translation", id: 5, selected: false },
  { name: "Admin & Customer Support", id: 6, selected: false },
  { name: "Finance & Accounting", id: 7, selected: false },
  { name: "HR & Training", id: 8, selected: false },
  {
    name: "Legal",
    id: 9,
    selected: false,
    child: [{ name: "Development", id: 10, selected: false }],
  },
  { name: "E-Commerce", id: 10, selected: false },
  { name: "Other (please specify)", id: 11, selected: false },
];
