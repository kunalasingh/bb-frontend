"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const myList = [{name:"a"}, {name:"b"}, {name:"c"}];
  const [list, setList] = useState(myList);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://swapi.dev/api/planets/"
      );
      setList(res?.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <main>
      <h1>good bye world</h1>
      {list.map(el => <h1 key={el.id}>{el.name}</h1>)}
      <input title="what you looking"></input>
    </main>
  );
}
