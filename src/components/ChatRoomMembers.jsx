const ChatRoomMemebers = (props) => {
  return (
    <div className="flex w-3/4 gap-4">
      <span className="text-green-600">Currently Online:</span>
      <div className="flex flex-row justify-start gap-4">
        {props.users.map((item) => <h1>{item.name} , </h1>)}
      </div>
    </div>
  )
}

export default ChatRoomMemebers;
