var points = ""
const zones = [
	{"name":"Teldrassil","continent":0,"object":null},
	{"name":"Darkshore","continent":0,"object":null},
	{"name":"Felwood","continent":0,"object":null},
	{"name":"Winterspring","continent":0,"object":null},
	{"name":"Moonglade","continent":0,"object":null},
	{"name":"Ashenvale","continent":0,"object":null},
	{"name":"Stonetalon Mountains","continent":0,"object":null},
	{"name":"Azshara","continent":0,"object":null},
	{"name":"Durotar","continent":0,"object":null},
	{"name":"The Barrens","continent":0,"object":null},
	{"name":"Dustwallow Marsh","continent":0,"object":null},
	{"name":"Desolace","continent":0,"object":null},
	{"name":"Mulgore","continent":0,"object":null},
	{"name":"Thousand Needles","continent":0,"object":null},
	{"name":"Feralas","continent":0,"object":null},
	{"name":"Silithus","continent":0,"object":null},
	{"name":"Un'goro Crater","continent":0,"object":null},
	{"name":"Tanaris","continent":0,"object":null},

	{"name":"Tirisfal Glades","continent":1,"object":null},
	{"name":"Western Plaguelands","continent":1,"object":null},
	{"name":"Eastern Plaguelands","continent":1,"object":null},
	{"name":"Silverpine Forest","continent":1,"object":null},
	{"name":"Alterac Mountains","continent":1,"object":null},
	{"name":"Hillsbrad Foothills","continent":1,"object":null},
	{"name":"Hinterlands","continent":1,"object":null},
	{"name":"Arathi Highlands","continent":1,"object":null},
	{"name":"Wetlands","continent":1,"object":null},
	{"name":"Loch Modan","continent":1,"object":null},
	{"name":"Dun Morogh","continent":1,"object":null},
	{"name":"Searing Gorge","continent":1,"object":null},
	{"name":"Badlands","continent":1,"object":null},
	{"name":"Burning Steppes","continent":1,"object":null},
	{"name":"Elwynn Forest","continent":1,"object":null},
	{"name":"Redridge Mountains","continent":1,"object":null},
	{"name":"Westfall","continent":1,"object":null},
	{"name":"Duskwood","continent":1,"object":null},
	{"name":"Deadwind Pass","continent":1,"object":null},
	{"name":"Swamp of Sorrows","continent":1,"object":null},
	{"name":"Stranglethorn Vale","continent":1,"object":null},
	{"name":"Blasted Lands","continent":1,"object":null},
]
zonestopick = []
zonesclear = []

var mainAzeroth = document.getElementById("mainAzeroth");
var continent = 1;
const zoneShroud = 'rgba(0,0,0,0.5)';
const zoneHighlight = 'rgba(255,255,255,0.25)';
const zoneReveal = 'rgba(224,255,224,0)';
var svgmainAzeroth = document.getElementById("svgmainAzeroth");
var svgmainMaelstrom = document.getElementById("svgmainMaelstrom");
var resultmain = document.getElementById("result");
var objectivemain = document.getElementById("objective");
var mistakesmain = document.getElementById("mistakes");
var mistakesnum = 0;
var timestart = 0;
var timeend = 0;
var tooltipmain = document.getElementById("tooltip");
document.addEventListener('mousemove', (e)=>{
	tooltipmain.style.left = event.clientX;
	tooltipmain.style.top = event.clientY;
});
var c = 0;
for (let i = 0; i < svgmainAzeroth.children.length; i++)
{
    if (svgmainAzeroth.children[i].tagName != 'polygon')
    {
        continue;
    }
    zones[c]["object"] = svgmainAzeroth.children[i];
    if (zones[c]["continent"] == 0)
    {
        for (let j = 0; j < zones[c]["object"].points.length; j++)
        {
            let point = zones[c]["object"].points.getItem(j);
            point.x = point.x * 0.82 - 182;
            point.y = point.y * 0.82 + 43;
        }
    }
    else
    {
        for (let j = 0; j < zones[c]["object"].points.length; j++)
        {
            let point = zones[c]["object"].points.getItem(j);
            point.x = point.x * 0.78 + 380;
            point.y = point.y * 0.78 + 57;
        }
    }
    c++;
}
resultmain.innerText = "Click on any zone to start.";
mistakesmain.innerText = "";
gameend();

function gameend()
{
	mistakesnum = 0;
	tooltipmain.innerText = "";
	for (let i = 0; i < zones.length; i++)
	{
		zones[i]["object"].style.fill='rgb(255,255,255)';
		zones[i]["object"].onclick = function(){ rollreset(i); };
		zones[i]["object"].setAttribute('filter','url(#nullAzeroth)');
		zones[i]["object"].onmouseenter = function() {
			this.setAttribute('filter','url(#highlightAzeroth)');
			tooltipmain.innerText = zones[i]["name"];
		};
		zones[i]["object"].onmouseleave = function() {
			this.setAttribute('filter','url(#nullAzeroth)');
			tooltipmain.innerText = "";
		};
	}
}

function rollreset(ii)
{
	mistakesmain.innerText = "Mistakes: " + mistakesnum;
	zonestopick = [];
	zonesclear = [];
	for (let i = 0; i < zones.length; i++)
	{
		zonestopick.push(i);
		if (i == ii)
		{
			zones[i]["object"].setAttribute('filter','url(#highlightAzeroth)');
		}
		else
		{
			zones[i]["object"].setAttribute('filter','url(#darkenAzeroth)');
		}
		zones[i]["object"].onmouseenter = function() { zones[i]["object"].setAttribute('filter','url(#highlightAzeroth)'); };
		zones[i]["object"].onmouseleave = function() { zones[i]["object"].setAttribute('filter','url(#darkenAzeroth)'); };
	}
	resultmain.innerText = "Game start!";
	timestart = Date.now();
	rollzone();
}
function rollzone()
{
	if (zonestopick.length == 0)
	{
		timeend = Date.now() - timestart;
		var hours = 0, minutes = 0, seconds = 0;
		while (timeend >= 3600000)
		{
			timeend -= 3600000;
			hours += 1;
		}
		while (timeend >= 60000)
		{
			timeend -= 60000;
			minutes += 1;
		}
		while (timeend >= 1000)
		{
			timeend -= 1000;
			seconds += 1;
		}
		objectivemain.innerText = "Time: " + hours.toString().padStart(2,'0');
		objectivemain.innerText += ":" + minutes.toString().padStart(2,'0');
		objectivemain.innerText += ":" + seconds.toString().padStart(2,'0');
		objectivemain.innerText += "." + timeend.toString().padStart(3,'0');
		if (minutes == 0)
		{
			if (seconds < 50)
			{
				objectivemain.innerText += " (Diamond)";
				resultmain.style.color = 'rgb(0,255,255)';
			}
			else
			{
				objectivemain.innerText += " (Gold)";
				resultmain.style.color = 'rgb(255,255,0)';
			}
		}
		else if (minutes < 3)
		{
			objectivemain.innerText += " (Silver)";
			resultmain.style.color = 'rgb(224,224,255)';
		}
		else if (minutes < 5)
		{
			objectivemain.innerText += " (Bronze)";
			resultmain.style.color = 'rgb(255,192,128)';
		}
		else
		{
			resultmain.style.color = 'rgb(255,255,255)';
		}
		resultmain.innerText = "You win! Click on any zone to restart.";
		gameend();
		return;
	}
	var rng = Math.floor(Math.random() * zonestopick.length);
	objectivemain.innerText = "Please click on " + zones[zonestopick[rng]]["name"] + ".";
	tooltipmain.innerText = zones[zonestopick[rng]]["name"] + "?";
	for (let i = 0; i < zones.length; i++)
	{
		var cleared = false;
		for (let j = 0; j < zonesclear.length; j += 1)
		{
			if (zonesclear[j] == i)
			{
				cleared = true;
				break;
			}
		}
		if (!cleared)
		{
			zones[i]["object"].onclick = function(){
				mistakesnum += 1;
				mistakesmain.innerText = "Mistakes: " + mistakesnum;
				resultmain.innerText = "Incorrect!";
				resultmain.style.color = 'rgb(255,128,128)';
			};
		}
		else
		{
			zones[i]["object"].onclick = function(){ };
		}
	}
	zones[zonestopick[rng]]["object"].onclick = function(){
		resultmain.innerText = "Correct!";
		resultmain.style.color = 'rgb(128,255,128)';
		this.setAttribute('filter','url(#nullAzeroth)');
		this.onmouseenter = function() {  };
		this.onmouseleave = function() {  };
		rollzone();
	};
	zonesclear.push(zonestopick[rng]);
	zonestopick.splice(rng, 1);
}
