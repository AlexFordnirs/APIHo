const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const port = 3000;

app.use(express.json());

const documentRoutes = require('./routes/documentRoutes');
app.use('/documents', documentRoutes);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
