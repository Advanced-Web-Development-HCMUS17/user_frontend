import React from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Register from "../RegisterPage";
import Login from "../LoginPage";
import Home from "../HomePage";
import {useAuth} from "./useAuth";

export default function IndexComponent({props}) {
  const history = useHistory();

  const {userInfo} = useAuth();
  return (
    <Switch>
      <Route exact path="/register">
        {
          userInfo ?
            <Redirect to="/"/> :
            <Register onSuccess={() => {
              history.replace("/login");
            }}/>
        }
      </Route>

      <Route exact path="/login">
        {
          userInfo ?
            <Redirect to="/"/> :
            <Login/>
        }
      </Route>

      <Route exact path="/">
        {
          userInfo ?
            <Home userInfo={userInfo}
            /> :
            <Redirect to="/register"/>
        }
      </Route>
    </Switch>
  )
}
