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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [open, setopen] = useState(false);
  const [friends, setfriends] = useState(initialFriends);
  const [select, setSelect] = useState(null);
  function handleopenform() {
    return setopen((show) => !show);
  }
  function handlesubmit(friend) {
    setfriends((friends) => [...friends, friend]);
    setopen(false);
  }
  function handleselect(friend) {
    // return setSelect(friend);
    setSelect((cur) => (cur?.id === friend.id ? null : friend));
    setopen(false);
  }
  function handlesplitbill(value) {
    console.log(value);
    setfriends((friends)=> 
      friends.map((friend) => 
        friend.id===setfriends.id ?
    {...friends ,balance : friend.balance+ value} : friend
  ))
  setSelect(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onselect={handleselect}
          friendsplit={select}
        />

        {open && <FormAdd onAddfriend={handlesubmit} />}
        <Button onClick={handleopenform}>
          {open ? "Close" : "Add Friend"}
        </Button>
      </div>
      {select && (
        <FormSplitBill friendsplit={select} onsplitbill={handlesplitbill} />
      )}
    </div>
  );
}

function FriendList({ friends, onselect, friendsplit }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          ALLFrenid={friend}
          key={friend.id}
          onselect={onselect}
          onfriendsplit={friendsplit}
        />
      ))}
    </ul>
  );
}
function Friend({ ALLFrenid, onselect, onfriendsplit }) {
  const issplit = onfriendsplit?.id === ALLFrenid.id; //Use nullish Coalising Operation because sometime onfriend is null and has no id
  return (
    <li className={issplit ? " selected" : " "}>
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
      <button className="button" onClick={() => onselect(ALLFrenid)}>
        {issplit ? "Close" : "Split"}
      </button>
    </li>
  );
}
function FormAdd({ onAddfriend }) {
  const [name, setname] = useState("");
  const [image, setimage] = useState("https://i.pravatar.cc/48?u=");
  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const newitems = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0
    };
    onAddfriend(newitems);
    setname("");
    setimage("https://i.pravatar.cc/48?u=499476");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <label>🌃Image Source</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setimage(e.target.value)}
      />
      <Button>Add Friend</Button>
    </form>
  );
}
function FormSplitBill({ friendsplit, onsplitbill }) {
  const [bill, setbill] = useState("");
  const [billByuser, setbillByuser] = useState("");
  const friendbill = bill ? bill - billByuser : " ";
  const [Whoisbill, setWhoisbill] = useState("user");

  function handlesubmitbill(e) {
    e.preventDefault();

    if (!bill || !billByuser) return;
    onsplitbill(Whoisbill === "user" ? friendbill : -billByuser);
  }

  return (
    <form className="form-split-bill" onSubmit={handlesubmitbill}>
      <h2>Split a bill with {friendsplit.name} Friend</h2>

      <label>Bill Values</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setbill(Number(e.target.value))}
      />
      <label>Your Expenxes</label>
      <input
        type="text"
        value={billByuser}
        onChange={(e) =>
          setbillByuser(
            Number(e.target.value) > bill ? billByuser : Number(e.target.value)
          )
        }
      />
      <label>{friendsplit.name}Friend Expenxes</label>
      <input type="text" disabled value={friendbill} />
      <label>Who is paying the bill</label>
      <select value={Whoisbill} onChange={(e) => setWhoisbill(e.target.value)}>
        <option value="user">YOU</option>
        <option value="friend">{friendsplit.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
