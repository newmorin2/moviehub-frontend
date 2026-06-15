import { auth } from "../firebase/firebase";

export async function fetchProtectedData() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      console.error("No user logged in!");
      return null;
    }


    const token = await user.getIdToken();

    const response = await fetch("http://127.0.0.1:8000/my-watchlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from backend");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}