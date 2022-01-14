import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.DASHBOARDS.TEXT",
    link: "/dashboard",
    // icon: 'bx-home-circle',
    // subItems: [
    //     {
    //         id: 2,
    //         label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
    //         link: '/dashboard',
    //         parentId: 1
    //     }
    // ]
  },
  {
    id: 6,
    label: "Rider",
    // icon: 'bx-tone',
    isUiElement: true,
    link: "/riders",
  },
  {
    id: 24,
    label: "Settings",
    // icon: 'bx-customize',
    subItems: [
      {
        id: 25,
        label: "Transaction Category",
        link: "/",
        parentId: 24,
      },
      {
        id: 26,
        label: "Loans",
        link: "/loans",
        parentId: 24,
      },
      {
        id: 27,
        label: "Recurring Payments",
        link: "/recurringPayments",
        parentId: 24,
      },
      {
        id: 28,
        label: "Makers",
        link: "/makers",
        parentId: 24,
      },
      {
        id: 29,
        label: "Bikes ",
        link: "/bikes",
        parentId: 24,
      },
      {
        id: 30,
        label: "Cars",
        link: "/cars",
        parentId: 24,
      },
      {
        id: 30,
        label: "Mobile SIM ",
        link: "/mobileSim",
        parentId: 24,
      },
    ],
  },
  {
    id: 69,
    // icon: 'bx-collection',
    label: "Transaction",
    link: "/transactions",
    // subItems: [

    // ]
  },
];
