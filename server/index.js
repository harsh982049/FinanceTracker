require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/tracker', recordRoutes);

const start = async () => {
    try
    {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on ${port}`));
    }
    catch(error)
    {
        console.log(error);
    }
};
start();


