var MusicSection = React.createClass({
	displayName: 'MusicSection',

	getInitialState: function () {
		return {
			artist: 'Loading',
			name: 'Loading',
			img: '/img/loading.gif'
		};
	},
	componentDidMount: function () {
		this.getTrack();
	},
	getTrack: function () {
		var that = this;
		$.ajax({
			url: 'http://krish-api.herokuapp.com/api/last',
			async: true,
			success: function (data) {
				var img;
				if (data.image[2]['#text'].length > 0) {
					img = data.image[2]['#text'];
				} else {
					img = '/img/music.png';
				}
				that.setState({
					artist: data.artist['#text'],
					name: function () {
						if (data.name.length <= 20) {
							return data.name;
						}
						return data.name.substring(0, 20) + '...';
					}(),
					img: img
				});
			}
		});
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'music' },
			React.createElement(
				'h2',
				null,
				'Now Playing'
			),
			React.createElement('img', { src: this.state.img, className: 'art' }),
			React.createElement(
				'div',
				{ className: 'text' },
				React.createElement(
					'p',
					{ className: 'name' },
					React.createElement('img', { className: 'eq', src: '/img/eq.gif' }),
					React.createElement(
						'strong',
						null,
						' ',
						this.state.name
					)
				),
				React.createElement(
					'p',
					{ className: 'artist' },
					this.state.artist
				)
			)
		);
	}
});

var Container = React.createClass({
	displayName: 'Container',

	render: function () {
		return React.createElement(
			'div',
			{ className: 'appContainer' },
			React.createElement(MusicSection, null)
		);
	}
});

ReactDOM.render(React.createElement(Container, null), document.getElementById('app'));