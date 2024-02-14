import { Link } from "react-router-dom";
import { useState } from "react";
import socket from "socket";

const JoinRoom = () => {

  const [name, setName] = useState("Anon");

  const joinRoom = () => {
    socket.emit("joinRoom", { name: name })
  }

  return (
    <div className="flex flex-col p-10 border-black border-2 w-3/4 h-3/4 items-center">
      <h1 className="text-2xl">Welcome to OpenChat</h1>
      <div className=" flex flex-col flex-grow justify-center">
        <label>Enter a Username : </label><input type="text" required className="border-b-black border-2 border-dashed border-transparent"
          defaultValue={"Anon"} onChange={(x) => {
            setName(x.target.value);
          }} />
      </div>
      <Link to={`/chatRoom/${name}`} className="mt-auto" onClick={joinRoom}>
        <button className=" p-3 border-solid bg-gray-200 rounded-2xl" >
          <h2>Start Chatting</h2>
        </button>
      </Link>
    </div>
  )
}

export default JoinRoom;
