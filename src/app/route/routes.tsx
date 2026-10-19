import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../../pages/LoginPage/LoginPage"
import OverviewPage from "../../pages/OverviewPage/OverviewPage"
import DetailsPage from "../../pages/DetailsPage/DetailsPage"
import ProfilePage from "../../pages/ProfilePage/ProfilePage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>
    },
    {
        path: "/overview",
        element: <OverviewPage/>
    },
    {
        path: "/details",
        element: <DetailsPage/>
    },
    {
        path: "/profile",
        element: <ProfilePage/>
    },
]);

export default router;