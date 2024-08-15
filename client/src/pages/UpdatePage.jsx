import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

function UpdatePage() {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  // Fetch the user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/users/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form submission to update user details
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/api/v1/users/${id}`, user);
      alert("User updated successfully!");
      // Optionally navigate to another page or give user feedback
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Name"
        variant="filled"
        color="secondary"
        value={user.name}
        onChange={(event) => setUser({ ...user, name: event.target.value })}
      />

      <TextField
        label="Email"
        variant="outlined"
        value={user.email}
        onChange={(event) => setUser({ ...user, email: event.target.value })}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={user.password}
        onChange={(event) => setUser({ ...user, password: event.target.value })}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Update
      </Button>
    </Box>
  );
}

export default UpdatePage;
