module.exports = {
    createTrip: (req, res) => {
        const db = req.app.get('db')
        const {date, miles_traveled, outside_temp} = req.body
        db.trip_db.add_trip(date, miles_traveled, outside_temp).then(trips => {
            res.status(200).send(trips)
        })
    },
    readTrips: (req, res) => {
        const db = req.app.get('db')
        db.trip_db.select_all_trips().then(trips => {
            res.status(200).send(trips)
        })
    },
    readTrip: (req, res) => {
        const db = req.app.get('db')
        const {trip_id} = req.params
        db.trip_db.select_trip_by_id(trip_id).then(trip => {
            res.status(200).send(trip)
        })
    },
    updateTrip: (req, res) => {
        const db = req.app.get('db')
        const {date, miles_traveled, outside_temp} = req.body
        const {trip_id} = req.params
        db.trip_db.edit_trip(trip_id, date, miles_traveled, outside_temp).then(trip => {
            res.status(200).send(trip)
        })
    },
    deleteTrip: (req, res) => {
        const db = req.app.get('db')
        const {trip_id} = req.params
        db.trip_db.delete_trip(trip_id).then(trips => {
            res.status(200).send(trips)
        })
    }
}