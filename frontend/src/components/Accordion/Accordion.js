import React from "react";

function Accordion() {
	return (
		<div className="accordion mt-3" id="accordionExample">
			<div className="accordion-item">
				<h2 className="accordion-header" id="headingOne">
					<button
						className="accordion-button"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne"
					>
						You want to change your password ?
					</button>
				</h2>
				<div
					id="collapseOne"
					className="accordion-collapse collapse"
					aria-labelledby="headingOne"
					data-bs-parent="#accordionExample"
				>
					<div className="accordion-body">
						<label>Old password</label>
						<input type="password" />
						<label>New password</label>
						<input type="password" />
						<button className="btn btn-primary w-100 mt-3">
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Accordion;
