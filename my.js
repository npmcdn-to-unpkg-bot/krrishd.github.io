var app = angular.module('profile', []);
var cors = 'http://cors-enabler.herokuapp.com/';

window.onload = function() {
	// IDC if user agent sniffing. ony gahd ken juhj ya
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	if(iOS) {
		document.querySelector('#main').style.backgroundAttachment = "scroll";
	}
	if(window.location.hash.split('#')[1] == "freelance") {
		var modalOpen = true;
		document.querySelector('.freelance').style.display = "block";
	}
	document.querySelector('.modal .icon').addEventListener('click', function(e) {
		document.querySelector('.modal').setAttribute('class', 'modal freelance animated fadeOut');
		modalOpen = false;
	});
	document.onkeydown = function(evt) {
		var ev = evt || window.event;
		if (ev.keyCode == 27 && modalOpen == true) {
			document.querySelector('.modal').setAttribute('class', 'modal freelance animated fadeOut');
			//document.querySelector('.modal').style.display = "none";
			modalOpen = false;
		}
	}
}

function workCtrl($scope, $http) {
	$http({method: 'GET', url: cors + 'www.behance.net/v2/users/krishdholakiya/projects?api_key=iaLwUe7zM9AZDIsgsrq5rTRiRGR91vEZ'}).success(function(data) {
		$scope.work = data.projects;
		//console.log($scope.work);
		$scope.pulse = function() {
			console.log('yolo');
			this.setAttribute('class', 'item animated pulse');
		}
	});
}
app.factory('blogPosts',function($http){
  var _posts = [];
  $http.get('//corsproxy.com/www.itskrish.co/blog/api.json').success(function(data){
    var blogData = data;
    var postKeys = Object.keys(blogData);
    for (var i = 0; i < 2; i++) {
        var blogPost = blogData[postKeys[i]];
        blogPost.url = postKeys[i];
        _posts.push(blogPost);
    };
  });
  return _posts;
});

function blogCtrl(blogPosts,$scope, $http) {
  //$scope.posts = blogPosts;
  $http.get(cors + 'tr-anonymous.appspot.com/medium.com/feed/@krrishd?v=' + Math.random()*100)
	.success(function(data) {
		$scope.posts = [];
		var domParser = new DOMParser();
		var parsedXML = domParser.parseFromString(data, 'text/xml');
		var feed = rss2json(parsedXML);
		for(item in feed.items) {
			var rawDate = feed.items[item].pubDate.split(" ");
			var itemDate = rawDate[1] + " " + rawDate[2] + " " + rawDate[3];
			if(feed.items[item].title.search('"') > -1) {
				var itemTitle = feed.items[item].title.split('"')[1];
			} else {
				var itemTitle = feed.items[item].title;
			}
			$scope.posts.push({
				title: itemTitle,
				url: feed.items[item].link,
				date: itemDate
			});
			console.log($scope.posts);
		}
	});
};
