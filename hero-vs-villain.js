
//
const superheroes = require("superheroes");
const supervillains = require("supervillains");
const DDG = require('node-ddg-api').DDG;
const wiki = require("wikijs").default;

var mySuperhero = superheroes.random();
var myVillain   = supervillains.random();
var heroAbstract = "";
var villainAbstract = "";
var heroWiki = "";
var villainWiki = "";

console.log(mySuperhero + " vs. " + myVillain);
console.log("-");

var ddg = new DDG('index.js');

ddg.instantAnswer(mySuperhero, {skip_disambig:"0"}, function(err, heroResponse) {

  heroType     = heroResponse['Type'];
  heroAbstract = heroResponse['Abstract'];
  heroWiki     = heroResponse['AbstractURL'];

  console.log(mySuperhero + " => Type:" + heroType + " Abstract: " + heroAbstract);
  console.log(heroWiki);
  if(heroType == "D") {
    console.log("disambiguation:");
    console.log(heroResponse['RelatedTopics']);
  }
  if(err) console.console.error(err);
  console.log(" ");

});
ddg.instantAnswer(myVillain, {skip_disambig:"0"}, function(err, villainResponse) {

  villainType     = villainResponse['Type'];
  villainAbstract = villainResponse['Abstract'];
  villainWiki     = villainResponse['AbstractURL'];

  console.log(myVillain + " => Type:" + villainType + " Abstract: " + villainAbstract);
  console.log(villainWiki);
  if(villainType == "D") {
    console.log("disambiguation:");
    console.log(villainResponse['RelatedTopics']);
  }

  if(err) console.console.error(err);
  console.log(" ");

});

console.log("Wikipedia entries...");
wiki().page(mySuperhero)
  .then(page => page.info())
  .then(console.log);
wiki().page(myVillain)
  .then(page => page.info())
  .then(console.log);
