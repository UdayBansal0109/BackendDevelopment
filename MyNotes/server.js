const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

// MongoDB connection
const mongoURL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(mongoURL);

let notesCollection;

// EJS configuration
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();

        const database = client.db("notes_lab");
        notesCollection = database.collection("notes");

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}

// Home page
app.get("/", async(req, res) => {
    try {
        const notes = await notesCollection
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        res.render("index", {
            notes: notes
        });

    } catch (error) {
        res.status(500).send("Error loading notes");
    }
});

// Add note page
app.get("/notes/new", (req, res) => {
    res.render("new");
});

// Add note
app.post("/notes", async(req, res) => {
    try {
        // PROOF: this runs on YOUR server
        console.log("Request received by YOUR server");
        console.log("Server time:", new Date());

        const { title, content, category } = req.body;

        if (!title.trim() || !content.trim()) {
            return res.send(`
                <h2>Title and content are required.</h2>
                <a href="/notes/new">Go Back</a>
            `);
        }

        await notesCollection.insertOne({
            title: title.trim(),
            content: content.trim(),
            category: category.trim(),
            createdAt: new Date(),
            serverName: "YOUR LAPTOP"
        });

        res.redirect("/");

    } catch (error) {
        res.status(500).send("Error adding note");
    }
});

// Delete note
app.post("/notes/:id/delete", async(req, res) => {
    try {
        const id = req.params.id;

        await notesCollection.deleteOne({
            _id: new ObjectId(id)
        });

        res.redirect("/");

    } catch (error) {
        res.status(500).send("Error deleting note");
    }
});

// Start server
connectDB().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log("YOUR SERVER running on port 3000");
        console.log("Open using your laptop IP address");
    });
});