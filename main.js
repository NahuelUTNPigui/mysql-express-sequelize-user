let users=[
    {id:1,nombre:'nahuel',password:'nahuel'},
    {id:2,nombre:'mica',password:'mica'},
    {id:3,nombre:'leo',password:'leo'},
    {id:4,nombre:'dani',password:'dani'}
]
const express = require('express')
require('dotenv').config()
const app = express()
const { Sequelize,Model,DataTypes } = require('sequelize');
let sequelize=new Sequelize(process.env.URL)

if(process.env.DIAL==="mysql"){
    sequelize=new Sequelize("")
}
const port = process.env.PORT
///La parte de bd
class User extends Model {}
User.init({
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User' ,
    freezeTableName: true
});

sequelize.sync().then(()=>{
    console.log('todo ok');

    users.forEach(u=>{
        User.create({
            nombre:u.nombre,
            password:u.password
        })
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/users',async(req,res)=>{
    res.send(await User.findAll({}))
})
app.get('/users/auth',async(req,res)=>{
    
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})