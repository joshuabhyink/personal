import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTrip } from "../../redux/tripReducer";
import { setOil } from "../../redux/oilReducer";

const Main = (props) => {
  const [trips, setTrips] = useState([]);
  const [oilArray, setOilArray] = useState([]);

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

  useEffect(() => {
    axios
      .get("/api/oil")
      .then((res) => {
        console.log(res.data);
        setOil(res.data);
        setOilArray(res.data);
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

  const removeTrip = (userId) => {
    axios.delete(`/api/trip/${userId}`).then((res) => {
      props.setTrip(res.data);
      setTrips(res.data);
    });
  };

  const setOilMiles = () => {
    axios.post('/api/add-oil').then(res => {
      trips.map(trip => {

      })
      props.setOil(res.data)
      setOil(res.data)
    })
  }

  return (
    <div>
      <div>
        <button onClick={() => props.history.push("/trips")}>+</button>
      </div>
      {trips.map((trip) => {
        console.log(trip);
        return (
          <div>
            <div>
              Date: {trip.date}
              <br /># of Miles: {trip.miles_traveled}
              <br />
              Temperature Outside: {trip.outside_temp}
              <br />
              <button
                onClick={() =>
                  props.history.push({
                    pathname: `/edit/${trip.trip_id}`,
                    state: trip,
                  })
                }
              >
                Edit Trip!
              </button>
              <button>
                <h2 onClick={() => removeTrip(trip.trip_id)}>X</h2>
              </button>
            </div>
          </div>
        );
      })}
      <div>
        {/* <input
        placeholder='Oil Miles...'
        value={oilArray}
        onChange={(e) => setOilArray(e.target.value)}/> */}
        {/* <button onClick={}>Enter</button> */}
      </div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => store.tripReducer;

export default connect(mapStateToProps, { setTrip })(Main);
