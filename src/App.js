import logo from './logo.svg';
import './App.css';
import Chat from "components/Chat"
import JoinRoom from './components/JoinRoom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChatRoomMembers from "components/ChatRoomMembers"
import { useState } from 'react';
import socket from 'socket';
import Header from 'components/Header';
import Footer from 'components/Footer';

const router = createBrowserRouter([{
  path: '/',
  element: <JoinRoom />
},
{
  path: '/chatRoom/:name',
  element: <Chat />
}
])

function App() {
  const [userList, setUserList] = useState([{ name: "fire" }])
  socket.on("users", (x) => { // listens to "users" event to update users list
    if (x.users) setUserList(x.users);
  })
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Header />
      <ChatRoomMembers users={userList} />
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
