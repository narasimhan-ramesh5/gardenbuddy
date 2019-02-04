import React from "react";
import sample_plants  from "./sample_plants.json";
import VirtualPlant from "../VirtualPlant";
import {Row, Col, Button } from "react-materialize";

import API from "../../utils/API";
import VirtualPlantAddModal from "../VirtualPlantAddModal/index.js";

const moment = require('moment');

/**
 * VirtualGarden react component
 */
class VirtualGarden extends React.Component {
	state = {
		my_plants : []
	}

	/**
	 * Callback to run when this component mounts.
	 * 
	 * Fetch the user's plants from the database and 
	 * update 'myPlants' in the component state.
	 */
	componentDidMount = () => {
		let dummy_id = 0;

		this.getGarden(dummy_id);
	}

	handleChange(event) {
    console.log("typing");
    this.setState({
      [event.target.name]: event.target.value
    })
  }

	/**
	 * @function: getGarden
	 * 
	 * Fetches the user's virtual garden from the backend.
	 */
	getGarden = (gardenID) => {
		/************************************************************/
		/* Call our backend API to get virtual garden plants */
		/************************************************************/
		let userName = 'narasimhan.ramesh5@gmail.com';
		API.getVirtualGarden(userName).then((res) => {

			// If the user has no virtual plants in their virtual garden yet,
			// set 'my_plants' to an empty array.
			// Else, sort the virtual garden so that the plants whose watering
			// is overdue are displayed first
			if(res.data.length === 0) {
				this.setState({my_plants : []});
			} else{
				this.sortPlants(res.data);
			}
		});
	}

	newPlantAdded = (plantDetails) => {

	}

	sortPlants = (plantList) => {
		
		let today = moment();

		/* Sort the plants so that the ones requiring attention are
			 displayed first */
		plantList.forEach((plant) => {

			let lastWateredDate = moment(plant.lastWatered);

			console.log(`${plant.name} was last watered on ${plant.lastWatered}`);

			/* Get the difference between last watered date and today */
			let daysSinceLastWatered = today.diff(lastWateredDate, 'days');

			console.log("It has been " + daysSinceLastWatered + " days"
			+ " since " + plant.name + " was watered");

			plant.daysOverdue = daysSinceLastWatered - plant.wateringFrequency;
		});

		plantList.sort( (plant1, plant2) => {
			return plant2.daysOverdue - plant1.daysOverdue
		});

		this.setState( { my_plants : plantList } );
	}

	/**
	 * @function: wateringDone
	 * This is the callback function invoked when the user marks any 
	 * virtual plant as 'watered'.
	 * 
	 */
	wateringDone = (plantName) => {
		let my_plants_updated = this.state.my_plants;

		//event.preventDefault();

		console.log(plantName);

		console.log("User has watered " + plantName);

		let index = my_plants_updated.findIndex(plant => plant.name === plantName);

		my_plants_updated[index].lastWatered = moment().format("YYYY-MM-DD");

		// Todo: Make API Call to back-end
		// API.put()
		window.Materialize.toast(`${plantName} has been watered`, 1000, 'watered-success-toast', () => this.sortPlants(my_plants_updated));

		//this.sortPlants(my_plants_updated);
	}

	/**
   * @function: render
   * 
   * Render function for this App.
   */
  render() {
		console.log("Rendering virtual garden");
		let num_plants = this.state.my_plants.length;
		if(!num_plants){
			return(
				<div>
					<h5>Get started with your virtual garden!</h5>
					<VirtualPlantAddModal 
						handleAdd={this.newPlantAdded}
					>
					</VirtualPlantAddModal>
				</div>
			);
		} else {
			return (
				<div>
					<Row>
						{this.state.my_plants.map( (plant, index) => (
							<Col s={12} m={10} l={4} className="offset-m1">
								<VirtualPlant
									key={index.toString()}
									plantImage={plant.image}
									plantName={plant.name}
									lastWatered={plant.lastWatered}
									daysOverdue={plant.daysOverdue}
									wateringFrequency={plant.wateringFrequency}
									virtualGardenCallback={this.wateringDone}
								/>
							</Col>
						))}
					</Row>
					<VirtualPlantAddModal 
						handleAdd={this.newPlantAdded}
					>
					</VirtualPlantAddModal>
				</div>
			);
		}
  }
}

export default VirtualGarden;
