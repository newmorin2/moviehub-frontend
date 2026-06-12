import { Navigate } from "react-router";

function ProtectedRoutes({ userName, children }) {
    if (!userName) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoutes;