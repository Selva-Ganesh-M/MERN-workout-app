import React, { useState } from "react";
import { useEffect } from "react";

const Test = () => {
  const [count, setCount] = useState(1);
  const func = () => {
    console.log("before incrementing", count);
    setCount((prev) => prev + 1);
    console.log("after incrementing", count);
    setTimeout(() => console.log("after 5 secs", count), 5000);
  };
  useEffect(() => {
    func();
  });
  return <div style={{ fontSize: "40px" }}>{count}</div>;
};

export default Test;
