import CityItem from './CityItem';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import PropTypes from 'prop-types';
import { useCities } from '../contexts/CitiesContext';

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool
}

export default function CityList() {

  const {cities, isLoading} = useCities();

  if(isLoading) return <Spinner/> ;
  if(!cities.length) <Message message='Add your first city by clicking on a city on the map'/> ;
  return (
    <ul className={styles.cityList}>
      {cities.map(city => <CityItem city={city} key={city.id}/>)}
    </ul>
  )
}
