import {
  FiClipboard, FiClock, FiCheckCircle, FiXCircle,
} from "react-icons/fi";
import CardIcon from "./CardIcon";

export const getSeekerStats = (data = {}) => [
  {
    icon: <CardIcon icon={FiClipboard} color="blue" />,
    label: "Jobs Applied",
    value: (data.jobsApplied ?? 0).toLocaleString(),
    sub: "Applications submitted",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiClock} color="yellow" />,
    label: "Pending Review",
    value: (data.pendingReview ?? 0).toLocaleString(),
    sub: "Awaiting response",
    subType: "neutral",
  },
  {
    icon: <CardIcon icon={FiCheckCircle} color="green" />,
    label: "Interviews",
    value: (data.interviews ?? 0).toLocaleString(),
    sub: "Interviews scheduled",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiXCircle} color="red" />,
    label: "Rejected",
    value: (data.rejected ?? 0).toLocaleString(),
    sub: "Unsuccessful applications",
    subType: "down",
  },
];