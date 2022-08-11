import React, { useContext } from "react";
import styles from "./hotel.module.scss";
import SimpleImageSlider from "react-simple-image-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faChildDress } from "@fortawesome/free-solid-svg-icons";
import Rating from "../rating/Rating";
import FilterContext from "../../contexts/FilterContext";

type hotelI = {
	starRating: number
	rooms: []
	occupancy: occupancy
}

type occupancy = {
	maxAdults: number;
	maxChildren: number;
}

const Hotel = ({ data }: { data: Array<hotelI> }) => {

	const { filters } = useContext(FilterContext)

	const filterHotel = (data: Array<hotelI>) => {
		//If hotel matches filters, add it to filteredHotels array and return it
		const filteredHotels: any[] = [];
		for (let i = 0; i < data.length; i++) {
			if (
				data[i]['starRating'] >= filters['minRating']
				&& data[i]['rooms'].some((room: hotelI) => filters.adults <= room['occupancy']['maxAdults'])
				&& data[i]['rooms'].some((room: hotelI) => filters.children <= room['occupancy']['maxChildren'])
			) { filteredHotels.push(data[i]) };
		}
		return filteredHotels;
	}

	const filterRoom = (data: Array<hotelI>) => {
		//If room matches filters, add it to filteredRooms array and return it
		const filteredRooms: any[] = [];
		for (let i = 0; i < data.length; i++) {
			if (
				data[i]['occupancy']['maxAdults'] >= filters['adults']
				&& data[i]['occupancy']['maxChildren'] >= filters['children']
			) { filteredRooms.push(data[i]) };
		}
		return filteredRooms;
	}

	return (
		<>{
			filterHotel(data).length ?
				filterHotel(data).map((hotel) => (

					<div key={hotel['id']} className={styles.card}>
						<div className={styles.hotel}>

							{/* Hotel header */}
							<div className={styles.header}>
								<div className={styles.sliderWrapper}>
									<SimpleImageSlider width={160} height={100} images={hotel['images']} showBullets={false} showNavs={true} navMargin={0} />
								</div>
								<div className={styles.bodyWrapper}>
									<div className={styles.body}>
									<h2>{hotel['name']}</h2>
									<h4>{hotel['address2'] ? hotel['address1'] + ",  " + hotel['address2'] : hotel['address1']}</h4>
									<h3>{hotel['town']}</h3>
								</div>
									<div className={styles.rating}>
										<Rating stars={hotel['starRating']} />
									</div>
								</div>
							</div>

							{/* Nested rooms */}
							{filterRoom(hotel['rooms']).map((room, index) => (
								<div key={room['id']} className={styles.room}>
									<div className={styles.summary}>
										<h5>{room['name']}</h5>
										<h6 className={styles.occupancy}><FontAwesomeIcon icon={faPerson} />{room['occupancy']['maxAdults']} adults</h6>
										<h6 className={styles.occupancy}><FontAwesomeIcon icon={faChildDress} />{room['occupancy']['maxChildren']} children</h6>
									</div>
									<div className={styles.details}>
										<p>Our {room['name']} guestrooms are elegantly furnished with handmade furniture include luxury en-suite facilities with complimentary amenities pack, flat screen LCD TV, tea/coffee making facilities, fan, hairdryer and the finest pure white linen and towels.</p>
									</div>
								</div>
							))}
						</div>
					</div>
				))
				: <div className="notice"><p>No results match your filters. Please adjust and try again.</p></div>
		}</>
	)

}

export default Hotel;
