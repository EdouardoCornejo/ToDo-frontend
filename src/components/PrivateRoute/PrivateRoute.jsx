import {useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const accessToken = useSelector((state) => state.session.token)
    
    if (!accessToken) {
        return <Navigate to="/login" state={{ from: accessToken }} replace />;
    } 

    return children;
}

export default PrivateRoute