import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setTrip } from "../../redux/tripReducer";

const EditTrip = (props) => {
  const [date, setDate] = useState("");
  const [milesTraveled, setMiles] = useState("");
  const [outsideTemp, setTemp] = useState("");

  useEffect(() => {
    setDate(props.location.state.date)
    setMiles(props.location.state.miles_traveled)
    setTemp(props.location.state.outside_temp)
  }, [])

  const editTrip = () => {
    const body = { date, milesTraveled, outsideTemp };
    axios.put(`/api/trip/${props.match.params.trip_id}`, body).then(() => {
        props.history.push('/main')
    //   props.setTrip(res.data);
    //   setDate(res.data.date);
    //   setMiles(res.data.miles_traveled);
    //   setTemp(res.data.outside_temp);
    //   setTrips(res.data);
    });
  };

// console.log(date)

  return (
    <div>
      <input
        placeholder="Date..."
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        placeholder="# of Miles..."
        value={milesTraveled}
        onChange={(e) => setMiles(e.target.value)}
      />
      <input
      placeholder='Outside Temperature...'
      value={outsideTemp}
      onChange={(e) => setTemp(e.target.value)}/>
      <button onClick={() => editTrip()}>Submit!</button>
      <button onClick={() => props.history.push('/main')}>Go Back</button>
    </div>
  );
};

const mapStateToProps = (store) => {
  return store.tripReducer;
};

export default connect(mapStateToProps, { setTrip })(EditTrip);
