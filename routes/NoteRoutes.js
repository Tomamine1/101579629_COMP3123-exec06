const express = require('express');
const mongoose = require('mongoose');
const noteModel = require('../models/NotesModel.js');

const noteRoutes = express.Router();

// Create a new Note
noteRoutes.post('/notes', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    }

    try {
        const note = new noteModel({ content: req.body.content });
        const savedNote = await note.save();
        return res.status(201).send(savedNote);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

// Retrieve all Notes
noteRoutes.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();
        return res.status(200).send(notes);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

// Retrieve a single Note
noteRoutes.get('/notes/:noteId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.noteId)) {
        return res.status(400).send({ message: 'Invalid note ID' });
    }

    try {
        const note = await noteModel.findById(req.params.noteId);

        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }

        return res.status(200).send(note);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

// Update a Note
noteRoutes.put('/notes/:noteId', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: 'Note content can not be empty'
        });
    }

    if (!mongoose.isValidObjectId(req.params.noteId)) {
        return res.status(400).send({ message: 'Invalid note ID' });
    }

    try {
        const note = await noteModel.findByIdAndUpdate(
            req.params.noteId,
            { content: req.body.content },
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }

        return res.status(200).send(note);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

// Delete a Note
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.noteId)) {
        return res.status(400).send({ message: 'Invalid note ID' });
    }

    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId);

        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }

        return res.status(200).send({
            message: 'Note deleted successfully'
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

module.exports = noteRoutes;
