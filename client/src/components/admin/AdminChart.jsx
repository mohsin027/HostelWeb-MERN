import React from "react";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";

const App = () => {

// Sample data
const data = {
	labels: ["Sunday", "Monday", "Tuesday",
	"Wednesday", "Thursday", "Friday", "Saturday"],
	datasets: [
	{
		label: "Hours S",
		data: [2, 5, 6, 7, 3, 3, 4],
		backgroundColor: "#02b844",
		borderWidth: 1,
		borderColor: "#000000",
	}
	]
}

return (
	<MDBContainer>
	<Bar data={data}
		style={{ maxHeight: '600px' }}
	/>
	</MDBContainer>
);
}

export default App;
