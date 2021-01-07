import './App.css';
import {SocketProvider} from "./component/socketHook/useSocket";
import React from "react";
import {UserStatusProvider} from "./component/userStatus/useUserStatus";
import {AuthProvider} from "./component/useAuth";
import IndexComponent from "./component";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <UserStatusProvider>
          <IndexComponent/>
        </UserStatusProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
