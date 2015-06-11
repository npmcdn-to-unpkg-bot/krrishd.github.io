window.onload = function() {
  var api = 'www.behance.net/v2/users/krishdholakiya/projects?api_key=iaLwUe7zM9AZDIsgsrq5rTRiRGR91vEZ';
  http.GET('http://cors-enabler.herokuapp.com/' + api, function(data) {
    var res = JSON.parse(data);
    if (res.http_code === 200) {
      res.projects.forEach(function(project) {
        var item = document.createElement('li');
        item.innerHTML = '<a title="' + project.name + '" href="' + project.url + '" target="_blank"><img class="project" src="' + project.covers[230] + '"></a>';
        document.querySelector('.work ul').appendChild(item);
      });
    }
  });
}
