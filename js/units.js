﻿// class Team
function Team(id, color, heros) {
	this.id = id;
	this.color = color;
	this.heros = heros;
	this.units = [];
	if ( typeof Team.initialized == "undefined" ) {
		Team.prototype.nouveauJour = function() {
			for(i = 0; i<this.units.length; i++){
				units[this.units[i]].updateActive(true);
			}
		}

		Team.initialized = true;
	}
}

// class Unit
function Unit(id, team, type, x, y, active, spec) {
	this.id = id;
	this.team = team;
	this.team.units.push(this.id);
	this.type = type;
	this.x = x;
	this.y = y;
	this.active = active;
	this.spec = spec;
	this.elem = document.createElement("div");

	//on créé l'element DOM dans l'objet
	document.getElementById("body").appendChild(this.elem);
	var position = $('#'+this.x+'_'+this.y).position();
	$(this.elem).attr('id', 'unit_'+id).addClass('units').css({
		'background': 'url(images/units/'+this.team.color+'/'+this.type+'.gif)',
		'left': position.left,
		'top' : position.top
	});

	
	if ( typeof Unit.initialized == "undefined" ) {
		Unit.prototype.updatePosition = function(newCoord) {
			this.x = newCoord[0];
			this.y = newCoord[1];
			unitsMap[selectedUnitID] = newCoord[0]+'_'+newCoord[1];
		}
 		Unit.prototype.updateEssence = function(value) {
			this.spec.essence = this.spec.essence - value;
			if(this.spec.essence<=0){
				this.updateActive(false);
			}
		}
		Unit.prototype.updateActive = function(newValue) {
			this.active = newValue;
			if(this.active){
				$(this.elem).css({'background': 'url(images/units/'+this.team.color+'/'+this.type+'.gif)'});
			}
			else{
				$(this.elem).css({'background': 'url(images/units/'+this.team.color+'/'+this.type+'_down.gif)'});
			}
		}
		Unit.initialized = true;
	}
}	

var units = new Array();
var teams = new Array();
var unitsMap = new Array();		

$(document).ready(function(){
	//def Teams :
	teams[0] = new Team(0, 'red', 'Max');
	teams[1] = new Team(1, 'blue', 'Jeanne');
	//def Units
						
	units[0] = new Unit(0, teams[0], 'tank', 8, 8, true, $.extend(true, {}, BDD.Unites.Tank));
	units[1] = new Unit(1, teams[1], 'tank', 7, 4, true, $.extend(true, {}, BDD.Unites.Tank));
	units[2] = new Unit(2, teams[1], 'tank', 5, 4, true, $.extend(true, {}, BDD.Unites.Tank));

	for(j=0;j<units.length;j++)
	{
		unitsMap[j] = units[j].x+'_'+units[j].y;
	}
});