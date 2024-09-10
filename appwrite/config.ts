import { Client, Account, Databases, Storage } from "appwrite";

// Access environment variables
// const Endpoint = process.env.REACT_APP_APPWRITE_ENDPOINT;
// const projectID = process.env.REACT_APP_APPWRITE_PROJECT_ID;
// const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID;

const Endpoint = "https://hivefinty.com:8081/v1";
const projectID = "66d801600012257ea9c7";
const databaseId = "66d801b3002dfa732ea2";



const client = new Client();

client
  .setEndpoint(Endpoint) // Your Appwrite Endpoint
  .setProject(projectID); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { databaseId,projectID };
