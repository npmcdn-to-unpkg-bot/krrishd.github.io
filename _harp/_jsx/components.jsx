var MusicSection = React.createClass({
	getInitialState: function() {
		return {
			artist: 'Loading',
			name: 'Loading',
			img: '/img/loading.gif'
		}
	},
	componentDidMount: function() {
		this.getTrack();
	},
	getTrack: function() {
		var that = this;
		$.ajax({
			url: 'http://krish-api.herokuapp.com/api/last',
			async: true,
			success: function(data) {
				var img;
				if (data.image[2]['#text'].length > 0) {
					img = data.image[2]['#text'];
				} else {
					img = '/img/music.png'
				}
				that.setState({
					artist: data.artist['#text'],
					name: (function() {
						if (data.name.length <= 20) {
							return data.name;
						}
						return data.name.substring(0,20) + '...'
					})(),
					img: img
				});
			}
		})
	},
	render: function() {
		return (
			<div className="music">
				<h2>Now Playing</h2>
				<img src={this.state.img} className="art" />
				<div className="text">
					<p className="name"><img className="eq" src="/img/eq.gif" /><strong> {this.state.name}</strong></p>
					<p className="artist">{this.state.artist}</p>
				</div>
			</div>
		)
	}
});

var Container = React.createClass({
	render: function() {
		return (
			<div className="appContainer">
				<MusicSection />
			</div>
		)
	}
});

ReactDOM.render(
	<Container />,
	document.getElementById('app')
)

