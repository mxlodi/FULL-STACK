import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  // Table
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,

  // Input form
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";

// MUI Icons
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function ViewPage() {
  // Initial state
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/users",
        newUser
      );
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Handle Update
  const handleUpdate = async (id) => {
    console.log("Update clicked for user:", id); // Debugging line
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/v1/users/${id}`,
        { name: newUser.name, email: newUser.email }
      );
      setUsers(users.map((user) => (user._id === id ? response.data : user)));

      // Navigate to the UpdatePage after a successful update
      console.log("Navigating to update page:", `/update-page/${id}`); // Debugging line
      navigate(`/update-page/:${id}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    console.log("Click Delete");
    try {
      await axios.delete(`http://localhost:3001/api/v1/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      {/* Input Form */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Name"
          variant="filled"
          color="secondary"
          value={newUser.name}
          onChange={(event) =>
            setNewUser({ ...newUser, name: event.target.value })
          }
        />

        <TextField
          label="Email"
          variant="outlined"
          value={newUser.email}
          onChange={(event) =>
            setNewUser({ ...newUser, email: event.target.value })
          }
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={newUser.password}
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                {/* Udpate */}
                <BorderColorIcon onClick={() => handleUpdate(user._id)} />
                {/* Delete */}
                <DeleteForeverIcon
                  sx={{
                    color: "red",
                    ":hover": { color: "orange", cursor: "pointer" },
                  }}
                  onClick={() => handleDelete(user._id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewPage;
