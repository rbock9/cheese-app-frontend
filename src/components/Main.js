import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [cheese, setCheese] = useState(null);

  const URL = "http://localhost:4000/cheese/";

  const getCheese = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  const createCheese = async (singleCheese) => {
    // make post request to create cheese
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleCheese),
    });
    // update list of cheese
    getCheese();
  };

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Index cheese={cheese} createCheese={createCheese}/>}/>
        <Route path="/cheese/:id" element={<Show/>}/>
      </Routes>
    </main>
  );
}
  
export default Main;