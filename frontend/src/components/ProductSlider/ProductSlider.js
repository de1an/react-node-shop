import React, { useState, useEffect } from "react";
import { imageRoute } from "../../utilities/configUrl";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import "./productSlider.scss";

function ProductSlider({ images }) {
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		onHandleCurrentImage();
	}, [currentImage]);

	const onHandleCurrentImage = (index) => {
		if(index === undefined) return;
		if (index || index === 0) {
			setCurrentImage(index);
		}
	};

	return (
		<>
			<div className="current-image mb-3">
					<img
						className="img-fluid d-block mx-auto"
						src={`${imageRoute}${images[currentImage]}`}
						alt="ad title"
					/>
			</div>
			<div className="product-swiper">
				<Swiper
					modules={[Navigation]}
					navigation
					spaceBetween={5}
					slidesPerView={3}
				>
					{images.map((item, index) => {
						return (
							<SwiperSlide key={index} onClick={() => onHandleCurrentImage(index)}>
								<img alt="title" src={`${imageRoute}${item}`}/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</>
	);
}

export default ProductSlider;
