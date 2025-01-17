// assets
import { MenuUnfoldOutlined, UserOutlined, ApiOutlined, TeamOutlined, BuildOutlined, CarOutlined } from '@ant-design/icons';

// icons
const icons = {
    MenuUnfoldOutlined,
    UserOutlined,
    ApiOutlined,
    TeamOutlined,
    BuildOutlined,
    CarOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const role = {
  id: 'group-dashboard',
  title: 'Master',
  type: 'group',
  children: [
    {
      id: 'menu',
      title: 'Menu',
      type: 'item',
      url: '/menu',
      icon: icons.MenuUnfoldOutlined,
      breadcrumbs: true,
    },
    {
      id: 'role',
      title: 'Role',
      type: 'item',
      url: '/role',
      icon: icons.UserOutlined, // changed icon
      breadcrumbs: true,
    },
    {
      id: 'apiendpoints',
      title: 'Api Endpoints',
      type: 'item',
      url: '/apiendpoints',
      icon: icons.ApiOutlined, // changed icon
      breadcrumbs: true,
    },
    {
      id: 'groupmaster',
      title: 'Group Master',
      type: 'item',
      url: '/groupmaster',
      icon: icons.TeamOutlined, // changed icon
      breadcrumbs: true,
    },
    {
      id: 'mastercreator',
      title: 'Master Creator',
      type: 'item',
      url: '/mastercreator',
      icon: icons.BuildOutlined, // changed icon
      breadcrumbs: true,
    },
    {
      id: 'vechicles',
      title: 'Vechicles',
      type: 'item',
      url: '/vechicles',
      icon: icons.CarOutlined, // changed icon
      breadcrumbs: true,
    },
  ],
};

export default role;