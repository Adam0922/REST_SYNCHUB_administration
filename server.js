// Express modul importálása a webalkalmazás kezeléséhez
const express = require('express');
// SQLite3 modul importálása az adatbázis-kezeléshez
const sqlite3 = require('sqlite3');
// CORS modul importálása a kereszthivatkozások engedélyezéséhez
const cors = require('cors');
// Validációs sémák importálása a validation.js fájlból az adatok ellenőrzéséhez
const { employeeSchema, employmentContractSchema, equipmentSchema } = require('./validation');
// Adatbázis kapcsolat importálása a data.js fájlból
const db = require('./data');

// Express alkalmazás létrehozása
const app = express();
// Szerver portjának beállítása
const port = 3000;

// Middleware beállítása
app.use(cors()); // CORS engedélyezése a különböző eredetű kérések kezeléséhez
app.use(express.json()); // JSON formátumú kérések kezelésének engedélyezése

// Új alkalmazott hozzáadása az adatbázishoz
app.post('/api/v1/employees', (req, res) => {
    // Beérkező adatok validálása
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Adatok kinyerése a kérés törzsből
    const { idCardNum, lastName, middleName, firstName, email, pass, job, phoneNumber, homeAddress, taxNum, socialSecNum, dateOfBirth, placeOfBirth, bankAccountNumber, supervisorID } = req.body;
    // SQL lekérdezés végrehajtása az új alkalmazott beszúrásához
    db.run(`INSERT INTO employees (idCardNum, lastName, middleName, firstName, email, pass, job, phoneNumber, homeAddress, taxNum, socialSecNum, dateOfBirth, placeOfBirth, bankAccountNumber, supervisorID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [idCardNum, lastName, middleName, firstName, email, pass, job, phoneNumber, homeAddress, taxNum, socialSecNum, dateOfBirth, placeOfBirth, bankAccountNumber, supervisorID],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ id: this.lastID });
        });
});

// Összes alkalmazott lekérdezése az adatbázisból
app.get('/api/v1/employees', (req, res) => {
    // SQL lekérdezés végrehajtása az összes alkalmazott lekéréséhez
    db.all(`SELECT * FROM employees`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

// Alkalmazott adatainak frissítése
app.put('/api/v1/employees/:id', (req, res) => {
    // Beérkező adatok validálása
    const { error } = employeeSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Adatok kinyerése a kérés törzsből
    const { idCardNum, lastName, middleName, firstName, email, pass, job, phoneNumber, homeAddress, taxNum, socialSecNum, dateOfBirth, placeOfBirth, bankAccountNumber, supervisorID } = req.body;
    // SQL lekérdezés végrehajtása az alkalmazott adatainak frissítéséhez
    db.run(`UPDATE employees SET lastName = ?, middleName = ?, firstName = ?, email = ?, pass = ?, job = ?, phoneNumber = ?, homeAddress = ?, taxNum = ?, socialSecNum = ?, dateOfBirth = ?, placeOfBirth = ?, bankAccountNumber = ?, supervisorID = ? WHERE idCardNum = ?`,
        [lastName, middleName, firstName, email, pass, job, phoneNumber, homeAddress, taxNum, socialSecNum, dateOfBirth, placeOfBirth, bankAccountNumber, supervisorID, req.params.id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            if (this.changes === 0) return res.status(404).send('Employee not found');
            res.send('Employee updated successfully');
        });
});

// Alkalmazott törlése az adatbázisból
app.delete('/api/v1/employees/:id', (req, res) => {
    // SQL lekérdezés végrehajtása az alkalmazott törléséhez
    db.run(`DELETE FROM employees WHERE idCardNum = ?`, req.params.id, function (err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send('Employee not found');
        res.send('Employee deleted successfully');
    });
});

// Új munkaszerződés hozzáadása az adatbázishoz
app.post('/api/v1/employmentcontracts', (req, res) => {
    // Beérkező adatok validálása
    const { error } = employmentContractSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Adatok kinyerése a kérés törzsből
    const { employee, startDate, endDate, hourlyRates, working_hours } = req.body;
    // SQL lekérdezés végrehajtása az új munkaszerződés beszúrásához
    db.run(`INSERT INTO employmentcontracts (employee, startDate, endDate, hourlyRates, working_hours) VALUES (?, ?, ?, ?, ?)`,
        [employee, startDate, endDate, hourlyRates, working_hours],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ id: this.lastID });
        });
});

// Összes munkaszerződés lekérdezése az adatbázisból
app.get('/api/v1/employmentcontracts', (req, res) => {
    // SQL lekérdezés végrehajtása az összes munkaszerződés lekéréséhez
    db.all(`SELECT * FROM employmentcontracts`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

// Munkaszerződés frissítése
app.put('/api/v1/employmentcontracts/:id', (req, res) => {
    // Beérkező adatok validálása
    const { error } = employmentContractSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Adatok kinyerése a kérés törzsből
    const { employee, startDate, endDate, hourlyRates, working_hours } = req.body;
    // SQL lekérdezés végrehajtása a munkaszerződés frissítéséhez
    db.run(`UPDATE employmentcontracts SET employee = ?, startDate = ?, endDate = ?, hourlyRates = ?, working_hours = ? WHERE rowid = ?`,
        [employee, startDate, endDate, hourlyRates, working_hours, req.params.id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            if (this.changes === 0) return res.status(404).send('Employment contract not found');
            res.send('Employment contract updated successfully');
        });
});

// Munkaszerződés törlése az adatbázisból
app.delete('/api/v1/employmentcontracts/:id', (req, res) => {
    // SQL lekérdezés végrehajtása a munkaszerződés törléséhez
    db.run(`DELETE FROM employmentcontracts WHERE rowid = ?`, req.params.id, function (err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send('Employment contract not found');
        res.send('Employment contract deleted successfully');
    });
});

// Új eszköz hozzáadása az adatbázishoz
app.post('/api/v1/equipment', (req, res) => {
    // Beérkező adatok validálása
    const { error } = equipmentSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Adatok kinyerése a kérés törzsből
    const { equipmentName, serial_number, purchase_date, status, employee, last_service_date, warranty_expiration, remarks } = req.body;
    // SQL lekérdezés végrehajtása az új eszköz beszúrásához
    db.run(`INSERT INTO equipment (equipmentName, serial_number, purchase_date, status, employee, last_service_date, warranty_expiration, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [equipmentName, serial_number, purchase_date, status, employee, last_service_date, warranty_expiration, remarks],
        function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ id: this.lastID });
        });
});

// Összes eszköz lekérdezése az adatbázisból
app.get('/api/v1/equipment', (req, res) => {
    // SQL lekérdezés végrehajtása az összes eszköz lekéréséhez
    db.all(`SELECT * FROM equipment`, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.send(rows);
    });
});

// Eszköz frissítése
app.put('/api/v1/equipment/:id', (req, res) => {
    // Beérkező adatok validálása
    const { error } = equipmentSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Adatok kinyerése a kérés törzsből
    const { equipmentName, serial_number, purchase_date, status, employee, last_service_date, warranty_expiration, remarks } = req.body;
    // SQL lekérdezés végrehajtása az eszköz frissítéséhez
    db.run(`UPDATE equipment SET equipmentName = ?, serial_number = ?, purchase_date = ?, status = ?, employee = ?, last_service_date = ?, warranty_expiration = ?, remarks = ? WHERE equipmentID = ?`,
        [equipmentName, serial_number, purchase_date, status, employee, last_service_date, warranty_expiration, remarks, req.params.id],
        function (err) {
            if (err) return res.status(500).send(err.message);
            if (this.changes === 0) return res.status(404).send('Equipment not found');
            res.send('Equipment updated successfully');
        });
});

// Eszköz törlése az adatbázisból
app.delete('/api/v1/equipment/:id', (req, res) => {
    // SQL lekérdezés végrehajtása az eszköz törléséhez
    db.run(`DELETE FROM equipment WHERE equipmentID = ?`, req.params.id, function (err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send('Equipment not found');
        res.send('Equipment deleted successfully');
    });
});

// Szerver indítása a megadott porton
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
