import express from "express";

const app = express();
import { getUser, getUsers, createUser } from "./database.js";

app.get("/api/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.post("/api/users/:email", async (req, res) => {
  const user = await getUser(req.params.email);
  res.send({
    success: 1,
    res: user,
  });
});

app.post("/api/user", async (req, res) => {
  const { fname, mname, lname, role, email, dob, password } = req.body;
  const user = await createUser(
    fname,
    mname,
    lname,
    role,
    email,
    dob,
    password
  );
  res.send(user);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("server is runnning on port 8080");
});
