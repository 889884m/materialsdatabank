import React from 'react';
// import { GoogleLogout } from 'react-google-login';

const clientId = '725707155116-9cdhr3d9clqr6ah0tefdvgjsbvmklp30.apps.googleusercontent.com';

function Logout() {
    const onSuccess = () => {
        alert('Logout successful');
    };

    return (
        <div>
            {/* <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            >
            </GoogleLogout> */}
        </div>
    );
}

export default Logout;