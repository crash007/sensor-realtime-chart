/**
 * New node file
 */

var dps = [{label:'alkohol'}]
function setupChart() {
	$("#gyro-chart").CanvasJSChart({ // Pass chart options
	    axisY: {
		maximum: 1025,
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


$('.btn-start').click(function(){
console.log(sio.socket);	
    console.log("emiting ready");
    if(sio.socket.connected){
    	console.log('Already connected');
    	sio.emit('ready');
    }else{
    	console.log('Reconnect');
    	sio.socket.connect();
    	//socket= io.connect();
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

var maxValue = 0;
sio.on('data', function(data) {


	 //console.log(data);
	var chart = $('#gyro-chart').CanvasJSChart();
		// values.push(data);
	 console.log(data);
         var value = parseFloat(data[0]);
    if(value > maxValue){
	maxValue=value;
	$('.max-value').html('<h3>Max:'+value+'</h3>');
    }
	 //chart.options.data[0].dataPoints.push({ y: parseFloat(data[0]),x:1 });
	 //	     chart.options.data[1].dataPoints.push({ y: yv[2],x:i });
    dps[0]={y:value, label:"Alkohol"};
		 
    chart.render();

	
 });  
