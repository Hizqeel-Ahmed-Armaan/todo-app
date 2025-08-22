import express from 'express';  
import Todo from '../models/models.js';

const router = express.Router();

// Get all todos
router.get('/', async (req,res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

//Add a todo 
router.post('/', async (req,res) => {
    const todo = new Todo({
        text: req.body.text
    });
    try{
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }
    catch(error){
     res.status(500).json({message: error.message});
    }
})

//Update a todo
router.patch('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete a todo 
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted', id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;