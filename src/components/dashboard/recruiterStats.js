// recruiterStats.js — Recruiter stats config

import {
  FiFileText, FiUsers, FiZap, FiSlash,
} from "react-icons/fi";
import CardIcon from "./CardIcon";

export const getRecruiterStats = (data = {}) => [
  {
    icon: <CardIcon icon={FiFileText} color="blue" />,
    label: "Total Job Posts",
    value: (data.totalJobs ?? 0).toLocaleString(),
    sub: "Posted by your company",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiUsers} color="violet" />,
    label: "Total Applicants",
    value: (data.totalApplicants ?? 0).toLocaleString(),
    sub: "Applications submitted",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiZap} color="green" />,
    label: "Active Jobs",
    value: (data.activeJobs ?? 0).toLocaleString(),
    sub: "Currently live",
    subType: "neutral",
  },
  {
    icon: <CardIcon icon={FiSlash} color="orange" />,
    label: "Jobs Closed",
    value: (data.closedJobs ?? 0).toLocaleString(),
    sub: "Closed job posts",
    subType: "down",
  },
];