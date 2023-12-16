import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Congratulations() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  useEffect(() => {
    const url = "http://localhost:4000/congrats";
    axios
      .post(url, {})
      .then((res) => {
        setName(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log("Hello World");
  return <div>Hello {name} order Has been placed </div>;
}
