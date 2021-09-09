const router = require('express').Router()
const fetch = require('node-fetch')

router.get('/', (req, res) => {
    res.render("index", {
        city: null,
        des: null,
        icon: null,
        temp: null
    })
})

router.post('/', (req, res) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&appid=" + process.env.API_KEY + "&units=metric"
    try {
        fetch(url).then(res => res.json()).then(body => {
            if (body.message === "city not found") {
                // const obj = {
                //     city: body.message,
                //     des: null,
                //     icon: null,
                //     temp: null
                // }
                res.render("index", {
                    city: body.message,
                    des: null,
                    icon: null,
                    temp: null
                })
            }
            else {
                res.render("index", {
                    city: body.name,
                    des: body.weather[0].description,
                    icon: body.weather[0].icon,
                    temp: body.main.temp
                })
            }
        })
    }
    catch (err) {
        res.render("index", {
            city: "Something went wrong!!",
            des: "Hold on. We're working on it!!!",
            icon: null,
            temp: null
        })
    }

})

module.exports = router