// assets
import { BarcodeOutlined, BgColorsOutlined, FontSizeOutlined, SwapOutlined } from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  SwapOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Audit',
  type: 'group',
  children: [
    // {
    //   id: 'util-typography',
    //   title: 'Neft Done',
    //   type: 'item',
    //   url: '/typography',
    //   icon: icons.FontSizeOutlined
    // },
    {
      id: 'util-typography',
      title: 'Neft Done',
      type: 'item',
      url: '/neftdone',
      icon: icons.FontSizeOutlined
    },
    // {
    //   id: 'util-color',
    //   title: 'Post Sanction',
    //   type: 'item',
    //   url: '/color',
    //   icon: icons.BgColorsOutlined
    // },
    {
      id: 'util-color',
      title: 'Post Sanction',
      type: 'item',
      url: '/postsanction',
      icon: icons.BgColorsOutlined
    },
    // {
    //   id: 'util-shadow',
    //   title: 'Index',
    //   type: 'item',
    //   url: '/shadow',
    //   icon: icons.BarcodeOutlined
    // },
    {
      id: 'util-shadow',
      title: 'Index',
      type: 'item',
      url: '/index',
      icon: icons.BarcodeOutlined
    },
    {
      id: 'util-readyforneft',
      title: 'Ready For Neft',
      type: 'item',
      url: '/readyforneft',
      icon: icons.SwapOutlined
    }
  ]
};

export default utilities;
