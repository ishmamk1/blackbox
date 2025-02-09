import { useState, useEffect } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

// Define your LiveKit server URL (replace with your actual server)
const ROOM_URL: string = "wss://blackbox-w03vmqbp.livekit.cloud"; // Change this

// Generates a random user identity (can be replaced with authentication logic)
const IDENTITY: string = `user-${Math.floor(Math.random() * 1000)}`;
const ROOM: string = "my-room"; // Set dynamically if needed

// Function to fetch the authentication token from the Flask backend
async function fetchToken(identity: string, room: string): Promise<string> {
  try {
    const response = await fetch(`http://localhost:5000/get_livekit_token?identity=${identity}&room=${room}`);
    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return "";
  }
}

export default function LiveKitStream(): JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchToken(IDENTITY, ROOM)
      .then((token) => {
        if (token) {
          setToken(token);
        } else {
          setError("Failed to retrieve token");
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!token) return <p>Loading...</p>;

  return (
    <LiveKitRoom serverUrl={ROOM_URL} token={token} connect>
      <VideoConference />
    </LiveKitRoom>
  );
}

