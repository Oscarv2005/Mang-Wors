import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is operational.');
});

// ─── DB Connection ────────────────────────────────────────────────────────────
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");
  await mongoose.connect(process.env.MONGO_URI);
};

// ─── Schemas ──────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

const chapterSchema = new mongoose.Schema({
  chapterTitle: { type: String, required: true },
  pages: { type: [String], default: [] },
  pdfUrl: { type: String, default: "" }
});

const mangaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  chapters: { type: [chapterSchema], default: [] }
});
const Manga = mongoose.models.Manga || mongoose.model('Manga', mangaSchema);

// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  try {
    await connectToDatabase();
    const { username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ success: false, message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    await connectToDatabase();
    const { username, password } = req.body;

    // Admin shortcut — consider moving to env vars for production
    if (username === "admin@manga.com" && password === "manga123") {
      return res.status(200).json({ success: true, role: "admin" });
    }

    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({ success: true, role: "user" });
    }
    res.status(401).json({ success: false, message: "Invalid credentials." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── Manga Routes ─────────────────────────────────────────────────────────────
// GET all mangas
app.get('/api/mangas', async (req, res) => {
  try {
    await connectToDatabase();
    const mangas = await Manga.find({});
    res.status(200).json(mangas);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST create a new manga
app.post('/api/mangas', async (req, res) => {
  try {
    await connectToDatabase();
    const { title, image, description } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required." });
    const manga = await Manga.create({ title, image, description });
    res.status(201).json(manga);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE a manga
app.delete('/api/mangas/:mangaId', async (req, res) => {
  try {
    await connectToDatabase();
    await Manga.findByIdAndDelete(req.params.mangaId);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── Chapter Routes ───────────────────────────────────────────────────────────
// POST add a chapter to a manga
app.post('/api/mangas/:mangaId/chapters', async (req, res) => {
  try {
    await connectToDatabase();
    const { chapterTitle, pages, pdfUrl } = req.body;
    if (!chapterTitle) return res.status(400).json({ success: false, message: "Chapter title required." });

    // pages can be sent as a comma/newline separated string or already an array
    let parsedPages = [];
    if (Array.isArray(pages)) {
      parsedPages = pages.filter(p => p.trim());
    } else if (typeof pages === 'string' && pages.trim()) {
      parsedPages = pages.split(/[\n,]+/).map(p => p.trim()).filter(Boolean);
    }

    const manga = await Manga.findById(req.params.mangaId);
    if (!manga) return res.status(404).json({ success: false, message: "Manga not found." });

    manga.chapters.push({ chapterTitle, pages: parsedPages, pdfUrl: pdfUrl || "" });
    await manga.save();
    res.status(201).json(manga);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE a chapter from a manga
app.delete('/api/mangas/:mangaId/chapters/:chapterId', async (req, res) => {
  try {
    await connectToDatabase();
    const manga = await Manga.findById(req.params.mangaId);
    if (!manga) return res.status(404).json({ success: false, message: "Manga not found." });

    manga.chapters = manga.chapters.filter(c => c._id.toString() !== req.params.chapterId);
    await manga.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default app;
