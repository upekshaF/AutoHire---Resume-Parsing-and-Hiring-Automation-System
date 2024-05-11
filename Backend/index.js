import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from '../Backend/Routes/Users.js'
//import { Pool } from 'pg';
//import Pool from 'pg';
import dotenv from 'dotenv';
import itemsPool from './DBConfig.js';
//const itemsPool  = Pool;
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { name } from 'ejs';

const app = express();
app.use(express.json());
app.use(cors(
   {
    origin : 'http://localhost:3000'
   }
));
app.use(bodyParser.json({limit: '10mb'}));
const PORT = 5000;
dotenv.config();





app.get('/', (req, res) => {
    res.send('Simple API homepage');
})

app.get('/api/items', async (req, res) => {
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


app.get('/api/users', async (req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM users;'
        );

        // Send the retrieved data in the response
        res.json(allItems.rows);
       
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// app.get('/api/users', async (req, res) => {
//     try {
//         const allItems = await itemsPool.query(
//             'SELECT * FROM users'
//         );
//         res.data[{}];

//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error.message)
//     }
// })

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

    const { username, password } = req.body;
    try {
        const user = await itemsPool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]

        );

        if (user.rows.length > 0) {
            res.status(200).json({
                message: "success",
                user: user.rows[0]
            });
        } else if(user.rows.length === 0) {
            res.status(401).json({ status:401, message: "Invalid username or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


  // Route to handle PUT request for updating user data

// app.put('/api/user:user_id', async (req, res) => {
//     const {  username, password, email } = req.body;
//     const user_id = req.params.user_id;
//     try {
//         // Update user data
//         const updateUserQuery = `
//             UPDATE users 
//             SET username = $1, password = $2, email = $3
//             WHERE user_id = $4
//             RETURNING *;
//         `;
//         const updatedUser = await itemsPool.query(updateUserQuery, [username, password, email, user_id]);

//         // Check if the user was found and updated
//         if (updatedUser.rows.length > 0) {
//             res.status(200).json({
//                 message: "User data updated successfully",
//                 user: updatedUser.rows[0]
//             });
//         } else {
//             res.status(404).json({ status: 404, message: "User not found or no changes made" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: 500, message: "Internal Server Error" });
//     }
// });

app.put('/api/user/:user_id', async (req, res) => {
    const { username, password, email, avatar } = req.body;
    const user_id = req.params.user_id;

    try {
        // Update user data
        let updateUserQuery;
        let queryParams;

        // Check if avatar data is provided
        if (avatar) {
            const base64Data = avatar.replace(/^data:image\/\w+;base64,/, '');
            const dataBuffer = Buffer.from(base64Data, 'base64');
            const fileName = uuidv4() + '.png'; // Generate unique filename
            const imagePath = path.join(__dirname, 'avatars', fileName);

            // Save the image to disk
            fs.writeFileSync(imagePath, dataBuffer);

            // Update user data including avatar filename
            updateUserQuery = `
                UPDATE users 
                SET username = $1, password = $2, email = $3, avatar = $4
                WHERE user_id = $5
                RETURNING *;
            `;
            queryParams = [username, password, email, fileName, user_id];
        } else {
            // Update user data excluding avatar
            updateUserQuery = `
                UPDATE users 
                SET username = $1, password = $2, email = $3
                WHERE user_id = $4
                RETURNING *;
            `;
            queryParams = [username, password, email, user_id];
        }

        // Execute the update query
        const updatedUser = await itemsPool.query(updateUserQuery, queryParams);

        // Check if the user was found and updated
        if (updatedUser.rows.length > 0) {
            res.status(200).json({
                message: "User data updated successfully",
                user: updatedUser.rows[0]
            });
        } else {
            res.status(404).json({ status: 404, message: "User not found or no changes made" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
});
// Login endpoint
app.post('/api/user', async (req, res) => {

    const { user_id } = req.body;
    try {
        const user = await itemsPool.query(
            'SELECT * FROM users WHERE user_id = $1 ',
            [user_id]

        );

        if (user.rows.length > 0) {
            res.status(200).json({
                message: "success",
                user: user.rows[0]
            });
        } else if(user.rows.length === 0) {
            res.status(401).json({ status:401, message: "Invalid username or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});






app.post('/api/signup', async (req, res) => {
    const { username, email, password, is_admin, is_recruiter } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await itemsPool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Insert the new user if not already exists
        const result = await itemsPool.query(
            'INSERT INTO users (username, email, password, is_admin, is_recruiter) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, email, password, is_admin, is_recruiter]
        );
        res.json(result.rows[0]); // Returning the inserted user
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

// // POST route to handle user signup
// app.post('/api/signup', async (req, res) => {
//     const { username, email, password,is_admin,is_recruiter } = req.body;
//    console.log(req.body)
//      try {
    
//         const result = await itemsPool.query(
//             'INSERT INTO users (username, email, password, is_admin,is_recruiter) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//             [username, email, password,is_admin,is_recruiter]
//         );
//         res.json(result);
//     } catch (error) {
//         console.error('Error inserting data:', error);
//         res.status(500).json({ error: 'An internal server error occurred' });
//     }

//   });

  
// POST route to handle user signup
app.post('/api/add_new_user', async (req, res) => {
    const { username, email, password,is_admin,is_recruiter } = req.body.formdata;
  
     try {
    
        const result = await itemsPool.query(
            'INSERT INTO users (username, email, password, is_admin,is_recruiter) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, email, password,is_admin,is_recruiter]
        );
        res.json(result);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }

  });


app.post('/api/resume', async (req, res) => {

    const { name, age, address, education, skills, experience, status } = req.body;
    try {
        // Convert skills and experience arrays to multi-dimensional arrays
        const skillsArray = JSON.stringify(skills);
        const experienceArray = JSON.stringify(experience);


        // Insert data into the 'resume' table
        const result = await itemsPool.query(
            'INSERT INTO resume (name, age, address, education, skills, experience, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [name, age, address, education, skills, experience, status]
        );

        // Respond with the inserted data
        res.json(result);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});




// Route to handle POST request
app.post('/api/parsedcvs', async (req, res) => {
    try {
      const { name, email_addresses, mobile_numbers,skills,experience,school, points } = req.body.dummyData;
  
      // Convert arrays to JSON strings
      const emailAddressesJSON = JSON.stringify(email_addresses);
      const mobileNumbersJSON = JSON.stringify(mobile_numbers);
  
      // Insert data into PostgreSQL database
      const queryText = 'INSERT INTO parsed_cv_data (name, email_addresses, mobile_numbers,skills,experience,school, points) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *';
      const values = [name, emailAddressesJSON, mobileNumbersJSON, skills,experience,school,points];
      const result = await itemsPool.query(queryText, values);
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Failed to insert data' });
    }
  });
// API endpoint to insert data into job_roles table
app.post('/api/job_roles', async (req, res) => {
    
    const {job_title, job_description, created_by, skills } = req.body;
   


    try {

        // Insert data into the job_roles table
        const result = await itemsPool.query(
            'INSERT INTO job_roles (job_title, job_description, created_by, skills_ids) VALUES ($1, $2, $3, $4) RETURNING *',
            [job_title, job_description,created_by,skills]
        );

           res.json(result);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
// DELETE endpoint to delete a job by ID
app.delete('/api/job_roles/:job_id', async (req, res) => {
    const job_id = req.params.job_id;

    try {
        // Delete data from the job_roles table
        const result = await itemsPool.query(
            'DELETE FROM job_roles WHERE job_id = $1 RETURNING *',
            [job_id]
        );

        if (result.rows.length === 0) {
            // If no rows were deleted, return a 404 Not Found response
            res.status(404).json({ success: false, error: 'Job role not found' });
        } else {
            // If deletion is successful, return the deleted data
            res.json({ success: true, deleted_job_role: result.rows[0] });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
app.put('/api/update_job/:job_id', async (req, res) => {
    const job_id = req.params.job_id;
    const {job_title, job_description, skills } = req.body;

    try {
        // Update data in the job_roles table
        const result = await itemsPool.query(
            'UPDATE job_roles SET job_title = $1, job_description = $2,skills_ids= $3  WHERE job_id = $4 RETURNING *',
            [job_title, job_description, skills, job_id ]
        );

        if (result.rows.length === 0) {
            // If no rows were updated, return a 404 Not Found response
            res.status(404).json({ success: false, error: 'Job role not found' });
        } else {
            // If update is successful, return the updated data
            res.json({ success: true, updated_job_role: result.rows[0] });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

app.put('/api/change_status_feedback/:id', async (req, res) => {
    const id = req.params.id;
    const {hiring_status,feedback } = req.body;
    
    try {
        // Update data in the job_roles table
        const result = await itemsPool.query(
            'UPDATE parsed_cv_data SET status_id = $1, feedback = $3 WHERE id = $2 RETURNING *',
            [hiring_status[0], id,feedback ]
        );

        if (result.rows.length === 0) {
            // If no rows were updated, return a 404 Not Found response
            res.status(404).json({ success: false, error: 'Record not found' });
        } else {
            // If update is successful, return the updated data
            res.json({ success: true, updated_job_role: result.rows[0] });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.get('/api/getJobs', async (req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM job_roles;'
        );
        console.log(res)
        res.json(allItems.rows);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})




app.get('/api/getOneCvData', async (req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM parsed_cv_data where id = $1 '
        );

        // Send the retrieved data in the response
        res.json(allItems.rows);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/getAllParsedCvs', async (req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM parsed_cv_data;'
        );

        // Send the retrieved data in the response
        res.json(allItems.rows);
    } catch (error) {
        console.error('Error fetching parsed resumes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/getAllSkills', async (req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM job_skills;;'
        );

        // Send the retrieved data in the response
        res.json(allItems.rows);
    } catch (error) {
        console.error('Error fetching skills', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/getAllStatuses', async (req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM hiring_statuses;'
        );

        // Send the retrieved data in the response
        res.json(allItems.rows);
    } catch (error) {
        console.error('Error fetching parsed resumes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to insert data into job_roles table
app.post('/api/add_skill', async (req, res) => {
    
    const {skill_name, stream } = req.body;
   


    try {

        // Insert data into the job_roles table
        const result = await itemsPool.query(
            'INSERT INTO job_skills (skill_name, stream) VALUES ($1, $2) RETURNING *',
            [skill_name, stream]
        );

           res.json(result);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});



app.listen(5070, () => {
    console.log("Server running on port 5070");
})