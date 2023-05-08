const mongoose = require("mongoose");
const express = require("express");
const Document = require("./Document")
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://127.0.0.1:27017/test')
	.then(() => console.log('Connected!'));
mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({ 
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const io = require("socket.io")(3001, {
	cors: {
		origin: ['http://localhost:3000', 'http://localhost:3002'],
		methods: ['GET', 'POST']
	},
})

const defaultValue = ""

io.on("connection", socket => {
	socket.on('get-document', async documentid => {
		const document = await findOrCreateDocument(documentid)
		socket.join(documentid)
		socket.emit("load-document", document.data)

		socket.on("send-changes", delta => {

			socket.broadcast.to(documentid).emit("receive-changes", delta)
		})
		socket.on("save-document", async data => {
			await Document.findByIdAndUpdate(documentid, { data })
		})
	});
})

async function findOrCreateDocument(id) {
	if (id == null) return
	const document = await Document.findById(id)
	if (document) return document
	return await Document.create({ _id: id, data: defaultValue })
}

// create index on username field to ensure uniqueness
userSchema.index({ username: 1 }, { unique: true });

// hash password before saving to database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

app.get('/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get("/", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({
    username: username,
    password: password
  });
  try {
    await user.save();
    res.status(200).json({ message: "Sign up successful!" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: "Username already exists." });
    } else {
      console.log(err);
      res.status(400).json({ error: `Sign up failed: ${err.message}` });
    }
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log(`Server running on port ${port}`);
}); 

