import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./RegisterPage";
import Login from "./LoginPage";
import Home from "./HomePage";
import {useAuth} from "./useAuth";
import Lobby from "./lobby/Lobby";
import UpdatePasswordPage from "./resetPassword/UpdatePasswordPage";
import ResetPasswordPage from "./resetPassword/ResetPasswordPage";
import {LinearProgress} from "@material-ui/core";
import ProfilePage from "./ProfilePage";

const PrivateRoute = ({component: Component, auth: isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => {
    if (isAuthenticated === null)
      return <LinearProgress/>
    if (isAuthenticated === true)
      return <Component {...props}/>;
    return <Redirect to='/login'/>
  }}/>
)

export default function IndexComponent({props}) {
  const {isAuth, userInfo} = useAuth();
  return (
    <Switch>
      <PrivateRoute exact path="/" auth={isAuth} component={Home}/>
      <Route exact path="/register">{isAuth ? <Redirect to="/"/> : <Register/>}</Route>
      <Route exact path="/login">{isAuth ? <Redirect to="/"/> : <Login/>}</Route>
      <Route exact path="/login/:token">{isAuth ? <Redirect to="/"/> : <Login/>}</Route>
      <Route exact path="/reset-password/get-code" component={ResetPasswordPage}/>
      <Route exact path="/reset-password/:email/:code" component={UpdatePasswordPage}/>
      <PrivateRoute exact path="/l/:lobbyId" auth={isAuth} component={Lobby}/>
      <PrivateRoute exact path="/profile" auth={isAuth} component={() => ProfilePage(userInfo)}/>
    </Switch>
  )
}