const express= require('express');
const postModel= require('../Model/postModel')
const path= require('path')

const router= express.Router();
const cors= require('cors')
const fileUpload= require('express-fileupload')

router.use(express.json())
router.use(cors())
router.use(fileUpload())

router.get('/posts', async (req, res)=>{
    try {
        const Post= await postModel.find().sort({createdAt:'desc'})
        return res.status(200).json({
            status:'success',
            result: Post
        })
        
    } catch (error) {
        return res.status(400).json({
            status:'Fail',
            message: error.message
        })
    }
})

router.post('/posts', async (req, res)=>{
    try {
        // const Post= await postModel.create(req.body);
        // console.log(req.body, req.files.image.name)
        // console.log(path.join(__dirname,'..','/Images'))
        const imageFile= req.files.image
        const imagePath= path.join(__dirname,'..','/Images/')
        
        imageFile.mv(imagePath+imageFile.name, async (err)=>{
            if(err){
                return res.status(400).json({
                    status:'Fail',
                    message:err.message
                })
            }
            const {author, location, description}= req.body
            const image= imageFile.name
            const Post= await postModel.create({
                author,location,description,image
            })
            return res.status(200).json({
                status:'Success',
                result: Post
            })
        })
        
    } catch (error) {
        return res.status(400).json({
            status:"Fail",
            message:error.message
        })
    }
})

router.get('/images/:img', (req, res)=>{
    res.sendFile(path.join(__dirname,'..',`/Images/${req.params.img}`))
})

module.exports= router