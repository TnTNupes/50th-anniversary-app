import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../utils/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const directory = (
      await admin
        .firestore()
        .collection("users")
        .where("verified", "==", true)
        .get()
    ).docs.map((doc) => doc.data());
    res.status(200).json({ directory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify user." });
  }
};

export default handler;
