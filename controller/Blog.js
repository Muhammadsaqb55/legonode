const blogData = require("../models/blog");
const { createSuccessResponse, createErrorResponse } = require("../utils/responseHelper");


exports.createBlog = async (req, res) => {
    const { userId, userName, title, description,image,categoryId,categoryName } = req.body;
    if (!userId) {
        return res
            .status(400)
            .json({ message: "User Id Required !" })
    }
       const created_at = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
       const updated_at = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const blogResp = await blogData.create({
            userId, userName, title, description,categoryId,categoryName,image,created_at,updated_at
        });

        if(blogResp){
            console.log(blogResp);
            res.send(createSuccessResponse(blogResp));
        }
        else {
            res.send(createErrorResponse());
        }
} 

exports.updateBlog = async (req, res) => {
    const { userId, userName, title, description,categoryId,categoryName,created_at,image } = req.body;
    if (!userId) {
        return res
            .status(400)
            .json({ message: "User Id Required !" })
    }
       const updated_at = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const blogResp = await blogData.updateOne({
            userId, userName, title, description,image,categoryId,categoryName,created_at,updated_at
        });

        if(blogResp.acknowledged){
            console.log(blogResp);
            res.send(createSuccessResponse(req.body));
        }
        else {
            res.send(createErrorResponse());
        }
} 

exports.getAllBlogs = async (req, res) => {

    console.log(req.query);
    let blogResp;

    // let sortKey   =  req.query.sortKey;
    let sortOrder =  req.query.sortOrder;
    let order = -1;
    if(sortOrder === "asc"){
        order = 1
    }
    console.log(order);
        if(req?.query?.categoryId){
            blogResp = await blogData.find({categoryId:req.query.categoryId})
        }
        else{
        blogResp = await blogData.find({
        }).sort({ created_at: order });
    }
        if(blogResp){
            console.log(blogResp);
            res.send(createSuccessResponse(blogResp));
        }
        else {
            res.send(createErrorResponse());
        }
} 


exports.getBlogById = async (req, res) => {
    const { blogId } = req.params;

    if (!blogId) {
        return res
            .status(400)
            .json({ message: "blog Id Required !" })
    }

    const blogResp = await blogData.findById({_id:blogId
    });

    if(blogResp){
        console.log(blogResp);
        res.send(createSuccessResponse(blogResp));
    }
    else {
        res.send(createErrorResponse());
    }
} 

exports.getBlogByTitle = async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res
            .status(400)
            .json({ message: "ttile Required !" })
    }

    const regex = new RegExp(title, "i"); // "i" flag for case-insensitive search
    const blogResp = await blogData.find({ title: { $regex: regex } });


    if(blogResp){
        console.log(blogResp);
        res.send(createSuccessResponse(blogResp));
    }
    else {
        res.send(createErrorResponse());
    }
} 


exports.deleteBlogById = async (req, res) => {
    const { blogId } = req.params;
    if (!blogId) {
        return res
            .status(400)
            .json({ message: "blog Id Required !" })
    }
    const blogResp = await blogData.deleteOne({_id:blogId
    });

    if(blogResp){
        console.log(blogResp);
        res.send(createSuccessResponse(blogResp));
    }
    else {
        res.send(createErrorResponse());
    }
} 