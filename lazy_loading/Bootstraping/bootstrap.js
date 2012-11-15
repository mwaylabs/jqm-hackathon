//if we load a script with document.write everything is going to be bad
document.write = function(){console.log('we disabled document.write due security issues');}

var startScreen = 'page1.js';
var jsList = ['core.js', 'tmp.js'];
jsList.push(startScreen);
var loadList = [];

var pageList = ['page2.js', 'page3.js', 'page4.js', 'page5.js'];
var pageLoadList = [];

jsList.forEach(function(i) {
	if(i) {
		var js = document.createElement("script"); 
		js.src = i; 
		js.onload = function(data, b,c){
			loadList.push(i);
			console.log(i + ' DID LOAD');

            console.log(data, b,c);
			checkIfBootstrapDone();
		}; 
	
		document.body.appendChild(js);	
	}
});

function checkIfBootstrapDone() {
    //jsList.length === document.scripts.length
    if(jsList.length === loadList.length) {
		//trigger event
		console.log('BOOTSTRAPING DONE');

        //async through a flag
        //window.setTimeout doesn't load the files async
		window.setTimeout(function() {
			pageList.forEach(function(i) {
				loadPage(i, true);
			});
		}, 0);
	}	
}

function loadPage(url, async) {
		var js = document.createElement("script"); 
		js.src = url;
        js.async = async ? async : false;
		js.onload = function(){
			pageLoadList.push(url);
			console.log(url + ' DID LOAD');
			
			checkIfPageLoadDone();
		}; 
	
		document.body.appendChild(js);		
}

function checkIfPageLoadDone() {
	if(pageList.length === pageLoadList.length) {
		//trigger event
		console.log('APPLICATION LOADING DONE');
	}	
}