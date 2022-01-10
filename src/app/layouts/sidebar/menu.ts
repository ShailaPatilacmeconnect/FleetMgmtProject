import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Menu',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'bx bx-home-circle',
        link: '/',

    },
    {
        id: 2,
        label: 'Makers',
        icon: 'bx bx-user',
        link: '/makers',
    },
    {
        id: 2,
        label: 'MobileSIM',
        icon: 'bx bx-user-check',
        link: '/mobileSIM',
    },
    {
        id: 2,
        label: 'RiderBikeHistory',
        icon: 'dripicons-user',
        link: '/riderBikeHistory',
    },
    {
        id: 2,
        label: 'RiderCarHistory',
        icon: 'dripicons-user-group',
        link: '/riderCarHistory',
    },
    {
        id: 2,
        label: 'RiderSimHistory ',
        icon: 'bx bx-data',
        link: '/riderSimHistory',
    },
    {
        id: 2,
        label: 'Loans',
        icon: 'mdi mdi-database-lock-outline',
        link: '/loans',
    },
    {
        id: 2,
        label: 'Recurring Payments',
        icon: 'bx bx-code-alt',
        link: '/recurringPayments',
    },
    // {
    //     id: 9,
    //     label: 'System Settings',
    //     icon: 'bx bx-cog',
    //     link: '/settings',

    //     subItems: [
    //         {
    //             id: 13,
    //             label: 'Settings',
    //             link: '/point-settings',
    //             parentId: 9
    //         },
    //         {
    //             id: 13,
    //             label: 'Transactions',
    //             link: '/point-transactions',
    //             parentId: 9
    //         },
    //     ]
    // },
 
];

