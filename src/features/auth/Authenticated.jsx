import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-Auth";

export default function Authenticated({ children }){

    const { authUser } = useAuth();

    if ( !authUser ){
 return <Navigate to= "/login" />
    }
    return children
}