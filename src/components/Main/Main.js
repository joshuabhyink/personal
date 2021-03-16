import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTrip } from "../../redux/tripReducer";
import "./Main.css";

const Main = (props) => {
  const [trips, setTrips] = useState([]);
  const [oilArray, setOilArray] = useState(null);
  const [remainingOil, setRemainingOil] = useState("");

  useEffect(() => {
    const { setTrip } = props;
    axios
      .get("/api/trips")
      .then((res) => {
        setTrips(res.data.trips);
        setTrip(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTrip]);

  useEffect(() => {
    axios
      .get("/api/oil")
      .then((res) => {
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

  console.log(props.trip.trips);

  return (
    <div>
      <div className="main">
        <div>
          <button
            className="oilmilesbtn"
            onClick={() => props.history.push("/oilmiles")}
          >
            Set Your Oil Miles!
          </button>
        </div>
        <h2>Your Trips!</h2>
        <br />
        <div>
          <button className="logoutbtn" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
      <button className="addbtn" onClick={() => props.history.push("/trips")}>
        Add A Trip!
      </button>
      <br />
      <br />
      <h3 className="milesremaining">
        Miles Remaining on Oil Change:{" "}
        {oilArray?.oil_miles -
          props.trip.trips?.reduce((acc, cur) => acc + cur.miles_traveled, 0) ||
          oilArray?.oil_miles}
      </h3>
      {trips.map((trip) => {
        return (
        <div>
          <div className="trips">
            <h3 className="date">Date: {trip.date}</h3>
            <h3 className="miles"># of Miles: {trip.miles_traveled}</h3>
            <h3 className="temp">Temperature Outside: {trip.outside_temp}</h3>
          </div>
          <div className='buttons'>
            <button
              className="edittrip"
              onClick={() =>
                props.history.push({
                  pathname: `/edit/${trip.trip_id}`,
                  state: trip,
                })
              }
            >
              Edit Trip!
            </button>{" "}
            <button
              className="deletetrip"
              onClick={() => removeTrip(trip.trip_id)}
            >
              Delete Trip!
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
