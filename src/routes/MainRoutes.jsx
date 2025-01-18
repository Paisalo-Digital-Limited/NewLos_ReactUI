import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

// const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Postsanction = Loadable(lazy(() => import('pages/component-overview/postsanction')));
// const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Neftdone = Loadable(lazy(() => import('pages/component-overview/neftdone')));
// const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const Index = Loadable(lazy(() => import('pages/component-overview/index')));
const Readyforneft = Loadable(lazy(() => import('pages/component-overview/readyforneft')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Role = Loadable(lazy(() => import('pages/role/role')));
const Vechicles = Loadable(lazy(() => import('pages/vechicles/vechicles')));
const Menu = Loadable(lazy(() => import('pages/menu/menu')));
const Groupmaster = Loadable(lazy(() => import('pages/groupmaster/groupmaster')));
const Mastercreator = Loadable(lazy(() => import('pages/mastercreator/mastercreator')));
const Apiendpoints = Loadable(lazy(() => import('pages/apiendpoints/apiendpoints')));
// render - Credit page
const Fidocument = Loadable(lazy(() => import('pages/credit/fidocument')));
const Upadtefidoc = Loadable(lazy(() => import('pages/credit/upadtefidoc')));
// render - HRMS page
const AddEmployee = Loadable(lazy(() => import('pages/Hrms/addemployee')));
const Employee = Loadable(lazy(() => import('pages/Hrms/employee')));
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const Documentupload = Loadable(lazy(() => import('pages/Documentupload/Pages')));
const Sanction = Loadable(lazy(() => import('pages/sanction/Master')));
const DeleteRecord = Loadable(lazy(() => import('pages/Delete/DeleteRecords')));
const PddDocument = Loadable(lazy(() => import('pages/Pdddocument/PddDocument')));


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
      element: <Readyforneft />
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
    {
      path: 'menu',
      element: <Menu />
    },
    {
      path: 'groupmaster',
      element: <Groupmaster />
    },
    {
      path: 'mastercreator',
      element: <Mastercreator />
    },
    {
      path: 'apiendpoints',
      element: <Apiendpoints />
    },
    {
      path: 'fidocument',
      element: <Fidocument />
    },
    {
      path: 'upadtefidoc',
      element: <Upadtefidoc />
    },
    {
      path: 'addemployee',
      element: <AddEmployee />
    },
    {
      path: 'employee',
      element: <Employee />
    },
    {
      path: 'uploaddocument',
      element: <Documentupload/>
    },
    {
      path: 'sanction',
      element: <Sanction/>
    },
    {
      path: 'delete',
      element: <DeleteRecord/>
    },
    {
      path: 'pdddocument',
      element: <PddDocument/>
    },
    {
      path: 'Postsanction',
      element: <Postsanction />
    },
  ]
};

export default MainRoutes;
