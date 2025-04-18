import express from 'express';
import Rating from './ratingmodel.js';

const router = express.Router();

router.get("/get-ratings", async (req, res) => {
    console.log("GET /api/get-ratings hit");
    try {
        // Get 2 random documents using MongoDB aggregation
        const rating = await Rating.aggregate([{ $sample: { size: 2 } }]);
        // console.log("Fetched ratings:", rating);
        res.json(rating);
    } catch (err) {
        console.error("Error fetching ratings:", err);
        res.status(500).json({ message: "Error fetching ratings", error: err.message });
    }
});
router.get("/get",async (req,res)=>{
try{
    const rating=await Rating.find({Rating : {$gt : 420 }})
    res.json(rating)
}
catch(error){
    console.error("Error fetching ratings:", error);
}
})
router.post("/update-rating",async (req,res)=>{
    console.log(req.body)
    const image=req.body.selectedImage
    const rating = Math.round(Number(req.body.newRating));
    const id=await Rating.findOne({Filename:image})
    if(!id){
        return res.status(404).json({msg:"No thing founf"})
    }
    id.Rating=rating 
    id.save()
    res.json({msg:"Rating is saved"})
})

router.get("/all-rating", async (req, res) => {
    try {
        const ratings = await Rating.find().sort({ Rating: -1 }); // ensure 'rating' matches your schema
        res.status(200).json({rating:ratings});
    } catch (error) {
        console.error("Error fetching ratings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
