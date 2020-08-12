const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./database/db");
const cars = require("./routes/cars");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/cars", cars);
app.get("/user/:id",async (req,res) => {
    try
    {
       x=parseInt(req.params.id)
        const result = await db.executeQuery(`Select * from Customer where DL=${x}`);
        res.send(result.data);
    } catch(err) {
        console.log(err);
    }
});
app.get("/dd", async (req, res) => {
    try {
        const result = await db.executeQuery("SELECT * FROM Car");
        res.send(result.data);
    } catch (err) {
        console.log(err);
    }
});

app.get("/ee", async (req, res) => {
    try {
        const result = await db.executeQuery("SELECT * FROM Location");
        res.send(result.data);
    } catch (err) {
        console.log(err);
    }
});

app.get("/auth/:Userid", async (req, res) => {
    try {
       const x= req.params.Userid
       console.log(x,req.params.Userid);
        const result = await db.executeQuery(`Select password from Logininfo where emailId='${x}'`);
        res.send(result.data);
    } catch (err) {
        console.log(err);
    }
});
app.post("/auth", async (req, res) => {
    try {
        user=req.body.username
        pass=req.body.pas
        const result = await db.executeQuery(`Insert into Logininfo values('${user}','${pass}')`);
        res.send("Inserted into Logininfo")
   
    } catch (err) {
        console.log(err);
    }
});

app.post("/users", async (req, res) => {
    try {
        email=req.body.email
        fname=req. body.fname
        lname=req.body.lname
        phone=parseInt(req.body.phone)
        DL=parseInt(req.body.DL)

        const result = await db.executeQuery(`Insert into Customer values(${DL},'${fname}','${lname}',${phone},'${email}')`);
        res.send("inserted into Customer Table")
   
    } catch (err) {
        console.log(err);
    }
});

app.get("/booking/:id", async(req,res) => {
    try{
        x=parseInt(req.params.id)
        const result=await db.executeQuery(`Select * from Booking where DL=${x}`)
        res.send(result.data)
    }
    catch(er){
    console.log(er)
    }
})

app.post("/booking", async(req,res) => {
    try{
        bid=parseInt(req.body.bookingId)
        DL=parseInt(req.body.DL)
        reg=req.body.reg
        pickuploc=parseInt(req.body.pickuploc)
        dropoffloc=parseInt(req.body.dropoffloc)
        pickuptime=req.body.pickuptime
        dropofftime=req.body.dropofftime
        bookingAmount=parseInt(req.body.bookingAmount)

        const result=await db.executeQuery(`Insert into Booking values('${bid}',${DL}, '${reg}','${pickuploc}','${dropoffloc}','${pickuptime}','${dropofftime}',${bookingAmount})`);
        res.send("Inserted into Booking")
    }
    catch(er){
        console.log(er)
    }
})

app.get("/",(req,res) => {
    res.send("Im alive and well. Thanks for asking")
})

app.get("/cars", async (req,res) => {
    try{
    const result=await db.executeQuery("Select * from Car")
    
    res.send(result.data);
    }
    catch(er){
        console.log(er);
    }
})

app.post("/cars", async (req, res) => {
    try {
        reg=req.body.reg
        fuelType=req.body.fuelType
        loc=parseInt(req.body.locationId)
        typeName=req.body.typeName
        avail=parseInt(req.body.avail)
        const result = await db.executeQuery(`Insert into Car values('${reg}','${fuelType}',${loc},'${typeName}',${avail},NULL)`);
        res.send("Inserted into Cars")
   
    } catch (err) {
        console.log(err);
    }
});


/* app.("/card",async (req,res) =>{
    try{
        cardnum=parseInt(req.body.cardNumber)
        DL=parseInt(req.body.DL)
        cardType=req.body.cardType
        expiry=req.body.expiry
        cvv=parseInt(req.body.cvv)
        const result=await db.executeQuery(`Insert into CardDetails values(${cardnum},${DL}, '${cardType}', '${expiry}', ${cvv})`)
        res.send("Inserted into CardDetails")
    }
    catch(err){
        console.log(err)
    }
}) */
app.get("/card/:id",async (req,res) =>{
    try{
     DL=parseInt(req.params.id)
        const result=await db.executeQuery(`Select * from CardDetails where DL=${DL}`)
        res.send(result.data)
    }
    catch(err){
        console.log(err)
    }
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Connected to port ${port}.`);
});
// app.listen(4000)
