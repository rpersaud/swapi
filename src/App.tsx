import React, {useState, useEffect, MouseEvent } from 'react';
import axios from 'axios'
import './App.css';

const baseUrl = 'https://swapi.dev/api/peoples';

interface SWAPIToon {
  name?: string;
}

interface SWAPIData {
  count?: number;
  next?: string;
  previous?: string;
  results?: any[];
}

const App: React.FC = () => {

  const [data, setData] = useState([] as SWAPIData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await  axios.get(baseUrl);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []); // run once

  const Collapse = ({ item, collapsed, children }: any) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
    const [selectedToon, setSelectedToon] = useState({});
    useEffect(() => {
      if (selectedToon) {
        console.log('toon clicked', selectedToon);
      }
      // dispatch api call
    }, [selectedToon]);

    const handleClick = (event: MouseEvent) => {
      setIsCollapsed(!isCollapsed);
      setSelectedToon((event?.target as HTMLButtonElement).innerHTML);
    }

    return (
      <>
        <button
          className={`collapse-button ${ !isCollapsed ? 'selected' : ''}`}
          onClick={handleClick}
        >
          {item.name}
        </button>
        <div
          className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
          aria-expanded={isCollapsed}
        >
          {children}
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <nav>
        <ul className="nav-menu">
          <li><a href="#ws" rel="noopener noreferrer">whiteSpace</a></li>
          <li>Found {data?.count || 0} Toons </li>
          <li><a href="https://swapi.dev/" target="_blank" rel="noreferrer">SW-Api</a></li>
        </ul>
      </nav>
      <section>
        <ul>
          {data?.results?.map((item: SWAPIToon) => (
            <li key={item.name}>
              <Collapse item={item} collapsed={true}>
                <ul>
                  <li>Empire Strieks Back, 1977</li>
                </ul>
              </Collapse>
            </li>
          )) || <li>It's those womp rats again! They chewed up all the data!</li>}
        </ul>
      </section>
    </div>
  );
}

export default App;
