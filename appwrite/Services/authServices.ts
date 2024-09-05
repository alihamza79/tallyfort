import { account } from "../config";

// Define a User object type for return type (adjust as per actual API structure if needed)
interface User {
  $id: string;
  [key: string]: any; // Use this to allow other dynamic properties
}

interface Session {
  $id: string;
  [key: string]: any; // Use this to allow other dynamic properties
}

export async function registerUser(username: string, email: string, password: string): Promise<User> {
  const user = await account.create("unique()", email, password, username);
  localStorage.setItem("authToken", user.$id);
  return user;
}

export const signIn = async (email: string, password: string): Promise<Session> => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    localStorage.setItem("authToken", session.$id); // Store the session ID
    return session;
  } catch (error: any) {
    console.error("Login error:", error); // Log the error details
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await account.deleteSession('current');
    localStorage.removeItem("authToken");
  } catch (error: any) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const user = await account.get();
    return user;
  } catch (error: any) {
    throw error;
  }
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    await account.get(); // If this doesn't throw an error, the user is authenticated
    return true;
  } catch (error: any) {
    return false;
  }
};

export const sendPasswordRecoveryEmail = async (email: string): Promise<void> => {
  const resetPasswordUrl = `${window.location.origin}/reset-password`; // Automatically construct URL
  try {
    await account.createRecovery(email, resetPasswordUrl);
  } catch (error: any) {
    throw error;
  }
};
