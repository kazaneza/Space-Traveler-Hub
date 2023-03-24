import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, reserveRocket, cancelRocket } from '../redux/features/rockets/RocketSlice';
import styles from '../styles/Rocket.module.css';

const RocketsList = () => {
  const rockets = useSelector((state) => state.rocket.rockets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleReserveClick = (id) => {
    const newState = rockets.map((rocket) => {
      if (rocket.id !== id) { return rocket; }
      return { ...rocket, reserved: true };
    });
    dispatch(reserveRocket(newState));
  };

  const handleCancelClick = (id) => {
    const newState = rockets.map((rocket) => {
      if (rocket.id !== id) { return rocket; }
      return { ...rocket, reserved: false };
    });
    dispatch(cancelRocket(newState));
  };

  return (
    <ul className={styles.rocketList}>
      {rockets.map((rocket) => (
        <li key={rocket.id} className={styles.rocketItem}>
          {rocket.flickr_images.length > 0 && (
            <img src={rocket.flickr_images[0]} alt={rocket.name} className={styles.flickr} />
          )}
          <div className={styles.textWrapper}>
            <h3 className={styles.name}>{rocket.rocket_name}</h3>
            <div className={styles.description}>
              {rocket.reserved && (<span className={styles.reserved}>Reserved</span>)}
              <span>{rocket.description}</span>
            </div>
            {rocket.reserved
              ? (
                <div>
                  <button className={styles.cancel} type="button" onClick={() => handleCancelClick(rocket.id)}>Cancel Reservation</button>
                </div>
              )
              : (
                <div>
                  <button
                    className={styles.reserve}
                    type="button"
                    onClick={() => handleReserveClick(rocket.id)}
                  >
                    Reserve Rocket
                  </button>
                </div>
              )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RocketsList;
