
import mongoose from "mongoose";

export const db = mongoose.createConnection();

export async function connect(connectionString) {
    await db.openUri(connectionString);
}
