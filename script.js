// interestingly when I kept pressing the start button it would speed up! This I was not expecting to happen!

// iterates the count
var c = 0;
var aiPos = 0;

function tick(){
    c++;
    document.getElementById('stepsDone').value = c;
    moveWall() // move wall to left and right
    checkCollision();
};

// buttons to run the simulation
var tickInterval;

function runSim(state) {

  if(state == 1)//run simulation
  {
    if(c > 100) //force stop
    {
      runSim('0');
    }
    else
    {
      tickInterval = setInterval("tick()", 100);
    }
  }
  else //stop stimulation
  {
    clearInterval(tickInterval);
    c = 0;
    document.getElementById('stepsDone').value = c;
    document.getElementById('wall').style.left = null;
    document.getElementById('wall').style.right = '0px';
    document.getElementById('ai').style.marginTop = '0px';
    aiPos = 0;
  }
};


// function to move the wall
function moveWall() {
  var getWallX = document.getElementById('wall').offsetLeft;
  var getWallY = document.getElementById('wall').offsetTop;

  document.getElementById('debugTextarea').innerHTML += "[" + c + "] Wall PosX: " + getWallX +  "| Wall PosY: " + getWallY + "\n";

  document.getElementById('debugTextarea').scrollTop = document.getElementById('debugTextarea').scrollHeight;

  if(getWallX <= 0)
  {
    document.getElementById('wall').style.left = null;
    document.getElementById('wall').style.right = '0px';
  }
  else
  {
    getWallX = getWallX - 40;
    document.getElementById('wall').style.left = getWallX + 'px';
  }
};

function moveCar(direction)
{

  if (aiPos < 0)
  {
    aiPos = 0;
  }
  if (aiPos > 250)
  {
      aiPos = 250;
  }


  if (direction == 'down')
  {
      aiPos = aiPos + 10;
  }
  else
  {
      aiPos = aiPos - 10;
  }

  document.getElementById('ai').style.marginTop = aiPos + "px";
}


function checkCollision()
{
  // this gets the position of the wall on the x and y axis and assigns it to a variable
  var getwallX = document.getElementById('wall').offsetLeft;
  var getwallY = document.getElementById('wall').offsetTop + 100;

  var getAIX = document.getElementById('sensor_2').offsetLeft + 500;
  var getAIY = document.getElementById('ai').offsetTop;

  if(getwallX < getAIX && getAIY < getwallY)
  {
    moveCar('down');
  }
}
