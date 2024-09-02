import React from 'react';
import styles from './filters.module.css';

const Filters = ({ activeFilter, setActiveFilter }) => {
  return (
    <section className={`d-flex justify-content-around ${styles.filters}`}>
      <div
        className={activeFilter === 'nearby' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('nearby')}
      >
        Location
      </div>
      <div
        className={activeFilter === 'education' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('education')}
      >
        Designation
      </div>
      <div
        className={activeFilter === 'qualification' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('qualification')}
      >
        Qualification
      </div>
    </section>
  );
};

export default Filters;
