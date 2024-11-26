const express = require("express");
const server = express();
const cors = require("cors");
const sqlite3 = require("sqlite3");
const path = require("path");
const methodOverride = require("method-override");
const fs = require("fs");
const PDFDocument = require("pdfkit");

// Ensure the directory exists
const dbDir = path.join(__dirname, "../databases");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let ipddb = new sqlite3.Database(path.join(dbDir, "ipd.db"), (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to the IPD database.");
  }
});

console.log(`Database path: ${path.join(dbDir, "opd.db")}`);

let opddb = new sqlite3.Database(path.join(dbDir, "opd.db"), (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to the OPD database.");
  }
});

server.use(methodOverride("_method"));
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "/views"));
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(cors());
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

let staffdb = new sqlite3.Database(path.join(dbDir, "staff.db"), (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to the staff database.");
  }
});

//ipd
server.use(express.json({ limit: "50mb" }));

function handleLogin(req, res, tableName, redirectUrl) {
  const username = req.body.username;
  const password = req.body.password;
  const sql = `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`;

  staffdb.get(sql, [username, password], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (row && row.username === username && row.password === password) {
        console.log("Login successful");
        res.json({ redirect: redirectUrl });
      } else {
        console.log("Invalid username or password");
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  });
}

// Define routes using the reusable function
server.post("/OPDlogin", (req, res) => {
  handleLogin(req, res, "opdstaff", "/OPDManagement");
});

server.post("/Inventorylogin", (req, res) => {
  handleLogin(req, res, "inventorystaff", "/InventoryManagement");
});

server.post("/IPDlogin", (req, res) => {
  handleLogin(req, res, "ipdstaff", "/IPDManagement");
});

// OPD
server.post("/NewAppoinment", (req, res) => {
  let {
    middleName,
    lastName,
    firstName,
    age,
    dob,
    birthAddress,
    time,
    gender,
    mobNum,
    altmobNum,
    email,
    aadhar,
    address,
    altAddress,
    city,
    Pincode,
    district,
    state,
    country,
    height,
    weight,
    bloodGroup,
    familyFirstName,
    familyMiddleName,
    familyLastName,
    ageFamily,
    mobNumFamily,
    altMobNumFamily,
    emailFamily,
    relationFamily,
    relationNameFamily,
    aadharFamily,
    altAddressFamily,
    cityFamily,
    PincodeFamily,
    districtFamily,
    stateFamily,
    countryFamily,
    heightFamily,
    weightFamily,
    bloodGroupFamily,
    DoctorName,
    date,
  } = req.body;

  // Get the current maximum ID value for the given date
  opddb.run(
    `SELECT IFNULL(MAX(ID), 0) AS max_id FROM appointments WHERE date = ?`,
    date,
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        let newId = row && row.max_id ? row.max_id + 1 : 1; // Increment the ID for the current date

        let regId;
        do {
          regId = Math.floor(1000000000 + Math.random() * 9000000000); // Generate a random 10-digit number
          opddb.run(
            `SELECT 1 FROM appointments WHERE RegID = ?`,
            regId,
            (err, row) => {
              if (err) {
                console.error(err.message);
              } else if (row) {
                // RegID already exists, generate a new one
                regId = null;
              } else {
                const sql = `INSERT INTO appointments(
				 RegID, ID, middleName, lastName, firstName, age, dob, birthAddress, time, gender, mobNum, altmobNum, email, aadhar, address, altAddress, city, Pincode, district, state, country, height, weight, bloodGroup,
				 familyFirstName, familyMiddleName, familyLastName, ageFamily, mobNumFamily, altMobNumFamily, emailFamily, relationFamily, relationNameFamily, aadharFamily, altAddressFamily, cityFamily, PincodeFamily, districtFamily, stateFamily, countryFamily, heightFamily, weightFamily, bloodGroupFamily, DoctorName, date
			  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

                opddb.run(
                  sql,
                  [
                    regId,
                    newId,
                    middleName,
                    lastName,
                    firstName,
                    age,
                    dob,
                    birthAddress,
                    time,
                    gender,
                    mobNum,
                    altmobNum,
                    email,
                    aadhar,
                    address,
                    altAddress,
                    city,
                    Pincode,
                    district,
                    state,
                    country,
                    height,
                    weight,
                    bloodGroup,
                    familyFirstName,
                    familyMiddleName,
                    familyLastName,
                    ageFamily,
                    mobNumFamily,
                    altMobNumFamily,
                    emailFamily,
                    relationFamily,
                    relationNameFamily,
                    aadharFamily,
                    altAddressFamily,
                    cityFamily,
                    PincodeFamily,
                    districtFamily,
                    stateFamily,
                    countryFamily,
                    heightFamily,
                    weightFamily,
                    bloodGroupFamily,
                    DoctorName,
                    date,
                  ],
                  (err) => {
                    if (err) {
                      console.error(err.message);
                    } else {
                      // Insert successful
                      res.json({ message: "Appointment created successfully" });
                    }
                  }
                );
              }
            }
          );
        } while (!regId);
      }
    }
  );
});

//delete
server.delete("/deletePatient/:patientRedID", (req, res) => {
    const patientRedID = req.params.patientRedID;
    // Update the patient status to "cancelled" in the database
    opddb.run(
        `UPDATE appointments SET status = 'cancelled' WHERE RegID = ?`,
        patientRedID,
        (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: "Error cancelling patient" });
            } else {
                res.send({ message: "Patient cancelled successfully" });
            }
        }
    );
});
//checkout
server.delete("/checkOutPatient/:patientRegID", (req, res) => {
  const RegID = req.params.patientRegID;
  // Update the patient status to "cancelled" in the database
  opddb.run(
    `UPDATE appointments SET status = 'checked-out' WHERE RegID = ?`,
    RegID,
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error cancelling patient" });
      } else {
        res.send({ message: "Patient cancelled successfully" });
      }
    }
  );
});

server.get("/fetchPatientDetails", (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const sql = `
    SELECT 
      firstName,
      middleName,
      lastName, 
      mobNum,
      RegID,
      ID,
      Status,
      DoctorName,
      date
    FROM 
      appointments
    WHERE 
      date = ?`; // Add a WHERE clause to filter by today's date

    opddb.all(sql, [currentDate], (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        // Create the JSON object from the fetched data
        const patientDetails = rows.map(row => ({
            patientToken: row.ID,
            patientFirstName: row.firstName,
            patientMiddleName: row.middleName,
            patientLastName: row.lastName,
            patientMobileNo: row.mobNum,
            patientRegID: row.RegID,
            patientStatus: row.Status,
            doctorName: row.DoctorName,
            date: row.date
        }));

        res.json(patientDetails);
    });
});


///fetchPatientHistory
server.get("/fetchPatientHistory", (req, res) => {
  const sql = `
		SELECT 
		  firstName,
		  middleName,
		  lastName, 
		  mobNum,
		  RegID,
		  ID,
		  Status,
		  DoctorName,
		  date
		FROM 
		  appointments
	 `;

  opddb.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error executing SQL query:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Create the JSON object from the fetched data
    const patientDetails = rows.map((row) => ({
      patientToken: row.ID,
      patientFirstName: row.firstName,
      patientMiddleName: row.middleName,
      patientLastName: row.lastName,
      patientMobileNo: row.mobNum,
      patientRedID: row.RegID,
      patientStatus: row.Status,
      doctorName: row.DoctorName,
      date: row.date,
    }));

    res.json(patientDetails);
  });
});

server.get("/fetchBeds", (req, res) => {
  const sql = `
	SELECT 
	  bedID,
	  roomNo,
	  bedNumber,
	  status
	FROM 
	  Beds
 `;

  ipddb.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error executing SQL query:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Create the JSON object from the fetched data
    const BedDetails = rows.map((row) => ({
      bedID: row.bedID,
      roomNo: row.roomNo,
      bedNumber: row.bedNumber,
      bedStatus: row.status,
    }));

    res.json(BedDetails);
  });
});

server.post("/updateBedStatus", (req, res) => {
  const { bedId, status } = req.body;

  ipddb.run(
    `UPDATE beds SET status = ? WHERE bedID = ?`,
    status,
    bedId,
    (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send({ success: false, message: "Error updating bed status" });
      } else {
        res.send({ success: true, message: "Bed status updated successfully" });
      }
    }
  );
});

server.post("/updateBedStatusBack", (req, res) => {
  console.log("Received request to update bed status...");
  console.log("req.body:", req.body);

  const { bedId, status } = req.body;

  ipddb.run(
    `UPDATE beds SET status = ? WHERE bedID = ?`,
    status,
    bedId,
    (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send({ success: false, message: "Error updating bed status" });
      } else {
        console.log("Bed status updated successfully!");
        res.send({ success: true, message: "Bed status updated successfully" });
      }
    }
  );
});

//billing

//Ensure the output directory exists
const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
// const outputDir = path.join(__dirname, 'output'); // Ensure this path is valid

server.post("/billingDetails", (req, res) => {
  console.log("Request received!");
  console.log("Request body:", req.body);
  let {
    middleName,
    lastName,
    firstName,
    age,
    dob,
    birthAddress,
    time,
    gender,
    mobNum,
    altmobNul,
    email,
    aadhar,
    date,
    DoctorNamel,
    Department,
    Quantity,
    TotalAmount,
    Discount,
    PaymentMethod,
    NetAmount,
  } = req.body;

  // Create a new PDF document
  const doc = new PDFDocument();
  const fileName = `invoice_${Date.now()}.pdf`; // Unique filename
  const filePath = path.join(outputDir, fileName);

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // Add content to the PDF
  doc.fontSize(16).text("Patient Details", { underline: true });
  doc.fontSize(12).text(`First Name: ${firstName}`);
  doc.text(`Middle Name: ${middleName}`);
  doc.text(`Last Name: ${lastName}`);
  doc.text(`Age: ${age}`);
  doc.text(`Date of Birth: ${dob}`);
  doc.text(`Birth Address: ${birthAddress}`);
  doc.text(`Time of Birth: ${time}`);
  doc.text(`Gender: ${gender}`);
  doc.text(`Mobile Number: ${mobNum}`);
  doc.text(`Alternate Mobile Number: ${altmobNul}`);
  doc.text(`Email: ${email}`);
  doc.text(`Aadhar: ${aadhar}`);
  doc.text(`Date: ${date}`);
  doc.text(`Doctor's Name: ${DoctorNamel}`);
  doc.text(`Department: ${Department}`);
  doc.text(`Quantity: ${Quantity}`);
  doc.text(`Total Amount: ${TotalAmount}`);
  doc.text(`Discount: ${Discount}`);
  doc.text(`Payment Method: ${PaymentMethod}`);
  doc.text(`Net Amount: ${NetAmount}`);

  stream.on("finish", () => {
    res.download(pdfPath, "PatientDetails.pdf", (err) => {
      if (err) {
        res.status(500).send("Could not download the file.");
      }
    });
  });
});

let mediventorydb = new sqlite3.Database(
    path.join(dbDir, "medinventory.db"),
    (err) => {
        if (err) {
            console.log(err.message); // Log error if connection fails
        } else {
            console.log("Connected to the medinventory database.");
        }
    }
);

server.get("/getStock", (req, res) => {
    const sql = 'SELECT * FROM stock;'
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ data: rows });
        }
    });
});

server.post('/addStock', (req, res) => {
    const data = req.body;

    let sql = `INSERT INTO stock (medicineid, medicinename, mfg_date, exp_date, disposeddepartment) 
             VALUES (?, ?, ?, ?, ?)`;

    let params = [data.medicineid, data.medicinename, data.mfg_date, data.exp_date, data.disposeddepartment];

    mediventorydb.run(sql, params, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Error saving form data' });
        } else {
            console.log('Form data saved to database');
            res.send({ message: 'Form data submitted successfully' });
        }
    });
});



server.listen(3000, () => {
  console.log("Listening on port 3000");
});
