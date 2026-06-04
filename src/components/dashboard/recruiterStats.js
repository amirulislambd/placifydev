// recruiterStats.js — Recruiter stats config

import {
  FiFileText, FiUsers, FiZap, FiSlash,
} from "react-icons/fi";
import CardIcon from "./CardIcon";

export const getRecruiterStats = () => [
  {
    icon: <CardIcon icon={FiFileText} color="blue" />,
    label: "Total Job Posts",
    value: "48",
    sub: "↑ 6 this month",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiUsers} color="violet" />,
    label: "Total Applicants",
    value: "1,284",
    sub: "↑ 132 this week",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiZap} color="green" />,
    label: "Active Jobs",
    value: "18",
    sub: "Currently live",
    subType: "neutral",
  },
  {
    icon: <CardIcon icon={FiSlash} color="orange" />,
    label: "Jobs Closed",
    value: "32",
    sub: "↓ 3 this month",
    subType: "down",
  },
];