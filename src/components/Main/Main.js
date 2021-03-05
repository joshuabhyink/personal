import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTrip } from "../../redux/tripReducer";

const Main = (props) => {
  const [trips, setTrips] = useState([]);
  const [date, setDate] = useState("");
  const [milesTraveled, setMiles] = useState("");
  const [outsideTemp, setTemp] = useState("");
  let [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/trips")
      .then((res) => {
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

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const editTrip = (trip_id) => {
    const body = { date, milesTraveled, outsideTemp };
    axios.put(`/api/trip/${trip_id}`, body).then((res) => {
      props.setTrip(res.data);
      setDate(res.data.date);
      setMiles(res.data.miles_traveled);
      setTemp(res.data.outside_temp);
      setTrips(res.data);
    });
  };

  return (
    <div>
      {trips.map((trip) => {
        {
          isEditing === true ? (
            <div>
              <input
                placeholder="Date..."
                value={trip.date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                placeholder="# of Miles..."
                value={trip.miles_traveled}
                onChange={(e) => setMiles(e.target.value)}
              />
              <input
                placeholder="Outside Temp..."
                value={trip.outside_temp}
                onChange={(e) => setTemp(e.target.value)}
              />
              <button
                onClick={() => {
                  editTrip(trip.trip_id);
                  setIsEditing(false);
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              <div>
                <div>
                  Date: {trip.date}
                  <br />
                  # of Miles: {trip.miles_traveled}
                  <br />
                  Temperature Outside: {trip.outside_temp}
                  <button onClick={toggleIsEditing}>Edit</button>
                  <button
                    onClick={() => {
                      removeTrip(trip.trip_id);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>

              <button onClick={logout}>Logout</button>
              <button onClick={() => props.history.push("/trips")}>
                <h1>+</h1>
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

const mapStateToProps = (store) => store.tripReducer;

export default connect(mapStateToProps, { setTrip })(Main);
