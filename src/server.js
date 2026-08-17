require('dotenv').config();
const bcrypt = require('bcryptjs');
const app = require('./app');
const {sequelize, User} = require('./models');

//creamos el puerto
const PORT = process.env.PORT || 3001;

//creamos el usuario admin
const seedAdmin = async () =>{

    const existing = await User.findOne({where: {email: 'admin@hjspartstruck.com'}});
    if(existing) return;

    await User.create({
        name: 'Admin HJS-PARTS-TRUCK',
        email: 'admin@hjspartstruck.com',
        passwordHash: await bcrypt.hash('admin123', 10),
        role: 'admin'
    });


};

const start = async() =>{

    try{

        //establecemos la conexion a la base de datos
        await sequelize.authenticate();
        console.log('Conexion a PostgreSQL establecida correctamente.');

        //para crear las tablas en la base datos
        await sequelize.sync();
        console.log('Modelos sincronizados con la base de datos.')
        
       //crear usuario admin
        await seedAdmin();

        //para que el app escuche el servidor
        app.listen(PORT,()=>{
            console.log(`Servidor corriendo en: http://localhost:${PORT}`);
            console.log('Admin de prueba: admin@hjspartstruck.com / admin123 ')

        });

    }catch(err){
        console.error('No se pudo conectar a la base de datos:', err.message);
        process.exit(1);

    }

};

start();