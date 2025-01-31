const sqlite3 = require('sqlite3').verbose(); // sqlite3 modul importálása
const db = new sqlite3.Database(':memory:'); // Memóriában lévő adatbázis létrehozása

// Táblák létrehozása és kapcsolatok definiálása
db.serialize(() => {
    // employees tábla létrehozása
    db.run(`CREATE TABLE IF NOT EXISTS employees (
        idCardNum VARCHAR(15) PRIMARY KEY, // Elsődleges kulcs
        lastName VARCHAR(50) NOT NULL, // Alkalmazott vezetékneve
        middleName VARCHAR(50), // Alkalmazott középső neve
        firstName VARCHAR(50) NOT NULL, // Alkalmazott keresztneve
        email VARCHAR(255) NOT NULL, // Alkalmazott email címe
        pass VARCHAR(255) NOT NULL, // Alkalmazott jelszava
        job INT(11) NOT NULL, // Alkalmazott munkaköre
        phoneNumber VARCHAR(25), // Alkalmazott telefonszáma
        homeAddress INT(11) NOT NULL, // Alkalmazott lakcíme
        taxNum VARCHAR(20), // Alkalmazott adószáma
        socialSecNum VARCHAR(20), // Alkalmazott társadalombiztosítási száma
        dateOfBirth DATE, // Alkalmazott születési dátuma
        placeOfBirth VARCHAR(255), // Alkalmazott születési helye
        bankAccountNumber VARCHAR(34), // Alkalmazott bankszámlaszáma
        supervisorID VARCHAR(15), // Alkalmazott felettesének azonosítója
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, // Létrehozás időbélyege
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP // Utolsó frissítés időbélyege
    )`);

    // employmentcontracts tábla létrehozása
    db.run(`CREATE TABLE IF NOT EXISTS employmentcontracts (
        contractID INT(11) PRIMARY KEY AUTOINCREMENT, // Elsődleges kulcs automatikus növeléssel
        employee VARCHAR(15) NOT NULL, // Alkalmazott azonosítója (külső kulcs)
        startDate DATE NOT NULL, // Szerződés kezdete
        endDate DATE, // Szerződés vége
        hourlyRates INT(11) NOT NULL, // Órabér
        working_hours INT(11) NOT NULL, // Munkaórák száma
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, // Létrehozás időbélyege
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, // Utolsó frissítés időbélyege
        FOREIGN KEY (employee) REFERENCES employees(idCardNum) // Külső kulcs kapcsolat
    )`);

    // equipment tábla létrehozása
    db.run(`CREATE TABLE IF NOT EXISTS equipment (
        equipmentID INT(11) PRIMARY KEY AUTOINCREMENT, // Elsődleges kulcs automatikus növeléssel
        equipmentName VARCHAR(255) NOT NULL, // Eszköz neve
        serial_number VARCHAR(255) NOT NULL, // Sorozatszám
        purchase_date DATE NOT NULL, // Vásárlás dátuma
        status VARCHAR(255) NOT NULL, // Állapot
        employee VARCHAR(15) NOT NULL, // Alkalmazott azonosítója (külső kulcs)
        last_service_date DATE, // Utolsó szerviz dátuma
        warranty_expiration DATE NOT NULL, // Garancia lejárata
        remarks TEXT, // Megjegyzések
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, // Létrehozás időbélyege
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, // Utolsó frissítés időbélyege
        FOREIGN KEY (employee) REFERENCES employees(idCardNum) // Külső kulcs kapcsolat
    )`);
});

module.exports = db; // Adatbázis kapcsolat exportálása
