import axios from "axios";
import Swal from 'sweetalert2';

export default {
  // Gets all plants
  getPlants: function() {
    return axios.get("/api/plants");
  },
  // Gets the plant with the given id
  getAPlant: function(id) {
    // console.log("The id passed in is " + id);
    return axios.get("/api/plants/" + id);
  },
  // Gets the plants with the given category
  getCategory: function(category) {
    return axios.get("/api/plants/category/" + category);
  },
  // Deletes the plant with the given id
  deletePlant: function(id) {
    return axios.delete("/api/plants/" + id);
  },
  // Saves a plant to the database
  savePlant: function(plantData) {
    return axios.post("/api/plants", plantData);
  },

  // Gets the recommended plants by zip code and category
  // This corresponds to the basic search by zip code operation.
  searchPlants: function(inputCategory, inputZipcode){
    return axios.get("/api/plants/search/", {
        params : {
          category: inputCategory,
          zipcode : inputZipcode
        }
      });
  },

  // Gets the growing calendar for a given plant
  getGrowCal: function(commonName, zone) {
    console.log ("API here!" + commonName);
    console.log ("API here!" + zone);
//    return axios.get("/api/plants/getgrowingcalendar/");
    return axios.get("/api/plants/getgrowingcalendar", {
      params: {
        commonName: commonName,
        zone: zone
      }
    });
  },

  //
  // User Profile specific API routes 
  //

  // User's Virtual Garden
  getVirtualGarden : function(userID) {
    return axios.get("/api/profile/virtualgarden/" + userID)
  },

  // Add plant to virtual garden
  addPlant : function(userID, newPlant) {
    console.log("here is the plant info", newPlant);
    Swal.fire({
      title: 'Adding to garden, please wait',
      type: 'info',
      showConfirmButton: false,
      showCancelButton: false,
      backdrop: true,
    })
    return axios.post("/api/profile/virtualgarden/" + userID, newPlant,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  },

  editPlant: function(userID, id, plantData) {
    console.log("user id is ", userID);
    console.log("plant id is ", id);
    console.log("plant data is ", plantData);
    return axios.put("/api/profile/virtualgarden/user/" + userID + "/" + id, plantData);
  },

  updateWatering: function(plantId, wateredData) {
    console.log("API received id: ", plantId);
    console.log("API received data: ", wateredData);
    return axios.put("/api/profile/virtualgarden/virtualplant/" + plantId, wateredData);
  }

};
