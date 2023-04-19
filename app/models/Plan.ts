// Icons
import { IconType } from "react-icons";
import { FaHandshake, FaTrophy } from "react-icons/fa";

export interface Plan {
  id: string;
  title: string;
  price: string;
  perks: string[];
  icon: IconType;
}

export const pricing_data_mock: Plan[] = [
  {
    id: "p1",
    title: "Basic",
    price: "Free forever",
    perks: ["1 User", "Up to 100 expenses/year", "Basic analytics"],
    icon: FaHandshake,
  },
  {
    id: "p2",
    title: "Pro",
    price: "$9.99/month",
    perks: ["Unlimited Users", "Unlimited expenses/year", "Detailed analytics"],
    icon: FaTrophy,
  },
];
