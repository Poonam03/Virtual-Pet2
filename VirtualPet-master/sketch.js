//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
var foodObj,fedTime,lastFed; 
var feedDog,addfoods
function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");

  happyDog=loadImage("happydog.png");
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database();
  foodObj =new Milk();
  dog=createSprite(900,250,20,20);
  dog.addImage(dogImg);
  dog.scale=0.2;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(fedDog);

  addfood=createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFoods);
  

  foodStock=database.ref('Food');
  foodStock.on("value",function(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
  })
}


function draw() {  
  background(46,139,87);
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed  : "+lastFed % 12 + "PM",350,30);

  }
  else if(lastFed===0)
  {
    text("Last Feed  : "+lastFed + "AM",350,30);
  }
  drawSprites();
  //add styles here

}

function fedDog()
{
  
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}