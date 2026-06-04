
import {
  FiClipboard, FiClock, FiCheckCircle, FiXCircle,
} from "react-icons/fi";
import CardIcon from "./CardIcon";

export const getSeekerStats = () => [
  {
    icon: <CardIcon icon={FiClipboard} color="blue" />,
    label: "Jobs Applied",
    value: "24",
    sub: "↑ 4 this week",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiClock} color="yellow" />,
    label: "Pending Review",
    value: "8",
    sub: "Awaiting response",
    subType: "neutral",
  },
  {
    icon: <CardIcon icon={FiCheckCircle} color="green" />,
    label: "Interviews",
    value: "3",
    sub: "↑ 1 this week",
    subType: "up",
  },
  {
    icon: <CardIcon icon={FiXCircle} color="red" />,
    label: "Rejected",
    value: "5",
    sub: "↓ 2 this month",
    subType: "down",
  },
];