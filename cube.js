// Cube.js configuration options: https://cube.dev/docs/config
const mongoose = require("mongoose");
const cors = require("cors");
module.exports = {
    processSubscriptionsInterval:1,
    orchestratorOptions: {
      queryCacheOptions: {
        refreshKeyRenewalThreshold: 1,
      }
    },
    initApp: (app) => {
      app.use(cors());
      mongoose.connect('mongodb://localhost:27017/demoDatabase', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify:false
      })
      .then(() => {console.log("Mongodb cluster connected Successfully");})
      .catch((err) => console.log(err));

      const eventSchema = new mongoose.Schema({
        name: String,
        clicks: Number
      });

      const Event = mongoose.model("Event", eventSchema);
      app.post('/update', async(req, res, next) => {
        try {
          const button = await Event.findOne({name: req.body.name});
          button.clicks++;
          button.save()
          .then((response) => res.send(response))
          .catch((err) => res.send(err));
        }
        catch(err) {
          console.log(next(err));
        }
      });
    }
  };