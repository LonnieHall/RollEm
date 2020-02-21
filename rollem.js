/*********************************************************************
** Author: Lonnie Hall
** Created: 02/18/20
** Last Modified: 02/20/20
** Description: Script file for rolling dice in browser
** Dependencies: None.
*********************************************************************/

var numDice = document.getElementById('numDice').value;
var numSides = document.getElementById('numSides').value;
var numResult = document.getElementById('numResult');
var dieSpeed = [];
var dieResult = [];
var rollSpeed = 0;
var result = 1;
var animationSides = 6;

function btnRollClicked() 
{		
	rollSpeed = 0;
	removeDice();
	numSides = document.getElementById('numSides').value;	
	numDice = document.getElementById('numDice').value;		
	if (numSides < 1) { numSides = 6; document.getElementById('numSides').value = 6; }
	if (numDice < 1) { numDice = 1; document.getElementById('numDice').value = 1; }	
	spawnDice();	
	if (numSides == 4) { animationSides = 4; }	
	else { animationSides = 6;}	
	moveDiceRight();
}

function spawnDice()
{
	dieSpeed.clear;
	dieResult.clear;
	for (i = 0; i < numDice; i++) 
	{
		var img = document.createElement('img');
		img.src = "img/d6s2.png";
		img.id = "imgD" + i;		
		img.style.position = 'relative';
		img.style.left = '10px';
		img.className = 'cDieImage';
		img.style.width = 50 / numDice
		document.getElementById('divDiceArea').appendChild(img);
		
		var br = document.createElement('br');
		br.id = "brD" + i;
		document.getElementById('divDiceArea').appendChild(br);		
		
		dieSpeed[i] = rollDice(6, 3, 5); // Initial speed is 8-23 with a bell shaped probability distribution		
		if (rollSpeed < dieSpeed[i]) { rollSpeed = dieSpeed[i]; }
	}	
}

function removeDice()
{
	for (i = 0; i < numDice; i++) 
	{
		var die = document.getElementById("imgD" + i);
		if (die != null) { die.remove(); }
		
		var br = document.getElementById("brD" + i);
		if (br != null) { br.remove(); }
	}	
}

function moveDiceRight()
{
	rollSpeed = rollSpeed - 1;
	if (rollSpeed > 0) 
	{ 
		result = (result % animationSides) + 1; animate = setTimeout(moveDiceRight, 20); 
	}
	else { result = 0; }
	
	for (i = 0; i < numDice; i++) 
	{
		var die = document.getElementById("imgD" + i);
		if (die != null) 
		{
			dieSpeed[i] = dieSpeed[i] - 1;
			if (dieSpeed[i] > 0)
			{				
				die.style.left = parseInt(die.style.left) + dieSpeed[i] + 'px';
				miniResult = ((result - 1 + i) % animationSides) + 1;
				die.src = "img/d" + animationSides + "s" + miniResult + ".png";				
				die.style.transform = 'rotate(' + 15 * miniResult + 'deg)';
			}
			else if (dieSpeed[i] == 0)
			{
				dieSpeed[i] = -1;
				dieResult[i] = rollDice(animationSides, 1, 0);				
				die.src = "img/d" + animationSides + "s" + dieResult[i] + ".png";
				if (numSides != animationSides) { dieResult[i] = rollDice(numSides, 1, 0); }				
			}
		}		
	}
	if (rollSpeed == 0) 
	{ 
		for (i = 0; i < numDice; i++)
		{ result = result + dieResult[i]; }
		numResult.value = result; 
	}
}


function rollDice(sides, count, add)
{
    var result = 0;
    for (var i = 0; i < count; i++)
    { result += Math.floor(Math.random() * sides + 1); }
    result += add;
    return result;
}
