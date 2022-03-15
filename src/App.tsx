import React, {useState, useEffect, MouseEvent } from 'react';
import axios from 'axios'
import './App.css';

const baseUrl = 'https://swapi.dev/api/people';

interface SWAPIToon {
  name?: string;
  films?: SWAPIFilm[];
}

interface SWAPIFilm {
  data?: {
    title?: string;
    episode_id?: number,
    release_date?: Date;
  }
}

interface SWAPIData {
  count?: number;
  next?: string;
  previous?: string;
  results?: SWAPIToon[];
}

const App: React.FC = () => {

  const [data, setData] = useState([] as SWAPIData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(baseUrl);
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

  const Films = ({list}: any) => {
    const [filmList, setFilmList] = useState([] as any);
    useEffect(() => {
      const getFilmData = (url: string) => axios.get(url);
      const fetchFilmList = async() => {
        try {
          const result: any = await Promise.all(list.map((filmUrl: any) => getFilmData(filmUrl)));
          return result;
        } catch (error) {
          console.log(error);
        }
      };
      fetchFilmList().then((response) => {
        setFilmList(response);
      });
    }, []);

    return (
      <>
        <ul className="film-list">
          {filmList?.map((film: SWAPIFilm) => (
            <li key={film.data?.episode_id}>
              <span>ep {film.data?.episode_id}</span>
              <span><em>{film.data?.title}</em></span>
              <span>{film.data?.release_date}</span>
            </li>
          ))}
          {/* {list.map((film: string[]) => (
            <li>{film}</li>
          ))} */}
        </ul>
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
                <Films list={item?.films} />
              </Collapse>
            </li>
          )) || <li>It's those womp rats again! They chewed up all the data!</li>}
        </ul>
      </section>
    </div>
  );
}

export default App;
