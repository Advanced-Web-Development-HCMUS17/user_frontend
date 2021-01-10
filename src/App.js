import './App.css';
import {SocketProvider} from "./component/socketHook/useSocket";
import React, {useState} from "react";
import {UserStatusProvider} from "./component/userStatus/useUserStatus";
import UserStatus from "./component/userStatus/UserStatus";
import Container from "@material-ui/core/Container";
import NavigationBar from "./component/NavigationBar";
import {AuthProvider, useAuth} from "./component/useAuth";
import ReplayProvider from './component/replay/useReplay';
import IndexComponent from "./component";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <UserStatusProvider>
          <ReplayProvider>
          <NavigationBar/>
          <Container maxWidth={false}>
            <IndexComponent/>
          </Container>
          </ReplayProvider>
        </UserStatusProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
