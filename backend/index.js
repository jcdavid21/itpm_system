import express, { json } from 'express'
import mysql from "mysql"
import cors from 'cors'
import multer from 'multer'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

const app = express()

app.use(express.json())
app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12749310",
    password: "XsVndcVtZV",
    database: "sql12749310"
})

const sendEmailAccount = async (providedEmail, email, password, activity, full_name) => {
    try{
 
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'juancarlodavid15@gmail.com',
                pass: 'suoq octm lbtg ljkh'
            },
        });

        let info = await transporter.sendMail({
            from: "Escuela de Corazon of Quezon City (Admin) <",
            to: providedEmail,
            subject: `${activity}`,
            html: `<!DOCTYPE html>
                <html>
                    <head></head>
                    <body>
                        <div style="font-family: Arial, sans-serif; margin: 0 auto; padding: 20px; max-width: 600px; background-color: white; border: 1px solid #ddd;">
                            <div style="background-color: rgb(197, 11, 11); color: white; padding: 10px; text-align: center;">
                                <h1 style="margin: 0;">Admin Service</h1>
                            </div>
                            <div style="margin: 20px 0;">
                                <p>Hello, ${full_name}</p>
                                <p>
                                    <span style="color: rgb(197, 11, 11); font-weight: 500;">Email: </span>${email}
                                </p>
                                <p>
                                    <span style="color: rgb(197, 11, 11); font-weight: 500;">Password: </span>${password}
                                </p>
                            </div>
                            <div style="text-align: center; color: #777; font-size: 12px;">
                                <p>&copy; 2024 Our Service. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                </html>
`
        });
        console.log("Message sent: %s", info.messageId);
    }catch(err){
        console.error("Error: ", err)
    }
}

async function activitLog(user_id, user_name, activity){
    try{
        const current_date = new Date();
        const formatted_date = current_date.toISOString().split('T')[0];
        const query = `INSERT INTO tbl_logs
        (user_id, user_name, activity, activity_date)
        VALUES(?, ?, ?, ?)`;
        const values = [user_id, user_name, activity, formatted_date];
        db.query(query, values, (err, data)=>{
            if (err) {
                console.error("Error inserting into tbl_logs:", err);
            } else {
                console.log("Inserted into tbl_logs successfully.");
            }
        })
    }catch(err){
        console.error("Error: ", err);
    }
}

const checkForm = async (acc_id, credential)=>{
    return new Promise((resolve, reject)=>{
        const query = `SELECT * FROM tbl_file_submitted WHERE rp_id = ? AND account_id = ? AND status_id = 1`;
        const values = [credential, acc_id];

        db.query(query, values, (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files_img");
    },
    filename: function (req, file, cb) {
        const fileName = Date.now();
        const fileExtension = file.originalname.split('.').pop();
        const fullFileName = `${fileName}.${fileExtension}`;
        cb(null, fullFileName);
    }
});

const upload = multer({ storage: storage });

app.post("/submitForm", upload.single('file'), async (req, res) => {
    const { credential, studentType, message, acc_id } = req.body;

    try {
        const result = await checkForm(acc_id, credential);

        if (result.length > 0) {
            console.error("Form already submitted");

            // Respond with an error if the form has already been submitted
            return res.status(400).json({ message: "Form already submitted" });
        }
    } catch (err) {
        console.error("Error checking form existence:", err);
        return res.status(500).json({ message: "Error checking form existence" });
    }

    // Ensure file is uploaded
    if (!req.file) {
        console.error("File not uploaded");
        return res.status(400).json({ message: "File not uploaded" });
    }

    const fileImg = req.file.filename;
    const current_date = new Date();
    const formatted_date = current_date.toISOString().split('T')[0];

    const query = `
        INSERT INTO tbl_file_submitted 
        (account_id, rp_id, student_type, remarks, file_img, status_id, submitted_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [acc_id, credential, studentType, message, fileImg, 1, formatted_date];

    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error inserting data into database:", err);
            return res.status(500).json({ message: "Error inserting data into database" });
        }

        console.log("Data inserted into database successfully");
        return res.status(200).json({ message: "Data inserted into database successfully" });
    });
});


app.get("/countPendingForms", (req, res)=>{
    const {account_id} = req.query;
    const query = `SELECT COUNT(*) as count FROM tbl_file_submitted WHERE status_id = 1`;

    db.query(query, [account_id], (err,  data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.get("/getPendingForms", (req, res)=>{
    const {acc_id, status_id} = req.query;

    const query = `SELECT tf.file_id, tf.student_type, tf.remarks, tf.file_img, tf.remarks, ts.rp_status, tf.submitted_date, tr.rp_type
FROM tbl_file_submitted tf 
INNER JOIN tbl_report_type tr ON tf.rp_id = tr.rp_id
INNER JOIN tbl_status ts ON tf.status_id = ts.rp_status_id
WHERE tf.status_id = ? AND tf.account_id = ?
`;

    db.query(query, [status_id, acc_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.get("/getAppointments", (req, res)=>{
    const {acc_id, status_id} = req.query;

    const query = `SELECT tp.apt_id, tp.apt_time, tp.apt_remarks, tp.apt_date, ts.status_name, ts.*, tr.rp_type, tf.file_img, tf.submitted_date FROM tbl_appointment tp 
    INNER JOIN tbl_appointment_status ts ON tp.apt_status = ts.status_id
    INNER JOIN tbl_file_submitted tf ON tp.file_id = tf.file_id
    INNER JOIN tbl_report_type tr ON tf.rp_id = tr.rp_id
    WHERE tf.account_id = ? AND tp.apt_status = ?`;

    db.query(query, [acc_id, status_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.put("/updateRemarks", (req, res)=>{
    const {file_id, remarks} = req.body;
    
    const query = `UPDATE tbl_file_submitted SET remarks = ? WHERE file_id = ?`;

    db.query(query, [remarks, file_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.status(200).send("Data updated into database");
        }
    })
   
})

const totalRequest = async () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS req_count FROM tbl_file_submitted WHERE status_id = 1`;
      db.query(query, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };
  
  const totalStudents = async () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS student_count FROM tbl_account WHERE acc_role_id = 1`;
      db.query(query, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };
  
  const countAppointments = async (status) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS apt_count FROM tbl_appointment WHERE apt_status = ?`;
      db.query(query, [status], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };
  
  const totalMessages = async () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS msg_count FROM tbl_contact`;
      db.query(query, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };
  
  app.get("/totalRequests", async (req, res) => {
    try {
      const [request, students, pendingAppointments, approvedAppointments, totalMsg] = await Promise.all([
        totalRequest(),
        totalStudents(),
        countAppointments(1),
        countAppointments(2),
        totalMessages(),
      ]);
  
      const data = {
        request: request[0].req_count,
        students: students[0].student_count,
        pendingAppointments: pendingAppointments[0].apt_count,
        approvedAppointments: approvedAppointments[0].apt_count,
        totalMsg: totalMsg[0].msg_count,
      };
  
      return res.json(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Server Error");
    }
  });

  app.get("/studentCountByMonth", (req, res) => {
    const query = `
        SELECT 
            m.month_name AS month, 
            COALESCE(t.count, 0) AS count
        FROM (
            SELECT 'January' AS month_name UNION ALL
            SELECT 'February' UNION ALL
            SELECT 'March' UNION ALL
            SELECT 'April' UNION ALL
            SELECT 'May' UNION ALL
            SELECT 'June' UNION ALL
            SELECT 'July' UNION ALL
            SELECT 'August' UNION ALL
            SELECT 'September' UNION ALL
            SELECT 'October' UNION ALL
            SELECT 'November' UNION ALL
            SELECT 'December'
        ) AS m
        LEFT JOIN (
            SELECT 
                MONTHNAME(date_added) AS month, 
                COUNT(*) AS count
            FROM tbl_account
            WHERE acc_role_id = 1
            GROUP BY MONTH(date_added), MONTHNAME(date_added)
        ) AS t
        ON m.month_name = t.month
        ORDER BY FIELD(m.month_name, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    `;

    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching student count by month:", err.message);
            res.status(500).json({ error: "Failed to fetch student data. Please try again later." });
        } else {
            res.status(200).json(data);
        }
    });
});

app.get("/getAllPendingForms", (req, res)=>{
    const {status_id} = req.query;
    const query = `SELECT tf.file_id, tf.student_type, tf.remarks, tf.file_img, tf.remarks, ts.rp_status, tf.submitted_date, tr.rp_type, ta.acc_email, ta.student_id, ta.account_id, CONCAT(td.first_name, " ", td.middle_name, " ", td.last_name) as full_name
    FROM tbl_file_submitted tf
    INNER JOIN tbl_report_type tr ON tf.rp_id = tr.rp_id
    INNER JOIN tbl_status ts ON tf.status_id = ts.rp_status_id
    INNER JOIN tbl_account ta ON tf.account_id = ta.account_id
    INNER JOIN tbl_acc_details td ON ta.account_id = td.account_id
    WHERE tf.status_id = ? ORDER BY tr.rp_type, tf.submitted_date DESC`;

    db.query(query, [status_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

const checkAppointment = async (file_id)=>{
    return new Promise((resolve, reject)=>{
        const query = `SELECT * FROM tbl_appointment WHERE file_id = ? AND apt_status = 1`;
        db.query(query, [file_id], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    }
)}

app.post("/setAppointment", async (req, res)=>{
    const {file_id, date, time, remarks, full_name, acc_id} = req.query;

    const appointment = await checkAppointment(file_id);

    if(appointment.length > 0){
        return res.status(299).send("Appointment already set");
    }
    const query = `INSERT INTO tbl_appointment (file_id, apt_date, apt_time, apt_remarks, apt_status) VALUES (?, ?, ?, ?, 1)`;
 
    console.log("Executing query:", query, "with values:", [file_id, date, time, remarks]);

    db.query(query, [file_id, date, time, remarks], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            const activity = "Set Appointment"
            activitLog(acc_id, full_name, activity);

            return res.status(200).send("Data inserted into database");
        }
    })
})

app.get("/getAllAppointments", (req, res)=>{
    const {status_id} = req.query;
    const query = `SELECT tp.apt_id, tp.apt_time, tp.apt_remarks, tp.apt_date, ts.status_name, ts.*, tr.rp_type, tf.file_img, tf.file_id, tf.submitted_date, ta.acc_email, ta.student_id, ta.account_id, CONCAT(td.first_name, " ", td.middle_name, " ", td.last_name) as full_name
    FROM tbl_appointment tp 
    INNER JOIN tbl_appointment_status ts ON tp.apt_status = ts.status_id
    INNER JOIN tbl_file_submitted tf ON tp.file_id = tf.file_id
    INNER JOIN tbl_report_type tr ON tf.rp_id = tr.rp_id
    INNER JOIN tbl_account ta ON tf.account_id = ta.account_id
    INNER JOIN tbl_acc_details td ON ta.account_id = td.account_id
    WHERE tp.apt_status = ?`;

    db.query(query, [status_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.put("/rescheduleAppointment", (req, res)=>{
    const {apt_id, date, time, remarks, acc_id, full_name} = req.body;
    const query = `UPDATE tbl_appointment SET apt_date = ?, apt_time = ?, apt_remarks = ? WHERE apt_id = ?`;

    db.query(query, [date, time, remarks, apt_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            const activity = "Reschedule Appointment"
            activitLog(acc_id, full_name, activity);
            return res.status(200).send("Data updated into database");
        }
    })
})

app.post("/cancelForm", (req, res)=>{
    const {file_id, full_name, acc_id} = req.query;
    const query = `UPDATE tbl_file_submitted SET status_id = 3 WHERE file_id = ?`;

    db.query(query, [file_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            const activity = "Cancel Form"
            activitLog(acc_id, full_name, activity);

            return res.status(200).send("Data updated into database");
        }
    })
})

app.put("/cancelAppointment", (req, res)=>{
    const {apt_id, acc_id, full_name} = req.body;
    const query = `UPDATE tbl_appointment SET apt_status = 3 WHERE apt_id = ?`;

    db.query(query, [apt_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            const activity = "Cancel Appointment"
            activitLog(acc_id, full_name, activity);
            return res.status(200).send("Data updated into database");
        }
    })
})

app.get("/reportTypes", (req, res)=>{
    const query = "SELECT * FROM tbl_report_type";

    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.post('/create-account', async (req, res) => {
    try {
        // Get user account details from request body
        const { studentId, email, username, password, role, firstName, middleName, lastName, address, contact, birthdate, gender, account_id, full_name, providedEmail } = req.body;

        const current_date = new Date();
        const formatted_date = current_date.toISOString().split('T')[0];  // Get current date in YYYY-MM-DD format

        const accountValues = [username, password, email, studentId, role, formatted_date];
        const accountDetails = [firstName, middleName, lastName, address, contact, birthdate, gender];
        const activty = "Create Account";

        // Check if the studentId or email already exists in tbl_account
        const checkQuery = `SELECT * FROM tbl_account WHERE student_id = ? OR acc_email = ?`;
        db.query(checkQuery, [studentId, email], async (checkErr, checkResult) => {
            if (checkErr) {
                console.error('Error executing Check Query:', checkErr);
                return res.status(500).json({ error: 'Error executing Check Query' });
            }

            // If studentId or email already exist, return error
            if (checkResult.length > 0) {
                return res.status(299).json({ error: 'Student ID or email already exists' });
            }

            // Send email for account creation
            await sendEmailAccount(providedEmail, email, password, "Account Creation", full_name);

            // Insert user data into the tbl_account
            const firstQuery = `INSERT INTO tbl_account 
                (acc_username, acc_password, acc_email, student_id, acc_role_id, date_added)
                VALUES (?, ?, ?, ?, ?, ?)`;

            db.query(firstQuery, [...accountValues], (err, result) => {
                if (err) {
                    console.error('Error executing Query 1:', err);
                    return res.status(500).json({ error: 'Error executing Query 1' });
                }

                // Get the generated account_id
                const accountId = result.insertId;

                // Use the accountId to insert into tbl_acc_details
                const secondQuery = `INSERT INTO tbl_acc_details 
                    (account_id, first_name, middle_name, last_name, address, contact, birthdate, gender)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                db.query(secondQuery, [accountId, ...accountDetails], async (err, result) => {
                    if (err) {
                        console.error('Error executing Query 2:', err);
                        return res.status(500).json({ error: 'Error executing Query 2' });
                    }

                    // Log the activity for account creation
                    activitLog(account_id, full_name, activty);

                    // Return success response
                    return res.status(200).json({ message: 'Account created successfully. QR code sent to email.' });
                });
            });
        });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Error creating account' });
    }
});



app.get("/", (req, res)=>{
    res.json("Hello this is the backend")
})

// Define storage settings for multer
const storageImg = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './anc_imgs');
    },
    filename: function(req, file, cb) {
        const fileName = Date.now();
        const fileExtension = path.extname(file.originalname);
        const fullFileName = `${fileName}${fileExtension}`;
        cb(null, fullFileName);
    }
});

// Initialize multer with the defined storage settings
const uploadImg = multer({ storage: storageImg });

// Route to handle file upload
app.post('/addAnc', uploadImg.single('file'), (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Get form data
        const { anc_title, anc_desc } = req.body;
        const anc_img = req.file.filename;

        // Insert data into database
        const query = `INSERT INTO tbl_announcements (anc_title, anc_desc, anc_img) VALUES (?, ?, ?)`;
        const values = [anc_title, anc_desc, anc_img];

        db.query(query, values, (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).json({ error: "An error occurred while processing your request" });
            } else {
                return res.status(200).json({ message: "Announcement added successfully" });
            }
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/choices", (req, res)=>{
    const query = "SELECT * FROM `tbl_report_type`";
    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})


app.get("/accountCheck", (req, res)=>{
    const {email, password} = req.query;
    const query = "SELECT * FROM tbl_account WHERE acc_email = ? AND acc_password = ?";
    const values = [email, password];
    
    db.query(query,values, (err,data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.get("/login", (req, res)=>{
    const {email, password} = req.query;
    const query = `
    SELECT ta.acc_email, ta.account_id, ta.student_id, ta.acc_role_id, CONCAT(td.first_name, " ", td.middle_name, " ", td.last_name) AS full_name, td.address, td.birthdate, td.contact, ar.acc_role
    FROM tbl_account ta 
    INNER JOIN tbl_acc_details td ON ta.account_id = td.account_id
    INNER JOIN tbl_acc_role ar ON ta.acc_role_id = ar.acc_role_id
    WHERE ta.acc_email = ? AND ta.acc_password = ?;`;
    const values = [email, password]

    db.query(query,values, (err,data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})


app.get("/profile", (req, res)=>{
    const {account_id} = req.query
    const query = `SELECT td.first_name, td.middle_name, td.last_name, 
    td.address, td.birthdate, td.birthdate, td.gender, td.contact, 
    ta.acc_email, ta.student_id FROM tbl_acc_details td 
    INNER JOIN tbl_account ta ON ta.account_id = td.account_id 
    WHERE td.account_id = ?;`;
    const values = [account_id];

    db.query(query, values, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.put("/updateProfile", (req, res)=>{
    const {fName, mName, lName, address, gender, contact, account_id} = req.body
    const query = `UPDATE tbl_acc_details
    SET first_name = ?, middle_name = ?, last_name = ?, 
    address = ?, gender = ?, contact = ?
    WHERE account_id = ?`;
    const values = [fName, mName, lName, address, gender, contact, account_id];

    db.query(query, values, (err, data)=>{
        if(err){
            res.status(500).send("Error inserting data into database");
            return;
        }else{
            res.status(200).send("Data updated into database");
        }
    })
})

app.get("/getpass", (req, res) => {
    const { account_id } = req.query;
    const query = "SELECT acc_password FROM tbl_account WHERE account_id = ?";
    const values = [account_id];

    db.query(query, values, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
});

app.put("/updatepass", (req, res)=>{
    const {newPass, account_id} = req.body
    const query = `UPDATE tbl_account
    SET acc_password = ?
    WHERE account_id = ?`;
    const values = [newPass, account_id];

    db.query(query, values, (err, data)=>{
        if(err){
            res.status(500).send("Error inserting data into database");
            return;
        }else{
            res.status(200).send("Data updated into database");
        }
    })
})

app.post("/submitcontact", (req, res)=>{
    const {name, email, message} = req.body;
    const query = `INSERT INTO tbl_contact
    (contact_name, contact_email, contact_message)
    VALUES(?)`;
    const values = [name, email, message];

    db.query(query, [values], (err, data)=>{
        if(err){
            console.error("Error: ", err)
        }
        res.status(200).send("Data inserted into database");
    })
})

app.get("/fetchTest", (req, res)=>{
    const query = "SELECT * FROM tbl_testimonials";

    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.post("/submitTest", (req, res) => {
    const { title, name, message } = req.body;
    const query = `INSERT INTO tbl_testimonials (test_title, test_feedback, test_name) VALUES (?, ?, ?)`;
    const values = [title, message, name];

    console.log("Executing query:", query, "with values:", values);

    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error inserting data into database");
        } else {
            console.log("Data inserted into database:", data);
            res.status(200).send("Data inserted into database");
        }
    });
});

app.get("/allAccounts", (req, res)=>{
    const query = `SELECT ta.account_id, ta.student_id, 
    ta.acc_email,
    td.first_name, td.middle_name, 
    td.last_name, td.address, td.gender,
    td.contact, tr.acc_role,
    CONCAT(td.first_name, " ", td.middle_name, " ", td.last_name) as full_name
    FROM tbl_account ta
    INNER JOIN tbl_acc_details td ON td.account_id = ta.account_id
    INNER JOIN tbl_acc_role tr ON tr.acc_role_id = ta.acc_role_id
    WHERE ta.account_status_id = 1;`

    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.get("/allDeactivated", (req, res)=>{
    const query = `SELECT ta.account_id, ta.student_id, 
    ta.acc_email,
    td.first_name, td.middle_name, 
    td.last_name, td.address, td.gender,
    td.contact, tr.acc_role,
    CONCAT(td.first_name, " ", td.middle_name, " ", td.last_name) as full_name
    FROM tbl_account ta
    INNER JOIN tbl_acc_details td ON td.account_id = ta.account_id
    INNER JOIN tbl_acc_role tr ON tr.acc_role_id = ta.acc_role_id
    WHERE ta.account_status_id = 2;`

    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})


app.put("/updateUserAccount", (req, res)=>{
    const {first_name, middle_name, last_name, address, contact, accId, account_id, full_name} = req.body
    const query = `
    UPDATE tbl_acc_details
    SET first_name = ?, middle_name = ?, last_name = ?, 
    address = ?, contact = ?
    WHERE account_id = ?`
    const values = [first_name, middle_name, last_name, address, contact, accId];
    const activity = "Update Account"
    db.query(query, values, (err, data)=>{
        if(err){
            res.status(500).send("Error inserting data into database");
            return;
        }else{
            activitLog(account_id, full_name, activity)
            res.status(200).send("Data updated into database");
        }
    })
})

app.put("/updatepassAdmin", (req, res)=>{
    const {newPass, accId, account_id, full_name} = req.body
    const query = `UPDATE tbl_account
    SET acc_password = ?
    WHERE account_id = ?`;
    const values = [newPass, accId];
    const activity = "Change Password"

    db.query(query, values, (err, data)=>{
        if(err){
            res.status(500).send("Error inserting data into database");
            return;
        }else{
            activitLog(account_id, full_name, activity);
            res.status(200).send("Data updated into database");
        }
    })
})

app.put("/deactivate", (req, res)=>{
    const {account_id_row, account_id, full_name} = req.body
    const query = `UPDATE tbl_account
    SET account_status_id = 2
    WHERE account_id = ?`;
    const value = [account_id_row];
    const activity = "Deactivate Account";

    db.query(query, value, (err, data)=>{
        if(err){
            res.status(500).send("Error inserting data into database");
            return;
        }else{
            activitLog(account_id, full_name, activity);
            res.status(200).send("Data updated into database");
        }
    })
})

app.put("/reactivate", (req, res)=>{
    const {account_id_row, account_id, full_name} = req.body
    const query = `UPDATE tbl_account
    SET account_status_id = 1
    WHERE account_id = ?`;
    const value = [account_id_row];
    const activity = "Reactivate Account";

    db.query(query, value, (err, data)=>{
        if(err){
            res.status(500).send("Error inserting data into database");
            return;
        }else{
            activitLog(account_id, full_name, activity);
            res.status(200).send("Data updated into database");
        }
    })
})


app.put("/updateStatus", (req, res)=>{
    const {refNumber, account_id, full_name} = req.body
    const query = `UPDATE tbl_reports
    SET report_status = 6
    WHERE ref_number = ?`;
    const activity = "Update Status";
    
    db.query(query, [refNumber], (err, data)=>{
        if(err){
            res.status(500).send("Error inserting data into database");
            return;
        }else{
            activitLog(account_id, full_name, activity);
            res.status(200).send("Data updated into database");
        }
    })
})


app.post("/addlist", (req, res)=>{
    const {account_id, full_name, newData} = req.body
    const query = `INSERT INTO tbl_report_type
    (rp_type) VALUES(?)`;
    const values = [newData];
    const activty = "Added Option"

    db.query(query, values, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            activitLog(account_id, full_name, activty);
            return res.json(data);
        }
    })
})

app.put('/removelist', (req, res)=>{
    const {rp_id, account_id, full_name} = req.body
    const fQuery = `DELETE FROM tbl_report_type WHERE rp_id = ?`;
    const activty = "Remove Option"

    db.query(fQuery, [rp_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            activitLog(account_id, full_name, activty);
            return res.status(200).send("Data updated into database");
        }
    })
})

const completeForm = async (file_id)=>{
    return new Promise((resolve, reject)=>{
        const query = `UPDATE tbl_file_submitted SET status_id = 2 WHERE file_id = ?`;
        db.query(query, [file_id], (err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    }
)}

app.get("/checkIfAlreadySubmitted", (req, res)=>{
    const {account_id, credential} = req.query;
    const query = `SELECT * FROM tbl_file_submitted WHERE account_id = ? AND rp_id = ? AND status_id IN (1, 2)`;
    const values = [account_id, credential];

    db.query(query, values, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})


app.put("/completeAppointment", async (req, res)=>{
    const {apt_id, account_id, full_name, file_id} = req.body
    const query = `UPDATE tbl_appointment
    SET apt_status = 2
    WHERE apt_id = ?`;
    const activity = "Complete Appointment"

    try{
        await completeForm(file_id);
        
        db.query(query, [apt_id], (err, data)=>{
            if(err){
                return res.json(err);
            }else{
                activitLog(account_id, full_name, activity);
                return res.status(200).send("Data updated into database");
            }
        })
    }catch(err){
        console.error("Error: ", err);
        return res.status(500).send("Error completing appointment");
    }
})

app.get("/getcontacts", (req, res)=>{
    const query = `SELECT * FROM tbl_contact`;
    
    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.get("/getlogs", (req, res)=>{
    const query = "SELECT * FROM tbl_logs"
    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.get("/getAnc", (req, res)=>{
    const query = `SELECT * FROM tbl_announcements`;

    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
})

app.put("/updateAnc", (req, res)=>{
    const {desc, ancId} = req.body
    const query = `UPDATE tbl_announcements
    SET anc_desc = ?
    WHERE anc_id = ?`
    const values = [desc, ancId];

    db.query(query, values, (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.status(200).send("Data updated into database");
        }
    })
})

app.delete("/delAnc", (req, res)=>{
    const { anc_id } = req.query
    const query = `DELETE FROM tbl_announcements
    WHERE anc_id = ?`;

    db.query(query, [anc_id], (err, data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.status(200).send("Data updated into database");
        }
    })
})


app.listen(3000, ()=>{

    console.log("Connected to backend!")
})
