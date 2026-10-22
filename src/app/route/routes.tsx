import { createBrowserRouter } from "react-router-dom";

import Layout from "../../shared/components/Header/Layout/Layout";
import LoginPage from "../../pages/LoginPage/LoginPage";
import OverviewPage from "../../pages/OverviewPage/OverviewPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/overview", element: <OverviewPage /> },
            { path: "/meetups/:id", element: <DetailsPage /> },
            {
                element: <ProtectedRoute />,
                children: [{ path: "/profile", element: <ProfilePage /> }],
            },
            {
                path: "*",
                loader: () => {
                    throw new Response("Not Found", { status: 404 });
                },
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

export default router;
