import {useState, useEffect} from 'react';
import axios from 'axios';
import { SWAPIFilm } from '../App';

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

    const getDate = (date: Date) => {
      return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full'}).format(new Date(date));
    }

    return (
      <>
        <ul className="film-list">
          {filmList?.map((film: SWAPIFilm) => (
            <li key={film.data?.episode_id}>
              <span>ep {film.data?.episode_id}</span>
              <span><em>{film.data?.title}</em></span>
              <span>{getDate(film.data?.release_date as any)}</span>
            </li>
          ))}
          </ul>
      </>
    );
  };

  export default Films;