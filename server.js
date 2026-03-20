const express = require("express");
const app = express();
const axios = require("axios");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/weather", (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/3.0/weather?q=${city}&appid=1e58efc8475825e90796f28a3e2d14f4`;

    axios
    .get(url)
    .then((response) => {
        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
        };
        res.json(weatherData);
    })
    .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});