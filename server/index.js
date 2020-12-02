const $ = require( "jquery");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myauc', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json())
app.use(express.static('tmp'))
app.use(cors())

const aucs = new mongoose.Schema({
  time: String,
  club : String,
  appId: String,
  clientId: String
})
const Auc = mongoose.model('Aucs', aucs)

app.get('/', async (req, res) => {
  const auc = await Auc.find().exec()
  res.status(200).json({
    auc: auc
  })
})

app.post('/auc', async (req, res) => {
  const newAuc = new Auc({
    time: req.body.time,
    club : req.body.club,
    appId: req.body.appId,
    clientId: req.body.clientId
  })
  console.log(req.body.time);
  const result = await newAuc.save()
  res.json(result)
})

// setInterval(async () => {
//   var tim = new Date()
//   console.log(tim);
//   const auc = await Auc.find().exec()
//   if(auc){
//     auc.forEach(async element => {
//       var minsec = element.time.split(':').join(',').split(' ').join(',').split(',')
//       console.log(minsec[4]);
//       console.log(tim.getHours());
//       if((minsec[6] == tim.getSeconds() || minsec[6] == tim.getSeconds() - 1)
//        && minsec[5] == tim.getMinutes() && minsec[4] == tim.getHours())
//        {
//       $.ajax({ 
//           url: 'https://corp.fidelity.kz/reserve_s.php?callback=', 
//           dataType: "jsonp",
//           method: "POST", 
//           data: {"club" : `${element.club}`, "appID": `${element.appId}`, "clientID": `${element.clientId}`},
//           success: function(data) {
//         if (data.Error > 0){
//           console.log(data.ErrorMessage);
//           return false;
//         }
//           console.log('Запись успешна!');}
//       });
//       }
//     });
//   }
// }, 1000)
// setInterval(async () => {
// const auc = await Auc.find().exec()
// var element = auc[0]
jQuery.ajax({ 
  url: 'https://corp.fidelity.kz/reserve_s.php?callback=', 
  dataType: "jsonp",
  method: "POST", 
  data: {"club" : `ae3bb04c-ced3-11e9-80b9-00e081d7566e`, "appID": `7bd3e21b-0f98-45a6-967f-eb8a31a139ac`, "clientID": `fa3eabfb-6425-11ea-80bb-04d4c4d2b370`},
  success: function(data) {
if (data.Error > 0){
  console.log(data.ErrorMessage);
  console.log(1);
  return false;
}
  console.log('Запись успешна!');}
});
//  }, 100000)
app.listen(3000, '0.0.0.0')
