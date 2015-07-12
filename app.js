(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-65062306-1', 'auto');
ga('send', 'pageview');

var state = {
	loading: true
};

window.onload = function() {
  Object.observe(state, function() {
	document.querySelector('.loading')
	  .setAttribute('class', 'loading ' + state.loading);
  });
  var api = 'www.behance.net/v2/users/krishdholakiya/projects?api_key=iaLwUe7zM9AZDIsgsrq5rTRiRGR91vEZ';
  state.loading = true;
  http.GET('http://cors-enabler.herokuapp.com/' + api, function(data) {
    var res = JSON.parse(data);
    if (res.http_code === 200) {
      state.loading = false;
      res.projects.forEach(function(project) {
        var item = document.createElement('li');
        item.innerHTML = '<a title="' + project.name + '" href="' + project.url + '" target="_blank"><img class="project" src="' + project.covers[230] + '"></a>';
        document.querySelector('.work ul').appendChild(item);
      });
    }
  });
}
