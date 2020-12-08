import React, {useState} from 'react';
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';

import Login from './LoginPage';
import Register from './RegisterPage';
import Home from './HomePage';
import tokenService from './service/token-service';

function App() {
    const [userID, setUserID] = useState(tokenService.getUserID());
    const history = useHistory();

    return (
        <Switch>
            <Route exact path="/register">
                {
                    userID ?
                        <Redirect to="/"/> :
                        <Register onSuccess={() => {
                            history.replace("/login");
                        }}/>
                }
            </Route>

            <Route exact path="/login">
                {
                    userID ?
                        <Redirect to="/"/> :
                        <Login onSuccess={() => {
                            console.log(tokenService.getUserID());
                            setUserID(tokenService.getUserID());
                        }}/>
                }
            </Route>

            <Route exact path="/">
                {
                    userID ?
                        <Home userID={userID}
                              logoutAction={() => {
                                  tokenService.deleteToken();
                                  setUserID(null);
                              }}/> :
                        <Redirect to="/register"/>
                }
            </Route>
        </Switch>
    );
}

export default App;
