const express =require('express')
const  mongoose =require('mongoose')
const bodyParser =require ('body-parser')



mongoose.connect('mongodb+srv://mohammadarshid3:arsh1234@cluster0.v2xk9we.mongodb.net/?retryWrites=true&w=majority',
  {
        useNewUrlParser: true,
        useUnifiedTopology: true
     }

 
).then((res)=>{

    console.log("you are sucess")
}).catch((err)=>{
    console.log(err)
})


let office=express()
office.use(bodyParser())

const officeSchema =new mongoose.Schema({
 Name:{
    type:String,
    required :true
 },
  Email:{
    type:String,
    required :true

 },
 Place:{
    type:String,
    required:true,
 }

})

const officeModel =mongoose.model("officedata",officeSchema)


office.post("/officein", async(req,res)=>{

    try {
        console.log(req.body)
        let office = new officeModel(req.body)
        
        office.save()
        res.json({mssg:"data receive"})

    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
})


office.get("/officedata", async(req,res)=>{
try{
    let office =await officeModel.find({})
     console.log(office);
     res.json(office)

}catch(err){
    console.log(err);
        res.send(err)
}

})


office.put("/usermodel", async(req,res)=>{
  try {
    const update ={
        Name:req.body.Name,
        Email:req.body.Email,
        Place:req.body.Place
    }
  
  const office = await officeModel.findByIdAndUpdate(req.body._id, update);
  console.log(office);
  res.json(office)

}catch (err){
    res.send(err);
}
})

office.delete('/id', async(req,res)=>{
try{
    let officedelete= await officeModel.findByIdAndDelete(req.body._id);
    if(officedelete){
    res.send(officedelete)
    }
} catch(err){
    res.send(err)
}
}) 



office.listen(3000,(error)=>{
    if(!error) {
        console.log("server is connect")
    }else{
        console.log("error")
    }
})