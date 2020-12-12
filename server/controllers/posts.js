const express = require('express');
const { mongoose } = require('mongoose');
const { findByIdAndUpdate, findById } = require('../models/postMessage');
const PostMessage = require('../models/postMessage');

exports.getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

exports.createPost = async (req, res) => {
    // const post = req.body;

    // const newPost = new PostMessage(post);
    const { title, message, selectedFile, creator, tags } = req.body;
    
    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

exports.getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    // const { title, message, creator, selectedFile, tags } = req.body;

    const post = new PostMessage ({
        _id: req.params.id,
        creator: req.body.creator,
        title: req.body.title,
        message: req.body.message,
        tags: req.body.tags,
        selectedFile: req.body.selectedFile
    })
    await PostMessage.findByIdAndUpdate(id, post, {new: true})
    .then(()=>{
        res.status(201).json(post);
    }).catch((error)=>{
        res.status(400).json({
            error: error
        });
    })

    // try {
    //     if(!mongoose.Schema.Types.ObjectId.isValid(_id)) {
    //         return res.status(404).send('No Post with that Id!');
    //     }
    
    //     const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    
    //     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    //     res.status(200).json(updatedPost);
        
    // } catch (error) {
    //     console.log(error);
    // }
}

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id)
    .then(()=> {
        res.status(200).json({message: 'Post Deleted Successfully!'});
    }).catch((error) => {
        res.status(400).json({ error: error })
    })
}

exports.likePost = async(req,res) => {
    const { id } = req.params;

    const post = await PostMessage.findById(id);
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({error: error});
    }
}
