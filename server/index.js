require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8081;

// --- Middleware ---
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // 👈 put your frontend (Lovable) URL here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// --- Mongo Connection ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('✅ Mongo connected'))
.catch(err => console.error('❌ Mongo error', err));

// --- Routes ---
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const regRoutes = require('./routes/registrations');

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/registrations', regRoutes);

// --- Start server ---
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
