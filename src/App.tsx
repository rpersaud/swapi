import React, {useState, useEffect, MouseEvent } from 'react';
import axios from 'axios'
import './App.css';

const baseUrl = 'https://swapi.dev/api/people';

const App: React.FC = () => {

  const [data, setData] = useState([] as any);
  const [selectedToon, setSelectedToon] = useState({});
  
  useEffect(() => {
    if (selectedToon) {
      console.log('toon clicked', selectedToon);
    }
    // dispatch api call
  }, [selectedToon]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await  axios.get(baseUrl);
      setData(result.data);
    }
    fetchData();
  }, []); // run once

  const handleClick = (event: MouseEvent) => {
    setSelectedToon((event?.target as HTMLButtonElement).innerHTML);
  }

  return (
    <div className="app">
      <nav>
        <ul className="nav-menu">
          <li><a href="https://swapi.dev/" target="_blank" rel="noreferrer">SW-Api</a></li>
          <li><a href="#ws" rel="noopener noreferrer">whiteSpace</a></li>
        </ul>
      </nav>
      <section>
        <ul>
          {data?.results?.map((item: { name: string }) => ( // TODO: type interface
            <li key={item.name}>
              <button onClick={handleClick}>{item.name}</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
