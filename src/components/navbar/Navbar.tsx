import React from "react";
import styles from "./navbar.module.scss";

const Navbar = () => {
	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<span>Hotel Booking</span>
				<div className={styles.items}>
					<button className={styles.button}>Register</button>
					<button className={styles.button}>Login</button>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
