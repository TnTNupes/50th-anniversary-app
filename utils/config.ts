export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_AUTHDOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_API_PROJECTID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_STORAGEBUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_API_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_API_MEASUREMENT_ID || '',
};