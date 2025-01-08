const SUNDAY = 6
const SATURDAY = 5

const dayMiddleware = (req, res, next) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay()
    
    if(dayOfWeek == SATURDAY || dayOfWeek == SUNDAY){
        res.status(401).json({
            message: "Our api works in util week days. Sorry!"
        })

        return
    }

    next()
}

module.exports = {
    dayMiddleware
}