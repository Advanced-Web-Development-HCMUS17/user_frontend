import './App.css';
import {SocketProvider} from "./component/useSocket";
import React from "react";
import {UserStatusProvider} from "./component/userStatus/useUserStatus";
import UserStatus from "./component/userStatus/UserStatus";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <SocketProvider>
      <UserStatusProvider>
        <Container maxWidth={false}>
          <UserStatus/>
        </Container>
      </UserStatusProvider>
    </SocketProvider>
  );
}

export default App;
