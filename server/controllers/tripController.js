module.exports = {
    getOilMiles: (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        db.oil_db.select_all(userId).then(([oil]) => {
            res.status(200).send(oil)
        })
    },
    readTrips: (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        db.trip_db.select_all_trips(userId).then(trips => {
            console.log(trips)
            res.status(200).send({trips})
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
        const {userId} = req.session.user
        db.trip_db.add_trip(userId, date, milesTraveled, outsideTemp).then(trips => {
            console.log(trips)
            // db.oil_db.update_oil(userId, milesTraveled).then(([oil]) => {
                res.status(200).send({trips})
            // })
        })
    },
    addOilMiles: async (req, res) => {
        const db = req.app.get('db')
        const {oilMiles} = req.body
        const {userId} = req.session.user
        const [currentOil] = await db.oil_db.select_all(userId)
        if(currentOil){
            const [oil] = await db.oil_db.edit_miles(userId, oilMiles)
            return res.status(200).send(oil)
        }
        db.oil_db.add_oil_miles(oilMiles, userId).then(([oil]) => {
            res.status(200).send(oil)
        })
    },
    // check to see # of entries. if # = 0, subtract milesTraveled from oil_miles. if # > 0, other query; set oil_miles = previous_oil_miles, add previous_miles_traveled 
    updateTrip: (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        const {date, milesTraveled: miles_traveled, outsideTemp: outside_temp} = req.body
        const {id} = req.params
        // const {userId} = req.session.user
        console.log(miles_traveled)
        db.trip_db.edit_trip(id, date, miles_traveled, outside_temp).then(trip => {
            console.log(trip)
                res.sendStatus(200)
        })
    },
    updateOilMiles: (req, res) => {
        const db = req.app.get('db')
        const {oilMiles, milesTraveled, entryId} = req.body
        const {userId} = req.session.user
        db.oil_db.select_entry_id(entryId).then(entry => {
            if(entry.entryId > 1){
                
            }
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