// adminStats.js — Admin stats config

import {
  FiUsers, FiBriefcase, FiFileText,
  FiShield, FiAlertCircle, FiDollarSign,
} from "react-icons/fi";
import CardIcon from "./CardIcon";

export const getAdminStats = () => [
  {
    icon: <CardIcon icon={FiUsers} color="violet" />,
    label: "Total Users",
    value: "5,482",
    sub: "↑ 214 this week",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiBriefcase} color="blue" />,
    label: "Total Companies",
    value: "340",
    sub: "↑ 18 this month",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiFileText} color="green" />,
    label: "Total Job Posts",
    value: "1,920",
    sub: "↑ 96 this week",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiShield} color="yellow" />,
    label: "Pending Approvals",
    value: "27",
    sub: "↑ 5 today",
    subType: "down",
  },
  {
    icon: <CardIcon icon={FiAlertCircle} color="red" />,
    label: "Reported Jobs",
    value: "12",
    sub: "Need review",
    subType: "down",
  },
  {
    icon: <CardIcon icon={FiDollarSign} color="orange" />,
    label: "Revenue",
    value: "$48k",
    sub: "↑ 12% this month",
    subType: "up",
  },
];