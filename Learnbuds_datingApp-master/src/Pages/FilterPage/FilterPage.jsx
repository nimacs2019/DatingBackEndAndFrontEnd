import React from "react";
import styles from "./FilterPage.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const FilterPage = () => {
    return (
        <>
            <Header pageName="Filter" />

            <div className={styles.filterContainer}>
                <div className={styles.line}></div>

                <div className={styles.filterSection}>
                    <h3>Sort By</h3>
                    <ul className={styles.filterlist}>
                        {["Newest Members", "Last Active", "Distance", "Popularity", "Age"].map((item) => (
                            <li key={item} className={styles.filterlistItem}>
                                {item}
                                <input type="checkbox" className={styles.filterCheckbox} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.filterSection}>
                    <h3>Filter By</h3>
                    <ul className={styles.filterlist}>
                        {["Gender", "Location", "Interests/Hobbies", "Languages Spoken", "Relationship Goals"].map(
                            (item) => (
                                <li key={item} className={styles.filterlistItem}>
                                    {item}
                                    <input type="checkbox" className={styles.filterCheckbox} />
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className={styles.filteractions}>
                    <button className={styles.cancelButton}>Cancel</button>
                    <button className={styles.applyButton}>Apply</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FilterPage;
