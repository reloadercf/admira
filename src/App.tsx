import './App.css'
import { 
  createBrowserRouter,
  RouterProvider } from 'react-router-dom'

import * as getData from '@/lib/mockData'

import DashboardLayout from '@/layouts/DashboardLayout'
import Analytics from '@/pages/Analytics';
import Ads from '@/pages/Ads';
import Meta from '@/pages/Meta';
import CRM from '@/pages/CRM';

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
        loader:async()=>{
          const data = await getData.dataMeta()
          return data;
        }
      },{
        path: "/crm",
        element: <CRM />,
        loader:async()=>{
          const data = await getData.dataCRM()
          return data;
        }
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
