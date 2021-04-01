function save(){
	chrome.storage.sync.set({"boat": document.getElementById("boat").checked});
	chrome.storage.sync.set({"bicycle": document.getElementById("bicycle").checked});
	chrome.storage.sync.set({"motorcycle": document.getElementById("motorcycle").checked});
	chrome.storage.sync.set({"bus": document.getElementById("bus").checked});
	chrome.storage.sync.set({"truck": document.getElementById("truck").checked});
}

function load(){
	chrome.storage.sync.get('boat', function(data) {
    document.getElementById("boat").checked = data["boat"];
		});
		
	chrome.storage.sync.get('bicycle', function(data) {
    document.getElementById("bicycle").checked = data["bicycle"];
		});
		
	chrome.storage.sync.get('motorcycle', function(data) {
    document.getElementById("motorcycle").checked = data["motorcycle"];
		});
		
	chrome.storage.sync.get('bus', function(data) {
    document.getElementById("bus").checked = data["bus"];
		});
		
	chrome.storage.sync.get('truck', function(data) {
    document.getElementById("truck").checked = data["truck"];
		});
}

document.getElementById("save").addEventListener("click", function() {
  save();
});

load();