import {useState, useEffect} from 'react';
import axios from 'axios';
import { SWAPIFilm } from '../App';

const Films: React.FC<{films: string[]}> = ({films}) => {

    const [filmList, setFilmList] = useState<SWAPIFilm[]>([]);

    useEffect(() => {
      const fetchFilmList = async() => {
        try {    
          if (!films) return;
          const result = await Promise.all(films.map((film) => axios.get<SWAPIFilm>(film)));
          console.log(result);
          return result as SWAPIFilm[];
        } catch (error) {
          console.log(error);
        }
      };
      fetchFilmList().then((response) => {
        if (!response) return;
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