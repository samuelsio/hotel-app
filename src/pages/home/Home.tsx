import React from 'react'
import Header from '../../components/header/Header'
import HotelList from '../../components/hotelList/HotelList'
import Navbar from '../../components/navbar/Navbar'
import { FilterProvider } from '../../contexts/FilterContext'
import "../../global.scss";

const Home = () => {
	return (
		<div>
			<Navbar />
			<FilterProvider>
				<Header />
				<HotelList />
			</FilterProvider>
		</div>
	)
}

export default Home