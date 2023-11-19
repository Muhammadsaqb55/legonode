const commentData = require("../models/comment");
const { createSuccessResponse, createErrorResponse } = require("../utils/responseHelper");




exports.createComment = async (req, res) => {
    const { userId, blogId, comment_description } = req.body;
    if (!userId) {
        return res
            .status(400)
            .json({ message: "User Id Required !" })
    }
       const created_at = new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const commentResp = await commentData.create({
            userId, blogId, comment_description,created_at
        });

        if(commentResp){
            console.log(commentResp);
            res.send(createSuccessResponse(commentResp));
        }
        else {
            res.send(createErrorResponse());
        }
} 


exports.getAllComments = async (req, res) => {

    console.log(req.query);

    // let sortKey   =  req.query.sortKey;
    let sortOrder =  req.query.sortOrder;
    let order = -1;
    if(sortOrder === "asc"){
        order = 1
    }
    console.log(order);

        const commentResp = await commentData.find({
        }).sort({ created_at: order });

        if(commentResp){
            console.log(commentResp);
            res.send(createSuccessResponse(commentResp));
        }
        else {
            res.send(createErrorResponse());
        }
} 


exports.getCommentById = async (req, res) => {
    const { blogId } = req.params;

    if (!blogId) {
        return res
            .status(400)
            .json({ message: "blog Id Required !" })
    }

    const commentResp = await commentData.find({blogId:blogId
    });

    if(commentResp){
        console.log(commentResp);
        res.send(createSuccessResponse(commentResp));
    }
    else {
        res.send(createErrorResponse());
    }
} 