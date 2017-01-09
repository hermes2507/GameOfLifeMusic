var rows = 30,
    columns = 30;
    
var bstop, bstart,breset,brand;
var stopFlag = true;    
var selector = 0; //Selector de tecla: 1,2,3,4
var _width, _height

var melody
var chord // Es otro sinte, no acordes. No son acordes porque ya es polifónico.
var bass


//Escalas

//Pentatónica
var notesScaleS1 = ['c5','d5','e5','g5','a5','c5','c4','d4','e4','g4','a4','c4'] //Synth1
var notesScaleBass = ['c3','d3','e3','g2','a3'] //Bass
var notesScaleS2 = ['c6','d6','e6','g6','a6'] //Synth2






function setup() {  

	

  createCanvas( 720, 500 )
  frameRate( 5 )
  
  // sound engine
  fm = FM({ maxVoices:4, attack:ms(1), pan:1.0})
  //fm.fx.add( Reverb() )
  sy = Synth({ maxVoices:2, attack:ms(1),waveform:'Saw'})
  sy.fx.add( Reverb() )
  sy2 = Synth({ maxVoices:4, attack:ms(1),waveform:'Square',pan:-1.0})
  //sy2.fx.add( Reverb() )
  life.init( rows, columns )
  /*
  life.onbirth = function( x, y ) {
    var child = fm.voiceCount,
        frequency = 220 + ( y / this.rows ) * 880 + ( 880 / this.rows ) / (x + 1),
        pan = -1 + ( x / this.columns ) * 2
        //cmRatio = this.rows / ( x + 1 )
        
    fm.note( frequency  )
    
    // fm.children[ child ].cmRatio = cmRatio
    fm.children[ child ].pan = pan
 	*/   
 	
 	
  life.onbirth = function(x,y){
  
  //Synth1 Triggers
  if(melody[y][x]==1){
  		var child = fm.voiceCount,
  		frequency = notesScaleS1[x%notesScaleS1.length], //En eje x
  		amp = map(y,0,rows,1,0.3) //eje y
  		fm.note( frequency,amp )
  	}
  	
  	
  	  //Synth2 Triggers
  if(chord[y][x]==1){
  		var child = sy2.voiceCount,
  		frequency = notesScaleS2[x%notesScaleS2.length], //En eje x
  		amp = map(y,0,rows,1,0.3) //eje y
  		sy2.note( frequency,amp)
  	}
  	
  	
  //Bass Triggers
  if(bass[y][x]==1){
  		var child = sy.voiceCount,
  		frequency = notesScaleBass[x%notesScaleBass.length], //En eje x
  		amp = map(y,0,rows,1,0.3) //eje y
  		sy.note( frequency,amp )
  	}

 
  }
  
      //Cell Size
    _width = width*0.5 / columns
    _height = height / rows
  
  
   //Init arrays
  	
  	melody = new Array(rows);
  	chord = new Array(rows);
  	bass = new Array(rows);
	for (var i = 0; i < rows; i++) {
  		melody[i] = new Array(columns);
  		chord[i] = new Array(columns);
  		bass[i] = new Array(columns);
	}
  
   resetGame();

    
    //Buttons 
  	bstart = createButton('START');
  	bstart .position(0.60*width,0.3*height);
  	bstart.mousePressed(playGame)
  	
  	bstop = createButton('STOP');
  	bstop .position(0.705*width + 5,0.3*height);
  	bstop.mousePressed(stopGame);
  	
  	breset = createButton('RESET');
  	breset .position(0.82*width,0.3*height);
  	breset.mousePressed(resetGame);
  	
  	
  	brand = createButton('RANDOM');
  	brand .position(0.69*width+5,0.24*height);
  	brand.mousePressed(randomCells);
  	

  	

  	


  
}

function draw() {



if(!stopFlag){
  life.run();
  }
  
  
  background(0);
  drawGame()
  drawTriggers()
  

  	fill(0);
  	rect(width/2,0,width/2,height);
	
  //MENU
  noStroke()
  fill(255);
  textSize(32)
  text("AutoMatone", 0.64*width,0.18*height);
  
  textSize(18)
  textAlign(CENTER);
  text("Press the key and then select the squares on the board to set the game", 0.75*width,0.37*height,width/2-10,35);
  
  //White
  fill(255)
  ellipse(0.60*width,0.55*height,50,50)
  text("Add a living cell", 0.75*width,0.53*height,width/2-10,35);
  fill(0)
  text("1",0.60*width+3,0.53*height,50,50)
  
  //Red
  fill(200,0,0)
  ellipse(0.60*width,0.55*height + 55,50,50)
  text("Add a trigger cell for Synth1", 0.82*width,0.53*height+55,270,50);
  fill(0)
  text("2",0.60*width+3,0.53*height+55,50,50)
  
  //Blue
  fill(0,0,200)
  ellipse(0.60*width,0.55*height + 55*2,50,50)
  text("Add a trigger cell for Synth2", 0.82*width-1,0.53*height+55*2,270,50);
  fill(0)
  text("3",0.60*width+3,0.53*height+55*2,50,50)
  
  //Green
  fill(0,200,0)
  ellipse(0.60*width,0.55*height + 55*3,50,50)
  text("Add a trigger cell for Bass", 0.82*width-8,0.53*height+55*3,270,50);
  fill(0)
  text("4",0.60*width+3,0.53*height+55*3,50,50)
  
  
}


function drawGame() {
	

 
  
  for( var y = 0; y < rows; y++ ) {
    for( var x = 0; x < columns; x++ ) {
      var cell = life.cells[ x ][ y ],
          value = cell.value
      
      fill( (value) * 255 )
      stroke(255);
      rect( x * _width, y * _height, _width, _height )
    }
  }


}


function keyPressed(){



	if(keyCode == 49){ //1
	selector = 1;
	}
  	if(keyCode == 50){ //2
  	selector = 2;
	}
	if(keyCode == 51){ //3
	selector = 3;
	}
	if(keyCode == 52){ //4
	selector = 4;
	}
	
	console.log(selector);
}


function mousePressed(){



	//Just if pause
	if(true){ //or use stopFlag. Just add triggers when stop mode
	
		//Select index with mouse width/_width = número total de células
		//_width: ancho de célula
    	xCellOver = ceil(map(mouseX, 0, width, 0, width/_width)) -1;
    	xCellOver = constrain(xCellOver, 0, width/_width-1);
    	console.log(xCellOver);
    	yCellOver = ceil(map(mouseY, 0, height, 0, height/_height)) -1;
    	yCellOver = constrain(yCellOver, 0, height/_height-1);
    	console.log(yCellOver);
    	
    	

    
    	if(selector == 1){
    	
    	var cell = life.cells[ xCellOver ][ yCellOver ]
    	
			//Add cells (White)
    		if (cell.value == 0) { // Cell is alive
      			cell.value=1; // New Cell
    		}else{ // Cell is alive
      			cell.value=0; // Kill
    		}
    	}
    	
    	
    	
    	
    	if(selector == 2){ //Melody trigger
    		if (melody[xCellOver][yCellOver] == 0) {
      			melody[xCellOver][yCellOver] = 1; // New trigger
    		}else{
      			melody[xCellOver][yCellOver] = 0; // Kill
    		}
    	}
    	
    	
    	if(selector == 3){ //Chord trigger
    		if (chord[xCellOver][yCellOver] == 0) { 
      			chord[xCellOver][yCellOver] = 1; // New trigger
    		}else{
      			chord[xCellOver][yCellOver] = 0; // Kill
    		}
    	}
    	
    	if(selector == 4){ //Chord Bass
    		if (bass[xCellOver][yCellOver] == 0) { 
      			bass[xCellOver][yCellOver] = 1; // New trigger
    		}else{
      			bass[xCellOver][yCellOver] = 0; // Kill
    		}
    	}
	}
	
	
	

}



function randomCells() {

	//Random Cells

	for ( var y = 0; y < rows; y++ ) {
      life.cells.push( [] )
      for ( var x = 0; x < columns; x++ ) {
        life.cells[ y ][ x ] = {
          value: rndi(0, 1)
        }
      }
    }
    
    //Random Triggers
    
    for(var i=0; i<rows; i++){
		for( var j=0; j<columns; j++){
		  	melody[i][j] = rndi(0, 1);
  			chord[i][j] = rndi(0, 1);
  			bass[i][j] = rndi(0, 1);
		}
	
	}
    
    
    

}


function resetGame(){

	//Borrar cells
	for ( var y = 0; y < rows; y++ ) {
      life.cells.push( [] )
      for ( var x = 0; x < columns; x++ ) {
        life.cells[ y ][ x ] = {
          value: 0
        }
      }
    }
    
    //Borrar triggers
    for(var i=0; i<rows; i++){
		for( var j=0; j<columns; j++){
		  	melody[i][j] = 0;
  			chord[i][j] = 0;
  			bass[i][j] = 0;
		}
	
	}

}

function stopGame(){
	stopFlag = true;
}

function playGame(){
	stopFlag = false;
}

function drawTriggers(){

	for(var i=0; i<rows; i++){
		for( var j=0; j<columns; j++){
		
		  	if(melody[i][j] == 1){ //RED
		  	  fill(200,0,0);
      		  rect(i*_width,j*_height,_width*0.5,_height*0.25)
		  	}
		  	if(chord[i][j] == 1){ //BLUE
		  	  fill(0,0,200);
      		  rect(i*_width,j*_height+_height*0.25,_width*0.5,_height*0.25)
		  	}
		  	
		  	if(bass[i][j] == 1){ //Green
		  	  fill(0,200,0);
      		  rect(i*_width,j*_height+_height*0.25*2,_width*0.5,_height*0.25)
		  	}
		}
	
	}
}






