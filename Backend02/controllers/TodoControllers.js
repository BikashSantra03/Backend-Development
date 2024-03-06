//import the model
const express = require("express");
const Todo = require("../models/todoDB.js");

exports.createTodo = async (req, res) => {
  try {
    //extrat title and description from the request body
    const { title, description } = req.body;

    //create a new todo object and insert in DB
    const response = await Todo.create({ title, description });

    //send a response with a success flag
    res.status(200).send({
      success: true,
      data: response,
      message: "Entry created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const response = await Todo.find();
    res.status(200).send({
      success: true,
      data: response,
      message: "All entries fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};

exports.getTodoByID = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Todo.findById({ _id: id });

    if (!response) {
      res.status(404).send({
        success: false,
        message: "NO such items found",
      });
    }

    res.status(200).send({
      success: true,
      data: response,
      message: `Entry of ${id} fetched Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const response = await Todo.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        updatedAt:Date.now(),
      }
    );

    
    res.status(200).send({
      success: true,
      data: response,
      message: `Entry of ${id} updated Successfully`,
    });
  } catch (error) {

     console.log(error);
     res.status(500).send({
       success: false,
       data: "Internal Server Error",
       message: error.message,
     });
  }
};




exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Todo.findByIdAndDelete(
      { _id: id },
     
    );

    res.status(200).send({
      success: true,
      data: response,
      message: `Entry of ${id} Deleted Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};
