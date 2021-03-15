import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTrip } from "../../redux/tripReducer";
import './Main.css'

const Main = (props) => {
  const [trips, setTrips] = useState([]);
  const [oilArray, setOilArray] = useState(null)
  const [remainingOil, setRemainingOil] = useState('')

  useEffect(() => {
    const {setTrip} = props
    axios
      .get("/api/trips")
      .then((res) => {
        setTrips(res.data.trips);
        setTrip(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTrip]);

  useEffect(() => {
    axios
      .get("/api/oil")
      .then((res) => {
        setOilArray(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
      // console.log(props)
      // const reducer = (acc, cur) => acc + (cur.miles_traveled)
      // // const reducer = (acc, cur) => console.log(acc, cur.miles_traveled)
      // const milesTraveled = props.trip.trips?.reduce(reducer, 0)
      // setRemainingOil(milesTraveled)
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

  console.log(props.trip.trips)

  return (
    <div className='main'>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <div>
        <button onClick={() => props.history.push("/trips")}>+</button>
      </div>
      <div>
        <button onClick={() => props.history.push('/oilmiles')}>Set Your Oil Miles</button>
      </div>
      <div>
        <div>
          Miles Remaining on Oil Change: {oilArray?.oil_miles - props.trip.trips?.reduce((acc, cur) => acc + (cur.miles_traveled), 0) || oilArray?.oil_miles}
        </div>
      </div>
      {trips.map((trip) => {
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
    </div>
  );
};

const mapStateToProps = (store) => store.tripReducer;

export default connect(mapStateToProps, { setTrip })(Main);
