import React, { useState, useContext } from "react";
import { AppContext } from "../store/appContext";
import axios from "axios";

const Footer: React.FC = () => {
  const { state } = useContext(AppContext); // Access context state
  const { username } = state; // Extract username from state
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (phoneNumber) {
      try {
        // Send phone number to backend if username exists (user is logged in)
        await axios.post("http://127.0.0.1:5000/submit-phone", { username, phoneNumber });

        alert(`Phone number submitted: ${phoneNumber}`);
        // Optionally, handle success here (e.g., clear the form or show a success message)
      } catch (error) {
        console.error("Phone number submit error:", error);
        alert("Failed to submit phone number. Please try again.");
      }
    } else {
      alert("Please enter a phone number.");
    }
  };

  // Only render the footer if username exists (i.e., user is logged in)
  if (!username) {
    return null; // Don't render the footer if no user is logged in
  }

  return (
    <footer style={footerStyles}>
      <div style={{ textAlign: "center" }}>
        <h3>Welcome, {username}! Enter Your Phone Number</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your phone number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            style={inputStyles}
          />
          <button type="submit" style={buttonStyles}>
            Submit
          </button>
        </form>
      </div>
    </footer>
  );
};

// Inline styles
const footerStyles: React.CSSProperties = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px 0",
  marginTop: "20px",
};

const inputStyles: React.CSSProperties = {
  padding: "10px",
  margin: "5px",
  width: "250px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyles: React.CSSProperties = {
  padding: "10px 20px",
  margin: "5px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Footer;
