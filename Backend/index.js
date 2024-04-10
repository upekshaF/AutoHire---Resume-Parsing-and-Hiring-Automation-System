import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from '../Backend/Routes/Users.js'
//import { Pool } from 'pg';
//import Pool from 'pg';
import dotenv from 'dotenv';
import itemsPool from './DBConfig.js';
//const itemsPool  = Pool;
import cors from 'cors';
import { name } from 'ejs';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
dotenv.config();





app.get('/', (req, res) => {
    res.send('Simple API homepage');
})

app.get('/api/items', async(req, res) => {
    try {
        const allItems = await itemsPool.query(
            ' SELECT * FROM items'
        );
        res.json([allItems.rows]);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})


app.get('/api/users', async(req, res) => {
    try {
        const allItems = await itemsPool.query(
            ' SELECT * FROM users'
        );
        res.json([allItems.rows]);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

app.post('/api/items', async (req, res) => {
    const { description } = req.body;
    try {
        const newItem = await itemsPool.query(
            'INSERT INTO items (description) VALUES ($1) RETURNING *',
            [description]
        );
        res.status(201).json({ 
            message: "New item added!",
            item: newItem.rows
         });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

//LOGIN



  // Login endpoint
  app.post('/api/login', async (req, res) => {
    console.log("recived")
    const { username, password } = req.body;
    try {
        const user = await itemsPool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username,password]
           
        );
      
        if (user.rows.length > 0) {
            res.status(200).json({ 
                message: "success",
                user: user.rows[0]
             });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

app.post('/api/resume', async (req, res) => {
    console.log("CASE CASE")
    console.log(req)
    const { name,age, address, education, skills, experience, status } = req.body;
    try {
          // Convert skills and experience arrays to multi-dimensional arrays
          const skillsArray = JSON.stringify(skills);
          const experienceArray = JSON.stringify(experience);
          
        
        // Insert data into the 'resume' table
      const result = await itemsPool.query(
        'INSERT INTO resume (name, age, address, education, skills, experience, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [ name,age, address, education, skillsArray, experienceArray, status]
      );
  
      // Respond with the inserted data
      res.json(result);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  });
  

app.listen(5070, () => {
    console.log("Server running on port 5070");
})