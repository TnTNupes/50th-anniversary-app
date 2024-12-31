export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_AUTHDOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_API_PROJECTID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_STORAGEBUCKET || "",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_API_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_API_MEASUREMENT_ID || "",
};

export const firebaseAdminSDKConfig = {
  type: process.env.FIREBASE_ADMIN_SDK_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_API_PROJECTID,
  private_key_id: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY,
  client_email: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_SDK_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3zscc%40tntnupes-8a29b.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
