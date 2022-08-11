import React from 'react'
import styles from './rating.module.scss'

interface starsI {
	stars: React.CSSProperties;
}

const Rating = ({ stars }: starsI) => {
	return (
		<div className={styles.stars} style={{ "--rating": stars } as React.CSSProperties} role="img"></div>
	)
}

export default Rating