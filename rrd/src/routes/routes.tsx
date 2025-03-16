import { useRoutes } from "react-router-dom"
import Login from "../pages/loginPage"
import User from "../pages/user";
import Dashboard from "../pages/dashboard";

export default function Routes(){
    const routes=useRoutes(
        [
            {path:'/',element:<User/>},
            {path:'/createaccount',element:<Login/>},
            {path:'/dashboard',element:<Dashboard/>},
            {path:'/*',element:<>Sorry page not found</>}
        ]
    )
    return routes;
}