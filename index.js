const ip = require("ip");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const ipAdr = ip.address();

let lastHouseVisited = "Gryffindor";

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/start"));

app.get("/", (req, res) => {
  res.json({ message: lastHouseVisited });
});

app.post("/updateLed", (req, res) => {
  const { house } = req.body;
  console.log("House received for LED:", house);
  lastHouseVisited = house;
  res.json({ success: true, message: `LED color updated to ${house}` });
});


const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Server listening at http://${ipAdr}:${port}`);
    console.log(`Last house visited: ${lastHouseVisited}`);
  });
};

initializeApp();

