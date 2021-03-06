var Nightmare = require('nightmare'); 
var nightmare = Nightmare({ show: true });
const wat_action = require('wat-action');
const fs = require('fs');

var scenarioString = require('./scenario.json');
console.log(scenarioString)
const scenario = new wat_action.Scenario(scenarioString)
console.log("scenarioString")
const waitAction = new wat_action.WaitAction('5');
const scrollToAction = new wat_action.ScrollToAction('100', '200');



function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); 
      return num;
}

for(var i = 0; i < 5; i++)
    {
    var insertLocation = RandomNumBoth(1,scenario.actions.length-1);
    if(Math.random() < 0.5)
      {scenario.actions.splice(insertLocation,0,waitAction);}
    else
      {scenario.actions.splice(insertLocation,0,scrollToAction);}
    }

// console.log(JSON.stringify(scenario, null, 2));

var scenarioJson = JSON.stringify(JSON.parse(scenario.toJSON()),null,2);

  console.log(scenarioJson);

  var path = __dirname + '/scenario_noise.json';

  if(fs.existsSync(path) ){
    fs.unlinkSync(path);
  }

  fs.writeFile(path, scenarioJson, {flag: 'a'}, function (err) {
    if(err) {
      console.error(err);
    } else {
      console.log('write sucess');
    }
  });


