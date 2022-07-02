let users=[
    {id:1,nombre:'nahuel',password:'nahuel'},
    {id:2,nombre:'mica',password:'mica'},
    {id:3,nombre:'leo',password:'leo'},
    {id:4,nombre:'dani',password:'dani'}
]
const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const { Sequelize,Model,DataTypes } = require('sequelize');
let sequelize=new Sequelize(process.env.URL)

if(process.env.DIAL==="mysql"){
    sequelize=new Sequelize(process.env.DB,process.env.USER,process.env.PASS,{
      dialect: 'mysql',
      dialectOptions: {}})
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
app.post('/',async(req,res)=>{
  let u=req.body
  res.send(await User.create({
    nombre:u.nombre,
    password:u.password
  }))
  
})
app.put('/users/:id',async(req,res)=>{
  let id=req.params.id
  if(isNaN(id)){res.send({})}
  else{
    let u=req.body
    res.send(await User.update({
      nombre:u.nombre,
      password:u.password
    },{where:{id:id}}))
  }
})
app.delete('/users/:id',async(req,res)=>{
  let id=req.params.id
  console.log(id)
  if(isNaN(id)){res.send({})}
  else{
    await User.destroy({where:{id:id}})
    res.send(await User.findAll({}))
  }
})
app.get('/users/auth',async(req,res)=>{
    
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})