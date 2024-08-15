import './App.css'

import { 
  createBrowserRouter,
  RouterProvider } from 'react-router-dom'
import DashboardLayout from '@/layouts/DashboardLayout'
import Analytics from '@/layouts/Analytics';
import Ads from '@/layouts/Ads';
import Meta from '@/layouts/Meta';
import CRM from '@/layouts/CRM';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Analytics />,
      },
      {
        path: "/ads",
        element: <Ads />,
      },
      {
        path: "/meta",
        element: <Meta />,
      },{
        path: "/crm",
        element: <CRM />,
      },
    ],
  },
]);



function App() {
  return (
        <RouterProvider router={router} />
  )
}

export default App
