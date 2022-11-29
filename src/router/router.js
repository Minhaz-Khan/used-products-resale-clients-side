import DashboardLayout from "../Layout/DashboardLayout";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProduct from "../Pages/Dashboard/MyProduct/MyProduct";
import Home from "../Pages/Home/Home/Home";
import SellPostCategorie from "../Pages/SellPostCategories/SellPostCategorie/SellPostCategorie";
import Login from "../Pages/User/Login/Login";
import SignUp from "../Pages/User/SignUp/SignUp";
import AdminRoute from "../PrivetRoutes/AdminRoute";
import PrivetRoute from "../PrivetRoutes/PrivetRoute";


const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Layout/Main");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/sellpostcategorie/:id',
                element: <PrivetRoute><SellPostCategorie></SellPostCategorie></PrivetRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/carspost/${params.id}`, {
                    headers: {
                        authorization: `baerer ${localStorage.getItem('accessToken')}`
                    }
                })
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
        children: [
            {
                path: '/dashboard',
                element: <AdminRoute><MyOrders></MyOrders></AdminRoute>
            },
            {
                path: '/dashboard/addproduct',
                element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
            },
            {
                path: '/dashboard/myproduct',
                element: <AdminRoute><MyProduct></MyProduct></AdminRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            }
        ]
    }
])

export default router