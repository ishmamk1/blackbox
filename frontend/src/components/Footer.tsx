import React, { useState } from "react";

const Footer: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (phoneNumber) {
      alert(`Phone number submitted: ${phoneNumber}`);
      // Here you can also send the phone number to your backend if needed
    } else {
      alert("Please enter a phone number.");
    }

    
  };

  return (
    <footer style={footerStyles}>
      <div style={{ textAlign: "center" }}>
        <h3>Enter Your Phone Number</h3>
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
