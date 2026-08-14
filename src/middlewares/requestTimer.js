
const requesTimer = (req, res, next) =>{
    const start = Date.now();



    res.on('finish',()=>{

        const durationMs = Date.now() - start;
        console.log(`[timer] ${req.method} ${req.originalUrl} ${durationMs}ms`)

    })

    next();
}

module.exports = requesTimer;