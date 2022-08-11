import React, { useContext } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faChildDress } from "@fortawesome/free-solid-svg-icons";
import styles from "./filter.module.scss";
import FilterContext from '../../contexts/FilterContext';



const Filter = () => {

    const { filters, handleFilters } = useContext(FilterContext);

    const [hover, setHover] = useState(0);

    return (
        <div className={styles.filter}>
            <div className={styles.wrapper}>

                <div className={styles.stars}>
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={index <= (hover || filters.minRating) ? `${styles.selected}` : `${styles.unselected}`}
                                onClick={() => handleFilters("minRating", index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(filters.minRating)}
                            >
                                <span className={styles.star}>&#9733;</span>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className={styles.options}>
                <FontAwesomeIcon icon={faPerson} className={styles.icon} />
                <span>Adults:</span>
                <button onClick={() => { handleFilters("adults", "decrease") }} disabled={filters.adults <= 1}>-</button>
                <span className={styles.counter}>{filters.adults}</span>
                <button onClick={() => { handleFilters("adults", "increase") }} disabled={filters.adults >= 6}>+</button>

                <FontAwesomeIcon icon={faChildDress} className={styles.icon} />
                <span>Children:</span>
                <button onClick={() => { handleFilters("children", "decrease") }} disabled={filters.children <= 0}>-</button>
                <span className={styles.counter}>{filters.children}</span>
                <button onClick={() => { handleFilters("children", "increase") }} disabled={filters.children >= 4}>+</button>
            </div>
        </div>
    )
}

export default Filter