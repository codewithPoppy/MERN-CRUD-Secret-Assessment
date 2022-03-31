const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const SecretModel = require("./models/Secret");

const validator = (secret, expireAfter) => {
  if (!secret || !expireAfter || secret === "" || expireAfter <= 0)
    return { code: 405, errMessage: "Invalid input" };
  return { code: 200, errMessage: null };
};

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://pOppY-Secret:5A09da2LHbWx8uvY@cluster0.inkdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("successfully connected DB"))
  .catch((err) => console.log(err));

app.post("/secret", async (req, res) => {
  const { secret, expireAfter } = req.body;

  const { code, errMessage } = validator(secret, expireAfter);

  if (errMessage) return res.status(code).json;

  const createdAt = new Date();
  const expiresAt = new Date();
  expiresAt.setSeconds(createdAt.getSeconds() + parseInt(expireAfter));

  const newSecret = new SecretModel({
    hash: uuidv4(),
    secretText: secret,
    createdAt: createdAt,
    expiresAt: expiresAt,
  });

  try {
    await newSecret.save();
    return res.status(200).json({
      hash: newSecret.hash,
      secretText: newSecret.secretText,
      createdAt: newSecret.createdAt,
      expiresAt: newSecret.expiresAt,
    });
  } catch (err) {
    return res.status(405).json({ error: "Cannot create the secret" });
  }
});

app.get("/secret/:hash", async (req, res) => {
  const hash = req.params.hash;

  SecretModel.findOne({ hash: hash })
    .then((result) => {
      if (!result) return res.status(404).json({ error: "Secret not found" });

      const expireTime = new Date(result.expiresAt);
      const currentTime = new Date();

      if (expireTime.getTime() < currentTime.getTime())
        return res.status(404).json({ error: "Secret expired" });

      return res.status(200).json({
        hash: result.hash,
        secretText: result.secretText,
        createdAt: result.createdAt,
        expiresAt: result.expiresAt,
      });
    })
    .catch((err) => {
      return res.status(404).json({ error: "Secret not found" });
    });
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log("server runnig on port " + PORT);
});
