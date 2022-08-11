import React from "react";
import styles from "./header.module.scss";
import Filter from "../filter/Filter";

const Header = () => {
	return (
		<div className={styles.header}>
			<Filter />
		</div>
	);
}

export default Header;
