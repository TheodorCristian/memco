const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json"); // Path to your downloaded service account key file

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://qr-memories-collage-app-95f04.appspot.com",
  // Add any additional configurations here (if required)
};

// Initialize Firebase app
const firebaseApp = admin.initializeApp(firebaseConfig);

// Initialize Firestore, Authentication, Storage, etc.
const firestore = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

module.exports = {
  firestore,
  auth,
  storage,
};
