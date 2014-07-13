(function ( $ ) {

		var svgNS = "http://www.w3.org/2000/svg"; 

		var currentPositionX = 0;
		var currentPositionY = 0;
		var nextPositionX = 0;
		var nextPositionY = 0;
		var pi = 3.14159265359;
		var beenThereX = [],beenThereY = [];
		$.fn.scrabbler = function(options){


			var settings = $.extend({
	            polygon: [],
	            angle: 60,
	            size: 40,
	            angleType: 'fixed',
	            sizeType: 'fixed',
	            resizeContainer: false,
	            noLines: -1,
	            linesColor: 'mixed',
	            speed: 5
	        }, options );
			
			var container = $(this);
			if(settings.resizeContainer)
				container.css({width:window.innerWidth+"px",height:window.innerHeight+"px"});
			
			if(settings.resizeContainer)
				$(window).resize(function(){
					container.css({width:window.innerWidth+"px",height:window.innerHeight+"px"});
				});
			
			
	
			var width = window.innerWidth;
			var height = window.innerHeight;
			currentPositionX = parseInt(width)/2;
			currentPositionY = 60;
	
			var i = 0;
			var interval = setInterval(function(){
				width = container.css('width');
				height = container.css('height');
			    
		        var random = Math.floor((Math.random() * 1000)+1);
		        var random1 = Math.floor((Math.random() * 2000)+1);
		        var random2 = Math.floor((Math.random() * 180)+1);
		        var random3 = Math.floor((Math.random() * 40)+10);
				
		
				var size = settings.size;
				var angle = settings.angle;
					
				if(settings.angleType === 'mixed'){
					angle = settings.angle/(random1%4);
				}
				if(settings.sizeType === 'mixed'){
					size = settings.size/(random1%4);
				}
					
				getPoint((random%random1)*angle, size);

				
				var beenThere = false;
			    if($.inArray(Number((nextPositionY).toFixed(10)),beenThereY)>-1 && $.inArray(Number((nextPositionX).toFixed(10)),beenThereX)>-1)
			    	beenThere = true;
				
		
				if(isPointInPoly(settings.polygon, {x:nextPositionX,y:nextPositionY}) && nextPositionX > 0 && nextPositionY > 0 && nextPositionX < parseInt(width) && nextPositionY < parseInt(height) && !beenThere){
					var myLine = document.createElementNS(svgNS,"line"); //to create a circle, for rectamgle use rectangle
				    myLine.setAttributeNS(null,"id","myLine");
				    myLine.setAttributeNS(null,"x1",currentPositionX);
				    myLine.setAttributeNS(null,"y1",currentPositionY);
				    myLine.setAttributeNS(null,"x2",nextPositionX);
				    myLine.setAttributeNS(null,"y2",nextPositionY);
				    if( settings.linesColor == 'mixed' ){
					    myLine.setAttributeNS(null,"stroke","rgb("+((random2%50)+150)+","+((random1%50)+150)+","+((random3%50)+150)+")");
				    }else{
					    myLine.setAttributeNS(null,"stroke",settings.linesColor);
				    }
		
				    document.getElementById(container.attr('id')).appendChild(myLine);
		
				    beenThereX.push(Number((nextPositionX).toFixed(10)));
				    beenThereY.push(Number((nextPositionY).toFixed(10)));
		
			    	currentPositionX = nextPositionX;
			    	currentPositionY = nextPositionY;
		
				    
				}
		        

				i++;
				
				if(i == settings.noLines)
					clearInterval(interval);
				
			},settings.speed);
		};
		

	
		function getPoint(angle, distance){
			angle = angle * (pi/180);
			nextPositionX = currentPositionX+(Math.cos(angle)*distance);
			nextPositionY = currentPositionY+(Math.sin(angle)*distance);
		}
	
		function containsObject(obj, list) {
		    var i;
		    for (i = 0; i < list.length; i++) {
		        if (list[i].x == obj.x && list[i].y == obj.y) {
		            return true;
		        }
		    }	
		    return false;
		}
	
		function isPointInPoly(poly, pt){
			if(poly.length > 1){
				for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
					((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
					&& (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
					&& (c = !c);
				return c;
			}else
				return true;
		}
	}( jQuery ));