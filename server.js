//Some changes
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASS
);

//Connection with Hosted Database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    //console.log(con.connections);
    console.log("Connected with Hosted DataBase successfully!");
  });

//console.log(process.env);
const port = process.env.port;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}......`);
});
<<<<<<< HEAD

// //Some changes
// fmkefke
//changes made by anshu
=======
>>>>>>> 61b49750ddb5fa72faa82fc68574218d7343849f
