$(document).keydown(function(e) {
  
    if ( Game.moovementIsAllowed ) {
  
      console.log("keydown e.which:", e.which );
      $("#txtKeydown").val(e.which);
      switch(e.which) {
          case 37: // left
          
            if ( beforeNextMovement( "left" ) ){
              Game.player.man_x--;
            } 
            break;
  
          case 38: // up
            if ( beforeNextMovement("up") ) {
              Game.player.man_y--;
            } 
            break;
  
          case 39: // right
            if ( beforeNextMovement("right") ){
              Game.player.man_x++;
            } 
            break;
  
          case 40: // down
            if ( beforeNextMovement("down") ){
              Game.player.man_y++;
            } 
            break;
          
          case 74: // jump
            //if ( beforeNextMovement( "jump-right" );
            //if ( beforeNextMovement( "jump-left" );
            break;
  
          default: return; // exit this handler for other keys
      }
      
      
      $("#txtManX").val( Game.player.man_x );
      $("#txtManY").val( Game.player.man_y );
      
      // -----------
      // move
      // -----------
      
      /*
      
      Game.moovementIsAllowed = false;
      
      Game.player.moveTo( Game.player.man_x + 0.5, Game.player.man_y + 0.5 );
      
      setTimeout(function(){
        //$('#someid').addClass("done");
        
        Game.player.moveTo( Game.player.man_x, Game.player.man_y );
        Game.moovementIsAllowed = true;
        
      }, 250);
      
      */

      Game.moovementIsAllowed = false;
      Game.player.moveTo( Game.player.man_x, Game.player.man_y );
      if ( afterMovement() ) {
         
      } else {
        Game.moovementIsAllowed = true;
      }
      
      
      
      //Game.moovementIsAllowed = true;
      
    }  
      
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

var whileMooving = function() {
  
};

var afterMovement = function(){
  
  var x = Game.player.man_x;
  var y = Game.player.man_y;
  
  console.log("(D) afterMovement(), aryData.data["+ x +"]["+ y +"]");
  
  var p = Game.window.scenary.data[ y ][ x ];
  var p_down = Game.window.scenary.data[ y+1 ][ x ];
  
  // check down

    if ( p === 1) {
      // all ok, do nothing
      
      //animate.stop();
    }
    
    if ( p === 2) { // stairs
      // all ok, do nothing
    }
    
    if ( p_down === 0) { // empty space
      // spaceman should fall
      animate.init("free-falling");

    } else {
      animate.stop();
    }
    
    /*
    if ( p === 3) { // 'tobogan-fall'
    
      // spaceman should fall
      animate.init('tobogan-fall');
      
    } else {
      
      animate.stop();
      
    }
    */
    
};

var beforeNextMovement = function( str){
  
      console.log("beforeNextMovement(), str:", str );
      var nextPosition_x = 0;
      var nextPosition_y = 0;
      
      console.log( "(A) aryData.data["+ nextPosition_y +"]["+ nextPosition_x +"]" );
      
      switch(str) {
        case 'left':
            nextPosition_x = Game.player.man_x - 1;
            nextPosition_y = Game.player.man_y + 0;
            break;
        case "up":
            nextPosition_x = Game.player.man_x + 0;
            nextPosition_y = Game.player.man_y - 1;
            break;
        case "right":
            nextPosition_x = Game.player.man_x + 1;
            nextPosition_y = Game.player.man_y + 0;
            break;
        case "down":
            nextPosition_x = Game.player.man_x + 0;
            nextPosition_y = Game.player.man_y + 1;
            break;
        case "jump":
            //nextPosition_x = Game.player.man_x - 0;
            //nextPosition_y = Game.player.man_y - 0;
            break;
      }
      
      console.log("(B) beforeNextMovement(), aryData.data["+ nextPosition_x +"]["+ nextPosition_y +"]");
      
      // 1. Check scenary limits
      
      if ( nextPosition_y < 0 || nextPosition_y > Game.height ) {
        $("#txtInfo").val( "Not allowed movement" );
        return false;
      }
      
      if ( nextPosition_x < 0 || nextPosition_x > Game.width ) {
        $("#txtInfo").val( "Not allowed movement" );
        return false;
      }
      
      // 2. Check game elements in scenary 
      
      var p = Game.window.scenary.data[ nextPosition_y ][ nextPosition_x ];
          
      console.log("(C) beforeNextMovement(), aryData.data["+ nextPosition_x +"]["+ nextPosition_y +"] value:", p );

      if ( p === 1 || p === undefined ) {
        $("#txtInfo").val( "Not allowed movement" );
        return false;
      } 

      $("#txtInfo").val( "Movement ok!" );
      
      // default
      return true;
}

var afterNextMovement = function( str){
  
  return false; 
}

