(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-65062306-1', 'auto');
ga('send', 'pageview');

var state = {
  loading: true,
  projectMetadata: {
    display: false
  }
};

var defaultState = {
  loading: true,
  projectMetadata: {
    display: true,
    name: 'Name of Project',
    stats: {
      views: '# of views',
      appreciations: '# of <3s'
    },
    img: 'http://placehold.it/404'
  }
}

/*function generateProjectMetadata(behanceData) {
  return {
    name: behanceData.name,
    fields: behanceData.fields,
    stats: behanceData.stats,
    display: true,
    img: behanceData.covers[404]
  }
};

function generateMetadataMarkup(projectMetadata) {
  var markup =  '<span><img src="' +
                projectMetadata.img +
                '">"' +
                '<p class="name">' +
                projectMetadata.name +
                '</p>' +
                '<p class="views">' +
                projectMetadata.stats.views +
                '</p>' +
                '<p class="appreciations">' +
                projectMetadata.stats.appreciations +
                '</p><ul></ul></span>';
  var domParser = new DOMParser();
  var markupObject = domParser.parseFromString(markup, 'text/html')
                      .querySelector('body span');
  var fields = projectMetadata.fields.forEach(function(field) {
    var fieldNode = document.createElement('li');
    fieldNode.innerText = field;
    markupObject.querySelector('ul').appendChild(fieldNode);
  });

  return markupObject;
}
*/
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

window.onload = function() {
  Object.observe(state, function(e) {
    if (e[0].name == 'loading') {
      document.querySelector('.loading')
				.setAttribute('class', 'loading ' + state.loading);
    } else if (e[0].name == 'projectMetadata') {
      if (state.projectMetadata.display) {
        document.querySelector('.metadata') && (document.querySelector('.metadata')
          .innerHTML = '');
        document.querySelector('.metadata') && (document.querySelector('.metadata')
					.setAttribute('class', 'metadata show animated fadeIn'))
        document.querySelector('.metadata') && (document.querySelector('.metadata')
          .appendChild(generateMetadataMarkup(state.projectMetadata)));
      } else {
        state.projectMetadata = defaultState.projectMetadata;
        document.querySelector('.metadata') && (document.querySelector('.metadata')
          .appendChild(generateMetadataMarkup(state.projectMetadata)));
      }
    }
  });

  if (!state.projectMetadata.display) {
    state.projectMetadata = defaultState.projectMetadata;
  }

  var api = 'www.behance.net/v2/users/krishdholakiya/projects?api_key=iaLwUe7zM9AZDIsgsrq5rTRiRGR91vEZ';
  state.loading = true;
  http.GET('http://cors-enabler.herokuapp.com/' + api, function(data) {
    var res = JSON.parse(data);
    if (res.http_code === 200) {
      state.loading = false;
      res.projects.forEach(function(project) {
        var item = document.createElement('li');
        var uniqueStringId = camelize(project.name.split('.')[0]);
        item.setAttribute('class', 'animated fadeIn ' + uniqueStringId);
        item.innerHTML = '<a title="' +
					project.name +
					'" href="' +
					project.url +
					'" target="_blank"><img class="project" src="' +
					project.covers[115] + '"></a>';
        document.querySelector('.work ul').appendChild(item);
        var appendedProject = document.querySelector('.' + uniqueStringId);

        /*appendedProject.addEventListener('mouseover', function(e) {
          state.projectMetadata = generateProjectMetadata(project);
        });

        appendedProject.addEventListener('mouseleave', function(e) {
          state.projectMetadata = {
            display: false
          };
        });*/

      });
    }
  });
}
