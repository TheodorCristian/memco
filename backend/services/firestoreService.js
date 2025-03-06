const { firestore } = require('../configurations/firebaseconfig');

const FirestoreService = {
   async getAll(collectionName) {
     try {
       const collectionSnapshot = await firestore.collection(collectionName).get();
       const items = [];
       collectionSnapshot.forEach((doc) => {
         items.push({
           id: doc.id,
           ...doc.data(),
         });
       });
       return items;
     } catch (err) {
       throw new Error(`Could not fetch ${collectionName}`);
     }
   },
 
   async getById(collectionName, documentId) {
     try {
       const doc = await firestore.collection(collectionName).doc(documentId).get();
       if (!doc.exists) {
         return null; // Document not found
       }
       return {
         id: doc.id,
         ...doc.data(),
       };
     } catch (err) {
       throw new Error(`Could not fetch the document from ${collectionName}`);
     }
   },
 
   async createDocument(collectionName, data) {
     try {
       const newDocRef = await firestore.collection(collectionName).add(data);
       const newDoc = await newDocRef.get();
       return {
         id: newDocRef.id,
         ...newDoc.data(),
       };
     } catch (err) {
       throw new Error(`Could not create a document in ${collectionName}`);
     }
   },
 
   // Other generic Firestore operations...
 };
 
 module.exports = FirestoreService;
