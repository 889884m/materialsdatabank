import React, { Component } from 'react';

import { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import selectors from '../../redux/selectors';
import { connect } from 'react-redux'
import { isNull } from 'lodash';

// import axios from 'axios';

const clientId = '725707155116-9cdhr3d9clqr6ah0tefdvgjsbvmklp30.apps.googleusercontent.com';

// const onSuccess = (res) => {
//     console.log('[Login Success] currentUser:', res.profileObj);

//     // refreshTokenSetup(res);
// };

// const onFailure = (res) => {
//     console.log('[Login failed] res:', res);
// };

// const LoginWrapper = ({render}) => {
//     return render(Login());
// }

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: null
        }
        this.me = null;
    }
    Login() {
        const { me } = this.props;
        // const [ user, setUser ] = useState({});
    
        function handleCallbackResponse(response) {
            // console.log("Encoded JWT ID token: " + response.credential);
    
            var userObject = jwt_decode(response.credential)
            // console.log(userObject)
            this.me = userObject;
            document.getElementById("signInDiv").hidden = true;
        }
    
        function handleSignOut(event){
            this.me = null;
            document.getElementById("signInDiv").hidden = false;
        }
    
        function componentLogin() {
            /* global google */
            google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCallbackResponse
            });
        };
        
        function componentButton() {
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large" }
            );
        };

        function componentPrompt() {
            google.accounts.id.prompt();
        };

        // componentLogin();
    
    // If we have no user: sign in button
    // If we have a user: show the log out button
        return (
            <div className="App">
                <div id="signInDiv"></div>
                    {componentLogin()}
                    {componentButton()}
                    {componentPrompt()}
                    {console.log(this.me)}
                    { isNull(this.me) == false &&
                    <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                    }
        
                    { this.me &&
                        <div>
                            <img src={this.me.picture}></img>
                            <h3>{this.me.name}</h3>
                        </div>
                    }
                    {this.me = me}
            </div>
        );
    }

    render = () => {

        return (
            <div>
                {/* {this.Login()} */}
                <Login/>
            </div>
        )
    }
}

function Login() {
    const [ user, setUser ] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);

        var userObject = jwt_decode(response.credential)
        console.log(userObject)
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event){
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );

        google.accounts.id.prompt();
    }, []);

// If we have no user: sign in button
// If we have a user: show the log out button
    return (
        <div className="App">
            <div id="signInDiv"></div>
            { Object.keys(user).length != 0 &&
            <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
            }

            { user &&
                <div>
                    <img src={user.picture}></img>
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
    );
}

function mapStateToProps(state) {
    const me = selectors.girder.getMe(state);
    return {
        me
    }
}

export default connect(mapStateToProps)(LoginPage)