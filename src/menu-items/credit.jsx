// assets
import { RiseOutlined, PieChartOutlined } from '@ant-design/icons';

// icons
const icons = {
    PieChartOutlined,
    RiseOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const credit = {
  id: 'Credit',
  title: 'Credit',
  type: 'group',
  children: [
    {
      id: 'fidocument',
      title: 'Fi Documents',
      type: 'item',
      url: '/fidocument',
      icon: icons.RiseOutlined
    },
    {
      id: 'upadtefidoc',
      title: 'Update Fi Details',
      type: 'item',
      url: '/upadtefidoc',
      icon: icons.PieChartOutlined,
    }
  ]
};

export default credit;

