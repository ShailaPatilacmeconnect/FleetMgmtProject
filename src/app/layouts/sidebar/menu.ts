import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "Menu",
    isTitle: true,
  },
  {
    id: 2,
    label: "Dashboard",
    icon: "bx bx-home-circle",
    link: "/",
  },
  {
    id: 2,
    label: "Riders",
    icon: "bx bx-user",
    link: "/riders",
  },
  {
    id: 3,
    label: "Transaction Category",
    icon: "bx bx-user",
    link: "/transactionCategory",
  },
];

