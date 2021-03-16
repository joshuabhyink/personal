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
    console.log(body)
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
      <div className='edittitle'>
        <h2>Oops! Edit your trip here...</h2>
        <button className='editgoback' onClick={() => props.history.push('/main')}>Go Back</button>
      </div>
      <div className='editbody'>
        <input
          className='editdate'
          placeholder="Date..."
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className='editmiles'
          placeholder="# of Miles..."
          value={milesTraveled}
          onChange={(e) => setMiles(e.target.value)}
        />
        <input
        className='edittemp'
        placeholder='Outside Temperature...'
        value={outsideTemp}
        onChange={(e) => setTemp(e.target.value)}/>
      </div>
      <div className='editsubmit'>
        <button className='editsubmitbtn' onClick={() => editTrip()}>Submit!</button>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return store.tripReducer;
};

export default connect(mapStateToProps, { setTrip })(EditTrip);
