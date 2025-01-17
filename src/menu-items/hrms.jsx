// assets
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserAddOutlined,
  UserOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const hrms = {
  id: 'hrms',
  title: 'HRMS',
  type: 'group',
  children: [
    {
      id: 'addemployee',
      title: 'Add Employee',
      type: 'item',
      url: '/addemployee',
      icon: icons.UserAddOutlined, // Assigning the new icon for Add Employee
      breadcrumbs: true,
    },
    {
      id: 'employee',
      title: 'Employee',
      type: 'item',
      url: './employee',
      icon: icons.UserOutlined, // Assigning the new icon for Employee
      breadcrumbs: true,
    },
  ],
};

export default hrms;