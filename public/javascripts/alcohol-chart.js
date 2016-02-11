/**
 * New node file
 */

var dps = [{label:'Alcohol'}]
function setupChart() {
	$("#alcohol-chart").CanvasJSChart({ // Pass chart options
	    axisY: {
		//maximum: 1025,
		minimum: 0
	    },
	    data : [ 
		        {
		        	type : "column",
		            dataPoints : dps,
			    color:"#6B8E23"
		        }
		 ]
	});
}
    
var sio = io.connect(); 

$( document ).ready(function() {
    setupChart();
   
});

var maxValue;
var recording=false;

$('.btn-start').click(function(){
	maxValue =0;
	recording = true
	$('.status-running').toggleClass('in');
	//recording = true;
	console.log(sio.socket);	
    console.log("emiting ready");
    if(sio.socket.connected){
    	console.log('Already connected');
    	sio.emit('ready');
    }else{
    	console.log('Reconnect');
    	sio.socket.connect();
    	sio.emit('ready');
    }
});

$('.btn-stop').click(function(){
	console.log("Disconnecting socket");
	sio.disconnect();
	
});

$('.btn-calc').click(function(){
	console.log('calculating');
});


sio.on('data', function(data) {

	var chart = $('#alcohol-chart').CanvasJSChart();
	
	 console.log(data);
     var value = parseFloat(data[0]);

     if(recording && value > maxValue){
		maxValue=value;
		$('.max-value').html($('#username').val()+' , Max:'+value);
     } 
     
     if(recording ==true && value < (maxValue-10)){
    	 console.log("Stop recording")
    	 recording = false;
    	 console.log("Disconnecting socket");
    	 sio.disconnect();
    	 
    	 $('.status-running').toggleClass('in');
    	 
    	 var result = '<tr><td>'+$('#username').val() +'</td> <td class="value">'+ $('.max-value').text().split(':')[1]+'</td> <td>'+new Date()+'</td></tr>';
    	 $('#results').append(result);
    	 
    	 $('#username').val('');
    	 $('.max-value').text('');
    	 
	 	$('tr').sort(function(a,b){
		    return parseInt($(a).find('.value').text()) < parseInt($(b).find('.value').text()) 
		}).appendTo('tbody');
	 	value=0;
    	 
     }
     
    
     dps[0]={y:value, label:"Alcohol"};		 
     chart.render();

 });  
