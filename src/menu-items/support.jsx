// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.ChromeOutlined,
      breadcrumbs: true
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: './sample-page',
      icon: icons.QuestionOutlined,
      breadcrumbs: true
    }
  ]
};

export default support;
