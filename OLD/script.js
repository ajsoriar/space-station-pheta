// Code goes here


var Game = {
  
  
   //     man_x = 0;
     // man_y = 0;
};

Game.width = 32;
Game.height = 21;

Game.player = {
  
    man_x: 0,
    man_y: 0,
    moveTo: function(_x, _y ){
      $("#man").css("top", _y * Game.window.step_length +"%" );
      $("#man").css("left", _x * Game.window.step_length +"%" );
    }
}

Game.window = {
  step_length: null,
  scenary: scenary1 //Game.window.scenary
};

Game.moovementIsAllowed = true;

$( document ).ready(function() {
    console.log( "ready!" );
    
    //gamePlayCanvas
    
    // Create scenary
    
    var scenary = function( _scenaryData ){
      
      console.log( _scenaryData );
      
      // Load scenary
      
      var w = _scenaryData.width;
      var h = _scenaryData.height;
      var i, j;
      
      console.log("w:", w ); // 32
      console.log("h", h ); // 21
      
      //var step_length = 100/w;
      Game.window.step_length = 100/w;
      
      // paint scenary
      str = "";
      for( j=0; j<h; j++){
        for( k=0; k<w; k++){
          
          var v = _scenaryData.data[ j ][ k ];
          str += '<div class="block scn-'+ v;
          str += '" style="top:'+ j * Game.window.step_length +'%;';
          str += 'left:'+ k * Game.window.step_length +'%">'+ '</div>';
          
          console.log( "[w:"+ j +", h:"+ k +"], value:", v  );
        
        }
      }
      
      //var v = _scenaryData.data[ j ][ k ];
      
      str += '<div id="man" class="man';
      str += '" style="';
      
      str += 'top:'+ Game.player.man_x * Game.window.step_length +'%;';
      str += 'left:'+ Game.player.man_y * Game.window.step_length +'%;';
      str += 'width:'+ Game.window.step_length +'%;';
      str += 'height:'+ Game.window.step_length +'%;';
      
      str += '">'+ v +'</div>';
     
      return str;
    }
    
    var s = scenary( window.scenary1 );
    console.log("s:", s );
    
    $("#gamePlayCanvas").html(  s );
    
    $(".block").css("width",Game.window.step_length + "%");
    $(".block").css("height",Game.window.step_length + "%");
    

    var couter_timestamp_A = Date.now();
    var couter_timestamp_B = Date.now();

    console.log("couter_timestamp_A:", couter_timestamp_A );
    console.log("couter_timestamp_B:", couter_timestamp_B );
    
    var txtCounter = $("#txtCounter");
    var txtSeconds = $("#txtSeconds");
    var cont = 0;
    var seconds = 0

    function refresh() {
      
        txtCounter.val( cont );

        if ( ( couter_timestamp_A + 1000 ) > couter_timestamp_B ) {
          
          seconds++;
          if (seconds > 60) seconds = 0;

            couter_timestamp_B = Date.now();
            couter_timestamp_A = couter_timestamp_B;
            //console.log(timestamp_ID +" ...");
            //mov = window.requestAnimationFrame( refresh );
            
            txtSeconds.val( seconds );
            
        } else {

            //window.cancelAnimationFrame( mov ); 
        }  
        
        cont++;
        
        mov = window.requestAnimationFrame( refresh );
    }

    var mov = window.requestAnimationFrame( refresh );
  
});


