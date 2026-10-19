import { RouterProvider } from "react-router-dom";
import router from "./app/route/routes.tsx";

function App() {
    return (
        <>
        <RouterProvider router ={router}/>
        </>
    );
}

export default App;
