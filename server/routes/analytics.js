const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { format } = require("path");

// Create a note
router.post("/add-note",async (req,res)=>{
    try {
        const note = new Note(req.body);
        const SaveNote = await note.save();

        res.status(201).json(SaveNote);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Notes created per category
router.get("/notes-per-category", async (req,res)=>{
    try {
        const result = await Note.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalNotes: {$sum: 1},
                    notes: {
                        $push: {
                            title: "$title",
                            content: "$content",
                            user: "$user",
                            createdAt: "$createdAt"
                        }
                    }
                }
            },
            {
                $project :{
                    category: "$_id",
                    totalNotes:1,
                    notes: 1,
                    _id: 0
                }
            }
        ]);

        res.json(result);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// Notes created per month
router.get("/notes-per-month", async (req,res)=>{
    try {
        const result = await Note.aggregate([
            {
                $group:{
                    _id: {
                        $dateToString: {format: "%b", date: "$createdAt"}
                    },
                    totalNotes: {$sum : 1} 
                }
            },
            {
                $project:{
                    month: "$_id",
                    totalNotes: 1,
                    _id: 0
                }
            },
            {
                $sort: { month: 1 }
            }
        ]);

        res.json(result);

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// Analytics by user
router.get("/user/:userId", async (req,res)=>{
    try {
        const result = await Note.aggregate([
            {
                $match: { user: req.params.userId}
            },
            {
                $group: {
                    _id: "$category",
                    total: {$sum: 1}
                }
            },
            {
                $project: {
                    category: "$_id",
                    total: 1,
                    _id: 0
                }
            },
        ]);

        res.json(result);

    } catch (error) {
        res.status.json({error: error.message});
    }
});

// Analytics with date range
router.get("/date-range", async (req,res)=>{
    try {
        const {startDate, endDate} = req.query;
        const result = await Note.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                category: "$_id",
                count: 1,
                _id: 0
                }
            }

        ]);

        res.json(result);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;