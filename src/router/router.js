import DashboardLayout from "../Layout/DashboardLayout";
import Blog from "../Pages/Blog/Blog";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProduct from "../Pages/Dashboard/MyProduct/MyProduct";
import MyWishlist from "../Pages/Dashboard/MyWishlist/MyWishlist";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Home from "../Pages/Home/Home/Home";
import SellPostCategorie from "../Pages/SellPostCategories/SellPostCategorie/SellPostCategorie";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
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
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/sellpostcategorie/:id',
                element: <PrivetRoute><SellPostCategorie></SellPostCategorie></PrivetRoute>,
                loader: ({ params }) => fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/carspost/${params.id}`, {
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
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
        errorElement: <ErrorPage></ErrorPage>,
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
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <AdminRoute><Payment></Payment></AdminRoute>,
                loader: ({ params }) => fetch(`https://used-products-resale-server-side-minhaz-khan.vercel.app/bookings/${params.id}`, {
                    headers: {
                        authorization: `baerer ${localStorage.getItem('accessToken')}`
                    }
                })
            },
            {
                path: '/dashboard/mywishlist',
                element: <AdminRoute><MyWishlist></MyWishlist></AdminRoute>
            }
        ]
    }
])

export default router