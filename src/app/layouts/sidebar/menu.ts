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
        label: 'Users',
        icon: 'bx bx-user',
        link: '/users',
    },
    {
        id: 2,
        label: 'Checkers',
        icon: 'bx bx-user-check',
        link: '/checkers',
    },
    // {
    //     id: 2,
    //     label: 'Merchants',
    //     icon: 'dripicons-user',
    //     link: '/merchants',
    // },
    {
        id: 2,
        label: 'User Groups',
        icon: 'dripicons-user-group',
        link: '/user-groups',
    },
    {
        id: 2,
        label: 'Database Management',
        icon: 'bx bx-data',
        link: '/databases',
    },
    {
        id: 2,
        label: 'DB Users',
        icon: 'mdi mdi-database-lock-outline',
        link: '/db-users',
    },
    {
        id: 2,
        label: 'API Generation',
        icon: 'bx bx-code-alt',
        link: '/api',
    },
    {
        id: 9,
        label: 'System Settings',
        icon: 'bx bx-cog',
        link: '/settings',

        // subItems: [
        //     {
        //         id: 13,
        //         label: 'Settings',
        //         link: '/point-settings',
        //         parentId: 9
        //     },
        //     {
        //         id: 13,
        //         label: 'Transactions',
        //         link: '/point-transactions',
        //         parentId: 9
        //     },
        // ]
    },
 
];

