import {
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiShield,
  FiAlertCircle,
  FiDollarSign,
} from "react-icons/fi";
import CardIcon from "./CardIcon";

export const getAdminStats = (data = {}) => [
  {
    icon: <CardIcon icon={FiUsers} color="violet" />,
    label: "Total Users",
    value: (data.totalUsers ?? 0).toLocaleString(),
    sub: "All registered users",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiBriefcase} color="blue" />,
    label: "Total Companies",
    value: (data.totalCompanies ?? 0).toLocaleString(),
    sub: "Registered companies",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiFileText} color="green" />,
    label: "Total Job Posts",
    value: (data.totalJobs ?? 0).toLocaleString(),
    sub: "Active and closed job posts",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiShield} color="yellow" />,
    label: "Pending Approvals",
    value: (data.pendingApprovals ?? 0).toLocaleString(),
    sub: "Companies awaiting review",
    subType: "down",
  },
  {
    icon: <CardIcon icon={FiAlertCircle} color="red" />,
    label: "Reported Jobs",
    value: (data.reportedJobs ?? 0).toLocaleString(),
    sub: "Need review",
    subType: "down",
  },
  {
    icon: <CardIcon icon={FiDollarSign} color="orange" />,
    label: "Revenue",
    value: data.revenue || "$48k",
    sub: "Platform earnings",
    subType: "up",
  },
];
