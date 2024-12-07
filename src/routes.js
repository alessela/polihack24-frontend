import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="26px" height="26px" color="inherit" mt="5px" />,
    component: <MainDashboard />,
  },
  {
    name: 'Activity History',
    layout: '/admin',
    path: '/activity-history',
    icon: <Icon as={MdBarChart} width="26px" height="26px" color="inherit" mt="5px" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
];

export default routes;
