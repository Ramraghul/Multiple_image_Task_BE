const mongoose = require('mongoose');
let Link = "mongodb://localhost:27017/User"
mongoose.set("strictQuery", false);

mongoose.connect(`${Link}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Connected Done");
}).catch((error) => {
    console.log(error);
})