import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleAdPage() {
	const { id } = useParams();
	const [ad, setAd] = useState(null);

	useEffect(() => {

  }, []);

	return <div>SingleAdPage</div>;
}

export default SingleAdPage;
