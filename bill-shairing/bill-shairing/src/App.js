import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0
  }
];

function Button({children,onClick}){
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}
export default function App() {
  const [open,setopen]=useState(false);
  function handleopenform(){
    return (
      setopen((show)=> !show)
    )
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />

       {
        open && 
        <FormAdd />
       }
        <Button onClick={handleopenform}>{open ? 'Close' : 'Add Friend'}</Button>
      </div>
        <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend ALLFrenid={friend} />
      ))}
    </ul>
  );
}
function Friend({ ALLFrenid }) {
  return (
    <li>
      <img src={ALLFrenid.image} alt={ALLFrenid.name} />
      <h3>{ALLFrenid.name}</h3>
      {ALLFrenid.balance > 0 && (
        <p className="red">
          you owe {ALLFrenid.name} {ALLFrenid.balance}
        </p>
      )}
      {ALLFrenid.balance < 0 && (
        <p className="green">
          {ALLFrenid.name} owes you {Math.abs(ALLFrenid.balance)}
        </p>
      )}
      {ALLFrenid.balance === 0 && <p>you and {ALLFrenid.name} are even</p>}
      <button className="button">Select</button>
    </li>
  );
}
function FormAdd(){

  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend Name</label>
 <input type="text" />
      <label>🌃Image Source</label>
 <input type="text" />
 <Button>Add Friend</Button>


    </form>
  )
}
function FormSplitBill(){
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X Friend</h2>

      <label>Bill Values</label>
 <input type="text" />
      <label>Your Expenxes</label>
 <input type="text" />
      <label>Your Friend Expenxes</label>
 <input type="text" />
 <label>Who is paying the bill</label>
 <select>
  <option value='user'>
    YOU

  </option>
  <option value='friend'>
    X

  </option>
 </select>
 <Button>Split Bill</Button>



    </form>
  )
}
