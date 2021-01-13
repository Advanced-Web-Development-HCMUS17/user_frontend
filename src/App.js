import './App.css';
import {SocketProvider} from "./component/socketHook/useSocket";
import React, {useState} from "react";
import {UserStatusProvider} from "./component/userStatus/useUserStatus";
import Container from "@material-ui/core/Container";
import NavigationBar from "./component/NavigationBar";
import {AuthProvider, useAuth} from "./component/useAuth";
import IndexComponent from "./component";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter><AuthProvider>
      <SocketProvider>
        <UserStatusProvider>
          <IndexComponent/>
        </UserStatusProvider>
      </SocketProvider>
    </AuthProvider></BrowserRouter>
  )
    ;
}

export default App;
