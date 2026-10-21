import { createBrowserRouter } from "react-router-dom";

import Layout from "../../shared/components/Header/Layout/Layout";
import LoginPage from "../../pages/LoginPage/LoginPage"
import OverviewPage from "../../pages/OverviewPage/OverviewPage"
import DetailsPage from "../../pages/DetailsPage/DetailsPage"
import ProfilePage from "../../pages/ProfilePage/ProfilePage"
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            { path: "/", element: <LoginPage/> },
            { path: "/register", element: <RegisterPage/> },
            { path: "/overview", element: <OverviewPage/> },
            { path: "/details", element: <DetailsPage/> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/profile", element: <ProfilePage/> },
                ]
            }
        ],
    },
]);


export default router;