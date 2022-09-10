import React, { useState, useEffect } from "react";
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
			<div className="current-image">
				<div className="">
					<img
						className="img-fluid d-block mx-auto"
						src={`http://localhost:4000/uploads/images/${images[currentImage]}`}
						alt="ad title"
					/>
				</div>
			</div>
			<div className="other-images d-flex justify-content-start">
				{images.map((image, index) => {
					return (
						<div
							className={`d-inline w-25 mx-1 px-2 small-img-container ${
								currentImage === index ? "current" : ""
							}`}
							onClick={() => {
								onHandleCurrentImage(index);
							}}
							key={index}
						>
							<img
								src={`http://localhost:4000/uploads/images/${image}`}
								alt="ad title"
								className="img-fluid w-75 d-block mx-auto"
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default ProductSlider;
