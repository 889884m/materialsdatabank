import React from "react";
// import { GoogleLogin } from 'react-google-login';
//refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '725707155116-9cdhr3d9clqr6ah0tefdvgjsbvmklp30.apps.googleusercontent.com';

function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);

        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };

    return (
        <div>
            {/* <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '50px'}}
                isSignedIn={true}
            /> */}
        </div>
    );
}

export default Login;