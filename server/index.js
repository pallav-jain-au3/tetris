const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000


app.use('/', require('./routes/routes'))

app.listen(PORT, () => console.log(`listenning on port ${PORT}`))