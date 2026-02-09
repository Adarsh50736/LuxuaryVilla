const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const villaRoutes = require('./routes/villaRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');


dotenv.config();
const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

const bookingRoutes = require('./routes/bookingRoutes');


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/villas', villaRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', authRoutes); 
app.use('/api/bookings', bookingRoutes)


app.use('/api/admin', adminRoutes);




app.get("/",(req,res)=>{
    res.send("running")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
