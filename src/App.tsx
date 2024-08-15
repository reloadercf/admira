import './App.css'
import { 
  createBrowserRouter,
  RouterProvider } from 'react-router-dom'

import * as getData from '@/lib/mockData'

import DashboardLayout from '@/layouts/DashboardLayout'
import Analytics from '@/pages/Analytics';
import Ads from '@/pages/Ads';
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
        loader:async()=>{
          const data = await getData.dataGoogleAnalytics()
          return data;
        }
      },
      {
        path: "/ads",
        element: <Ads />,
        loader:async()=>{
          const data = await getData.dataGoogleAds()
          return data;
        }
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
