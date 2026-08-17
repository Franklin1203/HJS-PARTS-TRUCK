
//middleware personalizado para obtener la hora exacta de cada peticion
const requesTimer = (req, res, next) => {

    const ahora = new Date();
    ahora.getHours() < 10 ? "0" : '';
    ahora.getMinutes() < 10 ? "0" : '';
    ahora.getSeconds() < 10 ? "0" : '';




    res.on('finish', () => {

        console.log(`Petición realizada a las  ${ ahora.getHours()}: ${ahora.getMinutes()}: ${ ahora.getSeconds()}s`)

    })

    next();
}

module.exports = requesTimer;