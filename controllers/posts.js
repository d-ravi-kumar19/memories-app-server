import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find(); // returns all posts from db 
        console.log(postMessages[0].title); //log to print first post title
        console.log(`Posts fetched successfully at ${new Date().toLocaleString()}`);

        res.status(200).json({ postMessages }); 
    } catch (error) {
        console.error(`Error fetching posts at ${new Date().toLocaleString()}: ${error.message}`);
        res.status(404).json({ message: error.message });
    }
};



export const createPost = async (req, res) => {
    const post = req.body;  // body contains {creator, title, meassage, tags, selectedFile} from frontend
    const newPost = new PostMessage(post);  // db post instance created with post inputs
    try {
        // save the newpost in db
        await newPost.save();
        console.log(`New post created successfully at ${new Date().toLocaleString()}`);
        res.status(201).json(newPost);
    } catch (error) {
        console.error(`Error creating post at ${new Date().toLocaleString()}: ${error.message}`);
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const {id: _id}= req.params; // get from req url (/posts/:id)
    // post will receive from request
    const post = req.body;
    
   if(!mongoose.Types.ObjectId.isValid(_id)) // check if id not valid 
    res.status(404).send(`Oops! Post not found with ${_id}`)

    // updates in the db
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post, _id}, { new : true})
    res.json(updatedPost)
};
