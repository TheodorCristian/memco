import { openDB } from "idb";

const DB_NAME = "authDB"; // Numele bazei de date
const STORE_NAME = "authStore"; // Numele colecției (Object Store)

// Funcție care deschide IndexedDB (sau îl creează dacă nu există)
const openDatabase = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME); // Creăm colecția pentru datele de autentificare
      }
    },
  });
};

//Funcție pentru a salva date în IndexedDB
export const saveToDB = async (key, value) => {
  const db = await openDatabase(); // Deschide baza de date
  await db.put(STORE_NAME, value, key); // Salvează datele cu un key
};

//Funcție pentru a citi datele din IndexedDB
export const getFromDB = async (key) => {
  const db = await openDatabase(); // Deschide baza de date
  return await db.get(STORE_NAME, key); // Returnează valoarea pentru key-ul cerut
};

//Funcție pentru a șterge datele din IndexedDB
export const clearDB = async () => {
  const db = await openDatabase(); // Deschide baza de date
  await db.clear(STORE_NAME); // Șterge toate datele
};
