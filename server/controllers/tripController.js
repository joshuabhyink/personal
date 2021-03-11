module.exports = {
    getOilMiles: (req, res) => {
        const db = req.app.get('db')
        db.oil_db.select_all().then(oil => {
            res.status(200).send(oil)
        })
    },
    readTrips: (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        db.trip_db.select_all_trips().then(trips => {
            db.oil_db.add_oil_miles(userId).then(([oil]) => {
                console.log(milesLeft)
                res.status(200).send({trips, oil})
            })
        })
    },
    readTrip: (req, res) => {
        const db = req.app.get('db')
        const {id: trip_id} = req.params
        db.trip_db.select_trip_by_id(trip_id).then(trip => {
            res.status(200).send(trip)
        })
        
    },
    createTrip: (req, res) => {
        const db = req.app.get('db')
        const {date, milesTraveled, outsideTemp} = req.body
        const {id} = req.params
        db.trip_db.add_trip(id, date, milesTraveled, outsideTemp).then(trips => {
            db.oil_db.update_oil(miles_traveled).then(([oil]) => {
                res.status(200).send({trips, oil})
            })
        })
    },
    addOilMiles: (req, res) => {
        const db = req.app.get('db')
        const {oilMiles} = req.body
        db.oil_db.add_oil_miles(oilMiles).then(oil => {
            res.status(200).send(oil)
        })
    },
    updateTrip: (req, res) => {
        const db = req.app.get('db')
        const {date, milesTraveled: miles_traveled, outsideTemp: outside_temp} = req.body
        const {id} = req.params
        db.trip_db.edit_trip([+id, date, +miles_traveled, +outside_temp]).then(trip => {
            res.status(200).send(trip)
        })
    },
    updateOilMiles: (req, res) => {
        const db = req.app.get('db')
        const {oilMiles} = req.body
        const {id} = req.params
        db.oil_db.update_oil(id, oilMiles).then(oil => {
            res.status(200).send(oil)
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