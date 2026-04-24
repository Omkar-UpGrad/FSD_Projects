const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const requestIp = require('request-ip');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/moviemania')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// Schema with Fraud Protection
const FavoriteSchema = new mongoose.Schema({
    imdbID: { type: String, required: true }, // Changed from movieId to imdbID
    title: String,
    poster: String, // Changed from poster_path
    visitorId: { type: String, required: true },
    ip: String,
    createdAt: { type: Date, default: Date.now }
});

// CRITICAL: Prevent same device from liking same movie twice
FavoriteSchema.index({ imdbID: 1, visitorId: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', FavoriteSchema);

// Rate Limiter
const favLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 15,
    message: { error: "Too many requests. Please wait 10 minutes." }
});

// --- ROUTES ---

// Search Movies (OMDb Proxy)
app.get('/api/movies/search', async (req, res) => {
    try {
        const { query } = req.query;
        // OMDb uses 's' for search. Note: OMDb requires an API Key
        const response = await axios.get(
            `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`
        );
        
        // OMDb returns { Search: [...], totalResults: "...", Response: "True/False" }
        if (response.data.Response === "True") {
            res.json(response.data.Search);
        } else {
            res.json([]);
        }
    } catch (err) {
        res.status(500).json({ error: "OMDb Search failed" });
    }
});

// Get Global Favorites (Unique list)
app.get('/api/favorites', async (req, res) => {
    try {
        const favs = await Favorite.aggregate([
            { $group: { 
                _id: "$imdbID", 
                title: { $first: "$title" }, 
                poster: { $first: "$poster" }, 
                count: { $sum: 1 } 
            } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json(favs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
});

// Add to Favorite
app.post('/api/favorites', favLimiter, async (req, res) => {
    const { imdbID, title, poster, visitorId } = req.body;
    const clientIp = requestIp.getClientIp(req);

    try {
        const newFav = new Favorite({ imdbID, title, poster, visitorId, ip: clientIp });
        await newFav.save();
        res.status(201).json({ message: "Added to favorites!" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "You already favorited this movie!" });
        }
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));