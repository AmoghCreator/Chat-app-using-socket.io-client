import { useEffect, useState, useRef } from "react";
import socket from 'socket.js'
import { useParams } from "react-router-dom";

const Chat = (props) => {
  const userName = useParams(); // Extracts user name from react router
  const [chats, setChats] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [visible, setVisibility] = useState(true);

  const inputChangeHandler = (e) => {
    setUserInput(e.target.value);
  }

  const userInputSubmit = (e) => {
    // Sends server socket the new conversaton details
    setChats([...chats, userInput]);
    socket.emit("newChat", { user: userName.name, chat: userInput });
    setVisibility(false);
    setUserInput("")
  }

  socket.on("oldChats", (x) => {
    // gets the details of conversation that has been going on and sends to user
    if (x.length > 0) setChats(x);
  })

  socket.on("userLeft", (x) => {
    console.log(x);
    setChats([...chats, { user: "system", chat: `${x.name} has left` }]);
  })

  return (
    <div className="h-3/4 w-3/4 border-solid border-2 flex flex-col py-10 px-8">
      <div id="Chat" className="flex flex-col flex-grow overflow-scroll w-full gap-3 px-5">
        {chats.length != 0 && chats.map((item, val) => (<pre key={val} className={`${(item.user == userName.name) ? "ml-auto text-right" : "mr-auto"} w-3/4 ${(item.user == "system") ? "font-extralight italic" : ""} `}
          style={{ whiteSpace: "pre-wrap" }}><span className={`${(item.user == userName.name) ? "text-red-700" : "text-blue-700"} w-3/4`}
          >{item.user}</span > : {item.chat}</pre>))}
      </div>
      <div className=" flex flex-row justify-end w-full max-h-8">
        <textarea onChange={inputChangeHandler} defaultValue="" value={userInput}
          className="border-2 border-b-black border-transparent border-dashed flex-grow" required />
        <button onClick={userInputSubmit} className="border-2 border-dashed border-black px-10 ml-1">
          submit
        </button>
      </div>
    </div>
  )
}

export default Chat;
