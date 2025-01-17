// // material-ui
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project import
// import NavGroup from './NavGroup';
// import menuItem from 'menu-items';

// // ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

// export default function Navigation() {
//   const navGroups = menuItem.items.map((item) => {
//     switch (item.type) {
//       case 'group':
//         return <NavGroup key={item.id} item={item} />;
//       default:
//         return (
//           <Typography key={item.id} variant="h6" color="error" align="center">
        
//           </Typography>
//         );
//     }
//   });

//   return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
// }





import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "./theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import apiClient from "./network/apiClient";
import "./Sidebar.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const buildMenuHierarchy = (data) => {
    const menuMap = {};
    const menuHierarchy = [];

    data.forEach((menu) => {
        menu.subMenu = [];
        menuMap[menu.mainid] = menu;
    });

    data.forEach((menu) => {
        if (menu.parentId === 0) {
            menuHierarchy.push(menu);
        } else if (menuMap[menu.parentId]) {
            menuMap[menu.parentId].subMenu.push(menu);
        }
    });

    return menuHierarchy;
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [menuData, setMenuData] = useState([]);

    const fetchSideBarList = async () => {
        const response = await apiClient.get("/Menu/GetMenuData", { requireAuth: true, checkTokenInResponse: false });

        if (response.data.statuscode === 200) {
            showSideMenuBar(response.data.data);
        } else {
            // Handle error
        }
    };

    const showSideMenuBar = (data) => {
        const formattedData = data.map((menu) => ({
            mainid: menu.mainid,
            parentId: menu.parentId,
            title: menu.title,
            pageUrl: menu.pageUrl,
            pageName: menu.pageName,
            icon: menu.icon,
            isActive: menu.isActive,
            isDeleted: menu.isDeleted,
            totalCount: menu.totalCount,
        }));

        const hierarchy = buildMenuHierarchy(formattedData);
        setMenuData(hierarchy);
    };

    const renderMenuItems = (menus) =>
        menus.map((menu) =>
            menu.subMenu && menu.subMenu.length > 0 ? (
                <SubMenu key={menu.mainid} title={menu.title} icon={<PeopleOutlinedIcon />}>
                    {renderMenuItems(menu.subMenu)}
                </SubMenu>
            ) : (
                <MenuItem key={menu.mainid} icon={<HomeOutlinedIcon />} onClick={() => console.log(`Navigating to ${menu.pageUrl}`)}>
                    {menu.title}
                    <Link to={menu.pageUrl || "#"} />
                </MenuItem>
            )
        );

    useEffect(() => {
        fetchSideBarList();
    }, []);

    return (
        <Box
            sx={{
              marginTop:'-1rem',
                display: "flex",
                flexDirection: "column",
               overflow:'hidden',
               
                "& .pro-sidebar-inner": {
                    background: "white !important",
                    overflowY: "auto", // Ensure scroll is available
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    fontWeight: 'bold',
                    color: 'grey',
                },
                "& .pro-inner-item:hover": {
                    color: "#db4f4a !important",
                },
                "& .pro-menu-item.active": {
                    color: "#db4f4a !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem onClick={() => setIsCollapsed(!isCollapsed)}>
                        {/* {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <MenuOutlinedIcon />
                            </Box>
                        )} */}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : ""}>
                        <Menu iconShape="square">
                            {menuData.length > 0 ? renderMenuItems(menuData) : <div>No Menu Items</div>}
                        </Menu>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;