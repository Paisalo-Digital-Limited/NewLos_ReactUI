import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
// import { element } from 'prop-types';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
// render - Credit page

// render - HRMS page
const AddEmployee = Loadable(lazy(() => import('pages/Hrms/AddEmployee/addemployee')));
const Employee = Loadable(lazy(() => import('pages/Hrms/Employee/employee')));

// render - FI Processing
const Index = Loadable(lazy(() => import('pages/fiprocessing/credit/Index/index')));
const Readyforaudit = Loadable(lazy(() => import('pages/fiprocessing/Audit/readyforaudit')));

const Neftdone = Loadable(lazy(() => import('pages/fiprocessing/Account/neftdone')));

// render - FI Processing -- Credit
const PddDocument = Loadable(lazy(() => import('pages/fiprocessing/credit/PostDisburseFile/PddDocument')));
const Documentupload = Loadable(lazy(() => import('pages/fiprocessing/credit/fidocs/Pages')));
const DeleteRecord = Loadable(lazy(() => import('pages/fiprocessing/credit/DeleteDocs/DeleteRecords')));
const FiSanction = Loadable(lazy(() => import('pages/fiprocessing/credit/FiSanction/Master')));
// render - Dashboard- Master
const Role = Loadable(lazy(() => import('pages/dashboardmenu/Master/role/role')));
const Vechicles = Loadable(lazy(() => import('pages/dashboardmenu/Master/vechicles/vechicles')));
//const Menu = Loadable(lazy(() => import('pages/dashboardmenu/Master/menu/menu')));
const Groupmaster = Loadable(lazy(() => import('pages/dashboardmenu/Master/GroupMaster/groupmaster')));
const Mastercreator = Loadable(lazy(() => import('pages/dashboardmenu/Master/mastercreator/mastercreator')));
const BranchMaster = Loadable(lazy(() => import('pages/dashboardmenu/Master/BranchMaster/AddBranch')));
const Apiendpoints = Loadable(lazy(() => import('pages/dashboardmenu/Master/ApiEndPoints/apiendpoints')));
const MoveToAuditquery = Loadable(lazy(() => import('pages/fiprocessing/Audit/MoveToAuditRecord/MoveToAuditRecord')));
// render - FI Processing -- Branch 
const Postsanction = Loadable(lazy(() => import('pages/fiprocessing/Branch/postsanction/postsanction')));
const AddGuarantor = Loadable(lazy(() => import('pages/fiprocessing/Branch/addguarantor/index')));
const BranchHardwareReq = Loadable(lazy(() => import('pages/branchhardwarerequest/branchhardwarerequest')));

const Generate = Loadable(lazy(() => import('pages/fiprocessing/credit/GenerateDS/Master')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'index',
      element: <Index />
    },
    {
      path: 'readyforaudit',
      element: <Readyforaudit />
    },
    {
      path: 'postsanction',
      element: <Postsanction />
    },
    {
      path: 'neftdone',
      element: <Neftdone />
    },
    {
      path: 'getrole',
      element: <Role />
    },
    {
      path: 'vehicledetails',
      element: <Vechicles />
    },
    // {
    //   path: 'menu',
    //   element: <Menu />
    // },
    {
      path: 'groupmaster',
      element: <Groupmaster />
    },
    {
      path: 'mastercreator',
      element: <Mastercreator />
    },
    {
      path: 'branchmaster',
      element: <BranchMaster />
    },
    {
      path: 'apiendpoints',
      element: <Apiendpoints />
    },
    {
      path: 'fidocs',
      element: <Documentupload />
    },
    {
      path: 'fisanction',
      element: <FiSanction />
    },
    {
      path: 'deletedocs',
      element: <DeleteRecord />
    },
    {
      path: 'postdisbursefile',
      element: <PddDocument />
    },
    {
      path: 'addguarantor',
      element: <AddGuarantor />
    },
    // HRMS
    {
      path: 'addemployee',
      element: <AddEmployee />
    },
    {
      path: 'employee',
      element: <Employee />
    },
   {
    path: 'MoveToAuditRecord',
    element: <MoveToAuditquery />
   },
   {
    path:'generate',
    element:<Generate />
   },
   {
     path: 'branchhardwarerequest',
     element: <BranchHardwareReq />
   }
  ]
};

export default MainRoutes;
