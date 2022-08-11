import React from "react";
import { useEffect, useState } from "react";
import Hotel from "../hotel/Hotel";
import styles from "./hotelList.module.scss";

const HotelList = () => {
	const [hotels, setHotels] = useState<Array<any> | null>(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`)
			.then((res) => {
				return res.json();
			})
			.then((hotelData) => {
				const hotels = hotelData

				//Wait for all room api requests to return
				Promise.all(hotels.map((hotel: { id: string; }) => fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotel.id}`)))
					.then(resp => Promise.all(resp.map(r => r.json())))
					.then((rooms) => {

						//For each hotel, add a rooms object to it
						const hotelGroup = rooms.map((room, i) => {
							const hotel = Object.assign(hotels[i], { rooms: room.rooms })
							return hotel
						});

						setHotels(hotelGroup)
					});

				setLoading(false)
			});
	}, []);

	if (isLoading) {
		return <div className="notice"><p>Loading</p></div>;
	}
	return <div className={styles.hotelList}>{hotels && <Hotel data={hotels} />}</div>;
}

export default HotelList;
