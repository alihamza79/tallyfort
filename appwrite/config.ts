import { Client, Account, Databases, Storage } from "appwrite";

// Access environment variables
// const Endpoint = process.env.REACT_APP_APPWRITE_ENDPOINT;
// const projectID = process.env.REACT_APP_APPWRITE_PROJECT_ID;
// const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID;

const Endpoint = "https://54.36.109.91/v1";
const projectID = "66d64183002ad4afa1bb";
const databaseId = "66d64260002c314c041d";



const client = new Client();

client
  .setEndpoint(Endpoint) // Your Appwrite Endpoint
  .setProject(projectID); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { databaseId,projectID };
