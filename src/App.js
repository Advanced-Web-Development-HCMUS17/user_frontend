import './App.css';
import {SocketProvider} from "./component/useSocket";
import React, {useState} from "react";
import {UserStatusProvider} from "./component/userStatus/useUserStatus";
import UserStatus from "./component/userStatus/UserStatus";
import Container from "@material-ui/core/Container";
import NavigationBar from "./component/NavigationBar";
import {AuthProvider, useAuth} from "./component/useAuth";
import IndexComponent from "./component";

function App() {
  return (
    <AuthProvider>
      {/*<SocketProvider>*/}
        <UserStatusProvider>
          <NavigationBar/>
          <Container maxWidth={false}>
            <UserStatus/>
          </Container>
          <IndexComponent/>
        </UserStatusProvider>
      {/*</SocketProvider>*/}
    </AuthProvider>
  );
}

export default App;
