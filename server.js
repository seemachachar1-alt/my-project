
const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Temporary database
const users = [];

// ==========================
// 1. POST API - Register User
// ==========================

app.post("/users", (req, res) => {

    const { username, contactNumber, address } = req.body;

    if (!username || !contactNumber || !address) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser = users.find(
        user => user.contactNumber === contactNumber
    );

    if (existingUser) {
        return res.status(400).json({
            message: "Contact number already exists"
        });
    }

    const newUser = {
        id: users.length + 1,
        username,
        contactNumber,
        address
    };

    users.push(newUser);

    res.status(201).json({
        message: "User Registered Successfully",
        user: newUser
    });
});


// ==========================
// 2. GET API - Get All Users
// ==========================

app.get("/users", (req, res) => {

    res.status(200).json({
        message: "Users Registerd Successfully",
        users: users
    });

});


// ==========================
// 3. PUT API - Update User
// ==========================

app.put("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const { username, contactNumber, address } = req.body;

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    if (!username || !contactNumber || !address) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const existingUser = users.find(
        user =>
            user.contactNumber === contactNumber &&
            user.id !== id
    );

    if (existingUser) {
        return res.status(400).json({
            message: "Contact Number Already Exists"
        });
    }

    user.username = username;
    user.contactNumber = contactNumber;
    user.address = address;

    res.status(200).json({
        message: "User Updated Successfully",
        user: user
    });

});


// ==========================
// 4. DELETE API - Delete User
// ==========================

app.delete("/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const userIndex = users.findIndex(
        user => user.id === id
    );

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
        message: "User Deleted Successfully",
        user: deletedUser[0]
    });

});


// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
