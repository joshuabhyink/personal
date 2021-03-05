module.exports = {
    createTrip: (req, res) => {
        const db = req.app.get('db')
        const {date, milesTraveled, outsideTemp} = req.body
        db.trip_db.add_trip(date, milesTraveled, outsideTemp).then(trips => {
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
        const {id} = req.params
        db.trip_db.select_trip_by_id(id).then(trip => {
            res.status(200).send(trip)
        })
        
    },
    updateTrip: (req, res) => {
        console.log(req.params)
        const db = req.app.get('db')
        const {date, miles_traveled, outside_temp} = req.body
        const {id} = req.params
        db.trip_db.edit_trip([+id, date, +miles_traveled, +outside_temp]).then(trip => {
            res.status(200).send(trip)
        })
    },
    deleteTrip: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.trip_db.delete_trip(id).then(trips => {
            res.status(200).send(trips)
        })
    }
}