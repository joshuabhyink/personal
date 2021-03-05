import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTrip } from "../../redux/tripReducer";
// import EditTrip from '../EditTrip/EditTrip'
import {useHistory} from 'react-router-dom'

const Main = (props) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("/api/trips")
      .then((res) => {
        console.log(res.data);
        setTrips(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = () => {
    axios.post("/auth/logout").then((_) => {
      props.history.push("/");
    });
  };

  const removeTrip = (trip_id) => {
    axios.delete(`/api/trip/${trip_id}`).then((res) => {
      props.setTrip(res.data);
      setTrips(res.data);
    });
  };

  
  return (
    <div>
      {trips.map((trip) => {
        console.log(trip)
        return (
          <div>
              <div>
                Date: {trip.date}
                # of Miles: {trip.miles_traveled}
                <br />
                Temperature Outside: {trip.outside_temp}
                <br />
                <button onClick={() => props.history.push({
                  pathname: `/edit/${trip.trip_id}`,
                  state: trip
                })}>Edit Trip!</button>
                <button>
                  <h2 onClick={() => removeTrip()}>X</h2>
                </button>
              </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (store) => store.tripReducer;

export default connect(mapStateToProps, { setTrip })(Main);
