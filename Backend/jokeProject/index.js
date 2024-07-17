import express from "express";
import axios from "axios";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/submit", async (req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Dark");
        console.log(response.data);
        const setup = response.data.setup;
        const delivery = response.data.delivery;
        const type = response.data.type;
        const joke = response.data.joke;
        if (type === "single"){
            res.render("index.ejs", {
                type: type,
                joke: joke,
            })
        }
        else if (type === "twopart") {
            res.render("index.ejs", {
                type: type,
                setup: setup,
                delivery: delivery
            })
        }
        
      } catch (error) {
        console.error("Failed to make request", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
  });





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  