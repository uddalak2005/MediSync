import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";
import LoginReRoute from "./screens/LoginReRoute.jsx";
import OPDManagement from "./screens/OPDManagement.jsx";
import BedStatus from './screens/BedStatus.jsx';
import Inventory from './screens/Inventory.jsx';
import OPDManager from "./screens/OPDManager.jsx";
import PersonalDetails from "./components/OPDManageer/PersonalDetails.jsx";
import FamilyDetails from "./components/OPDManageer/FamilyDetails.jsx";
import NewAppointments from "./components/OPDManageer/NewAppointments.jsx";
import Attachments from "./components/OPDManageer/Attachments.jsx";
import Bill from './components/OPDManageer/Bill.jsx'
import AllAppointments from "./components/OPDManageer/AllAppointments.jsx";
import AppointmentHistory from "./components/OPDManageer/AppointmentHistory.jsx";
import IPDManager from "./screens/IPDManager.jsx";
import BedStatusMonitor from "./components/IPDManager/BedStatusMonitor.jsx";
import FamilyDetailsIPD from "./components/IPDManager/FamilyDetailsIPD.jsx";
import PersonalDetailsIPD from "./components/IPDManager/PersonalDetailsIPD.jsx";
import AttachIPD from "./components/IPDManager/AttachIPD.jsx";
import AddPatient from "./components/IPDManager/AddPatient.jsx";
import InventoryManagement from "./screens/InventoryManagement.jsx";
import Add from './components/InventoryManeger/AddStocks.jsx';
import All from './components/InventoryManeger/AllStocks.jsx'
import SidePannelInventory from './components/InventoryManeger/SidePannelInventory.jsx';
import NewStocks from "./components/InventoryManeger/NewStocks.jsx";

const router = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
    },
    {
        path: '/Login',
        element: <LoginReRoute/>,
    },
    {
        path: "/Login/OPDManagement",
        element: <OPDManagement/>,
    },
    {
        path: "/Login/BedStatusMonitoring",
        element: <BedStatus/>,
    },
    {
        path: "/Login/InventoryManagement",
        element: <Inventory/>,
    },
    {
        path: '/OPDManagement',
        element: <OPDManager/>,
        children: [
            {
                path: 'NewAppointments',
                element: <NewAppointments/>,
                children:[
                    {
                        path:'PersonalDetails',
                        element: <PersonalDetails />
                    },
                    {
                        path: 'FamilyDetails',
                        element: <FamilyDetails />
                    },
                    {
                        path: 'Attachments',
                        element: <Attachments />
                    }
                ]
            },
            {
                path: 'AllAppointments',
                element: <AllAppointments/>
            },
            {
                path: 'History',
                element: <AppointmentHistory/>
            },
            {
                path: 'Bill',
                element: <Bill/>
            }
            ]
    },
    {
        path: '/IPDManagement',
        element: <IPDManager/>,
        children:[
            {
                path:'AddPatient',
                element: <AddPatient/>,
                children: [
                    {
                        path:"FamilyDetails",
                        element: <FamilyDetailsIPD/>
                    },
                    {
                        path:'PersonalDetails',
                        element: <PersonalDetailsIPD />
                    },
                    {
                        path: 'Attachments',
                        element:<AttachIPD/>
                    }
                ]
            },
            {
                path: 'BedStatus',
                element: <BedStatusMonitor/>
            }
        ]
    },
    {
        path: '/Inventory',
        element: <InventoryManagement/>,
        children:[
            {
                path: 'SidePannelInventory',
                element: <SidePannelInventory/>
            },
            {
                path : 'AllStocks',
                element: <All/>
            },
            {
                path: 'NewStocks',
                element: <NewStocks/>,
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <RouterProvider router={router}/>
        </DevSupport>
    </StrictMode>,
)
