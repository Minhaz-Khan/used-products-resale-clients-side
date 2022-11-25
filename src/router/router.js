import Home from "../Pages/Home/Home/Home";
import SellPostCategorie from "../Pages/SellPostCategories/SellPostCategorie/SellPostCategorie";
import Login from "../Pages/User/Login/Login";
import SignUp from "../Pages/User/SignUp/SignUp";


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
                element: <SellPostCategorie></SellPostCategorie>,
                loader: ({ params }) => fetch(`http://localhost:5000/carspost/${params.id}`)
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
    }
])

export default router