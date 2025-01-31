const Joi = require('joi'); // Joi importálása validációhoz

// employees tábla validációs sémája
const employeeSchema = Joi.object({
    idCardNum: Joi.string().max(15).required(), // ID kártyaszám (max 15 karakter, kötelező)
    lastName: Joi.string().max(50).required(), // Vezetéknév (max 50 karakter, kötelező)
    middleName: Joi.string().max(50).allow(null, ''), // Középső név (max 50 karakter, opcionális)
    firstName: Joi.string().max(50).required(), // Keresztnév (max 50 karakter, kötelező)
    email: Joi.string().email().required(), // Email (érvényes email formátum, kötelező)
    pass: Joi.string().required(), // Jelszó (kötelező)
    job: Joi.number().integer().required(), // Munkakör azonosító (egész szám, kötelező)
    phoneNumber: Joi.string().max(25).allow(null, ''), // Telefonszám (max 25 karakter, opcionális)
    homeAddress: Joi.number().integer().required(), // Lakcím azonosító (egész szám, kötelező)
    taxNum: Joi.string().max(20).allow(null, ''), // Adószám (max 20 karakter, opcionális)
    socialSecNum: Joi.string().max(20).allow(null, ''), // Társadalombiztosítási szám (max 20 karakter, opcionális)
    dateOfBirth: Joi.date().allow(null, ''), // Születési dátum (opcionális)
    placeOfBirth: Joi.string().max(255).allow(null, ''), // Születési hely (max 255 karakter, opcionális)
    bankAccountNumber: Joi.string().max(34).allow(null, ''), // Bankszámlaszám (max 34 karakter, opcionális)
    supervisorID: Joi.string().max(15).allow(null, '') // Felettes azonosítója (max 15 karakter, opcionális)
});

// employmentcontracts tábla validációs sémája
const employmentContractSchema = Joi.object({
    employee: Joi.string().max(15).required(), // Alkalmazott azonosítója (max 15 karakter, kötelező)
    startDate: Joi.date().required(), // Kezdési dátum (kötelező)
    endDate: Joi.date().allow(null, ''), // Befejezési dátum (opcionális)
    hourlyRates: Joi.number().integer().required(), // Órabér (egész szám, kötelező)
    working_hours: Joi.number().integer().required() // Munkaórák száma (egész szám, kötelező)
});

// equipment tábla validációs sémája
const equipmentSchema = Joi.object({
    equipmentName: Joi.string().max(255).required(), // Eszköz neve (max 255 karakter, kötelező)
    serial_number: Joi.string().max(255).required(), // Sorozatszám (max 255 karakter, kötelező)
    purchase_date: Joi.date().required(), // Vásárlás dátuma (kötelező)
    status: Joi.string().max(255).required(), // Állapot (max 255 karakter, kötelező)
    employee: Joi.string().max(15).required(), // Alkalmazott azonosítója (max 15 karakter, kötelező)
    last_service_date: Joi.date().allow(null, ''), // Utolsó szerviz dátuma (opcionális)
    warranty_expiration: Joi.date().required(), // Garancia lejárata (kötelező)
    remarks: Joi.string().allow(null, '') // Megjegyzések (opcionális)
});

module.exports = {
    employeeSchema,
    employmentContractSchema,
    equipmentSchema
};
