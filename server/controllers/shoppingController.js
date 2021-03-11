module.exports = {
    loadShoppingItems: (req, res) => {
        const db = req.app.get('db')
        db.shopping_db.select_all_items().then(items => {
            res.status(200).send(items)
        })
    },
    getCart: (req, res) => {
        const db = req.app.get('db')
        db.shopping_db.select_all_cart(req.session.user.userId).then(cart => {
            let total = cart.reduce((acc, cur) => {
                return acc + (cur.price * cur.quantity)
            }, 0)
            console.log(total)
            res.status(200).send(cart)
        })
    },
    addToCart: (req, res) => {
        const db = req.app.get('db')
        const {cart_id, id} = req.body
        db.shopping_db.add_to_cart(cart_id, id).then(item => {
            res.status(200).send(item)
        })
    },
    removeFromCart: (req, res) => {
        const db = req.app.get('db')
        const {product_id} = req.params
        db.shopping_db.delete_from_cart(product_id).then(cart => {
            res.status(200).send(cart)
        })
    }
}