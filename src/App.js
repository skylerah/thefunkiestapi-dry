import React from "react"
import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  //Where the state is initially set for the component
  const [value, setValue] = useState();
  const [isInitialized, setInitialized] = useState()

  useEffect(() => {
    fetch("https://thefunkiestapiv2.azurewebsites.net/api/getScore?name=funkiestApiScore", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setInitialized(true)
        setValue(res.data)
      })
  }, []);

  useEffect(() => {
    if (typeof(value) == "number" && isInitialized === true) {
      console.log("Making an API call!");
      fetch("https://thefunkiestapiv2.azurewebsites.net/api/updateScore?name=funkiestApiScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ numValue: value })
      })
        .then((res) => res.json())
        .then((res) => {
          setValue(res.data);
        });
    }
  }, [value]); // useEffect will fire when one of these dependencies changes

  const increment = () => {
    console.log("incrementing!");
    setValue(value + 1);
  };

  const decrement = () => {
    console.log("decrementing!");
    setValue(value - 1);
  };

  const Button = (props) => {
    return <button onClick={props.handleClick}>{props.children}</button>;
  };

  return (
    <div className="App">
      <h2>This is a number: {value} 😎</h2>
      <h3>
        (This number is from the return data from an
        API call and wearing cool sunglasses)
      </h3>
      <h3>Click a button below to make it change!</h3>
      <Button handleClick={decrement}>Decrement</Button>
      <Button handleClick={increment}>Increment</Button>
    </div>
  );
}
