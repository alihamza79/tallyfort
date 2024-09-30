import { Client, Account, Databases, Storage } from "appwrite";

// Access environment variables
// const Endpoint = process.env.REACT_APP_APPWRITE_ENDPOINT;
// const projectID = process.env.REACT_APP_APPWRITE_PROJECT_ID;
// const databaseId = process.env.REACT_APP_APPWRITE_DATABASE_ID;

const Endpoint = "https://centralapps.hivefinty.com/v1";
const projectID = "66fa61e1002b7ab74f81";
const databaseId = "66fa680800241167c183";



const client = new Client();

client
  .setEndpoint(Endpoint) // Your Appwrite Endpoint
  .setProject(projectID); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { databaseId,projectID };
