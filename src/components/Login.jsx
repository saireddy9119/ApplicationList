
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Header from './Header';
const Login = () => {
    const navigate = useNavigate();
    const logout = false;

    const handleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);
        if (decoded.email_verified) {
            localStorage.setItem("Email", decoded.email)
            navigate("/home");
        }
    }

    const handleFailure = () => {
        console.log("Google Login Failed")
    }

    return (
        <div>
            <Header showLogout={logout} onLogout={logout} />
            <div className='flex items-center justify-center mt-32 flex-col'>
                <h1 className='text-2xl font-bold text-blue-500 mb-8'>Application Finder</h1>
                <span>
                    <GoogleOAuthProvider clientId="477207231953-eknq6f5srhs74mksj4k60fs4lh10q4eb.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleFailure}
                        />
                    </GoogleOAuthProvider>
                </span>
            </div>
        </div>)
}

export default Login