const enquireyModel = require("../../models/enquirymodel");

let enquiryInsert =(req,res)=>{
    let {name,email,phone,message}=req.body;

    let enquiry = new enquireyModel
    ({
        name:name,
        email:email,
        phone:phone,
        message:message
    })
    enquiry.save().then(()=>{

        res.send({status:1, message:"Enquiry saved successfully"});

    }).catch((err)=>{
       res.send({status:0, message:" error while saving enquiry" , error:err});
    })
}

let enquiryList= async(req,res)=>{
    let enquiry = await enquireyModel.find();
    res.send({status:1, message:"List of Enquiry", data:enquiry});
}

let enquiryDelete = async (req,res) =>{
    let eqId = req.params.id;
    let enquiry = await enquireyModel.deleteOne({_id:eqId}); 
    res.send ({status:1, message:"Enquiry Deleted Successfully",enquiry});

}

let enquirysingleRow = async (req,res)=>{
    let eqId = req.params.id;
    let enquiry = await enquireyModel.findOne({_id:eqId}); 
    res.send({status:1,enquiry});
}

let enquiryUpdate = async (req,res)=>{
    let enquiryId = req.params.id;
    let {name,email,phone,message}=req.body;
    let updateObj={
        name,
        email,
        phone,
        message
    };

    let updateRes= await enquireyModel.updateOne({_id:enquiryId},updateObj)
    res.send ({status:1, message:"Enquiry Updated Successfully",updateRes});


}

module.exports={enquiryInsert,enquiryList,enquiryDelete,enquirysingleRow,enquiryUpdate}