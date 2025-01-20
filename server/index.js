let express = require("express");
let cors = require("cors");
let app = express();
require("dotenv").config();

let mongoose = require("mongoose");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");

app.use(express.json());
app.use(cors());


//Routes
app.use("/api/website/enquiry",enquiryRouter)



//Connect to MongoDB

mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is running");                                   //http://localhost:8020/api/website/enquiry
    })
}).catch((err) => {
    console.log(err);
});

