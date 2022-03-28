import React, {useState, useEffect, MouseEvent } from 'react';
import axios from 'axios'
import './App.css';
import Collapse from './components/Collapse';
import Films from './components/Films';

const baseUrl = 'https://swapi.dev/api/people';

export interface SWAPIToon {
  name?: string;
  films?: string[];
}
export interface SWAPIFilm {
  data?: {
    title?: string;
    episode_id?: number,
    release_date?: Date;
  }
}
export interface SWAPIData {
  count?: number;
  next?: string;
  previous?: string;
  results?: SWAPIToon[];
}

const App: React.FC = () => {

  const [data, setData] = useState<SWAPIData>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchData = async(url: string) => {
    try {
      return await axios.get(url);
    } catch (error) {
      console.log('App FetchData error', error);
      const err = (error as Error).message;
      setErrorMsg(err);
      setLoading(false);
    }
  }


  // Initially load page with data
  useEffect(() => {
    fetchData(baseUrl).then((res) => {
      if (res?.data) {
        setData(res.data);
        setLoading(false);
      }
    });
  }, []); // run once

  const handlePrevious = async () => {
    fetchData(data?.previous || '').then((res) => {
      setData(res?.data);
    });
  }

  const handleNext = async () => {
    fetchData(data?.next || '').then((res) => {
      setData(res?.data);
    });
  }

  return (
    <div className="app">
      <nav>
        <ul className="nav-menu">
          <li><a href="#ws" rel="noopener noreferrer">whiteSpace</a></li>
          <li>Found {data?.count || 0} Characters </li>
          <li><a href="https://swapi.dev/" target="_blank" rel="noreferrer">SW-Api</a></li>
        </ul>
      </nav>
      <section>
        { errorMsg && <div>{errorMsg}</div> }
        { loading ? 
          <div>...loading</div> :
        <ul>
          {data?.results?.map((item: SWAPIToon) => (
            <li key={item.name}>
              <Collapse item={item} collapsed={true}>
                {item?.films && <Films films={item?.films} />}
              </Collapse>
            </li>
          ))}
        </ul>
      }
      </section>
      <footer>
        <ul className='nav-menu'>
          <li>{!!data?.previous && <span onClick={handlePrevious}>previous</span>}</li>
          <li>{!!data?.next && <span onClick={handleNext}>next</span>}</li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
