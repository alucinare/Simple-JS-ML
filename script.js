// interestingly when I kept pressing the start button it would speed up! This I was not expecting to happen!

// iterates the count
var c = 0;
var aiPos = 0;
var walls = 0;
var avoided = 0;
var crash = 0;

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
      tickInterval = setInterval("tick()", 20);
    }
  }
  else //stop stimulation
  {
    clearInterval(tickInterval);
    c = 0;
    document.getElementById('stepsDone').value = c;
    document.getElementById('wall').style.left = null;
    document.getElementById('wall').style.right = '0px';
    document.getElementById('ai').style.marginTop = '50px';
    aiPos = 0;
    walls = 0;
    avoided = 0;
    crash = 0;

  }
};


// function to move the wall
function moveWall() {
  var getWallX = document.getElementById('wall').offsetLeft;
  var getWallY = document.getElementById('wall').offsetTop;

  var getAIX = document.getElementById('sensor_2').offsetLeft + 500;
  var getAIY = document.getElementById('ai').offsetTop;

  var successRate = Math.floor((avoided/(avoided + crash) * 100));

  document.getElementById('topDebug').innerHTML = "&nbsp; [" + c + "]<br>&nbsp;Wall (" + getWallX + "," + getWallY + ")<br>&nbsp;AI(" + getAIX + "," + getAIY + ")<br>&nbspWalls:" + walls + " Avoided: " + avoided + "Crash: " + crash + " Success rate: " + successRate + "%";

  if(getWallX <= 0)
  {
    var randomWallYPos = Math.floor(Math.random() * (200 + 1) + 0);
    document.getElementById('wall').style.marginTop = randomWallYPos + "px";

    document.getElementById('wall').style.left = null;
    document.getElementById('wall').style.right = '0px';

    walls++;
  }
  else
  {
    getWallX = getWallX - 20;
    document.getElementById('wall').style.left = getWallX + 'px';
  }
};

function moveCar(direction)
{

  if (aiPos < 50)
  {
    aiPos = 50;
  }
  if (aiPos > 200)
  {
      aiPos = 200;
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

  // document.getElementById('debugTextarea').innerHTML += "[" + c + "] Wall PosX: " + getWallX +  "| Wall PosY: " + getWallY + "\n";
  // document.getElementById('debugTextarea').scrollTop = document.getElementById('debugTextarea').scrollHeight;


  if(getwallX < getAIX && getAIY >= getwallY - 100 && getAIY < getwallY || getwallX < getAIX && getwallY - 100 > getAIY && getwallY - 100 < getAIY + 50)
  {
    moveCar('down');
    document.getElementById('sensor_2').style.backgroundColor = 'red';

    if (getwallX < 100)
    {
        crash++;
    }

  }
  else
  {
    document.getElementById('sensor_2').style.backgroundColor = 'white';

    if (getwallX < 100)
    {
      avoided++;
    }
  }
}
