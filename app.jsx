var NavigationItem = React.createClass({
	render: function() {
		var that = this;

		var ifWork = function() {
			return (that.props.currentView == 'work');
		};

		return (
			<nav>
				<ul>
					<li
						className={ifWork()}
						onClick={
							function() { 
								that.props.changeView('work');
							}
						}>work</li>
					<li
						className={!(ifWork())}
						onClick={function() { that.props.changeView('about')}}>about</li>
				</ul>
			</nav>
		)
	}
});

var PortfolioPage = React.createClass({
	componentWillMount: function() {
		this.getItems();
	},
	getInitialState: function() {
		return {
			items_raw: {
				"data": [
					{
						"title": "Slice Capital",
						"url": "http://www.slice.capital",
						"img": "/img/slice.png",
						"desc": "A landing page. Built from scratch with HTML, CSS, and vanilla JavaScript."
					},
					{
						"title":"Forward",
						"url": "http://itskrish.co/resume",
						"img": "/img/fwd.png",
						"desc": "A real-estate transaction automation product. Worked across the stack (frontend, backend, devops)."
					},
					{
						"title": "Helix",
						"url": "https://www.behance.net/gallery/23068979/Helix",
						"img": "https://mir-s3-cdn-cf.behance.net/project_modules/hd/bf702323068979.5631cc24e849b.png",
						"desc": "A patient-doctor relationship management system. Built with Node.js for PennApps."
					},
					{
						"title": "ossHack",
						"url": "https://ossHack.github.io",
						"img": "/img/osshack.png",
						"desc": "A landing page. Built from scratch with HTML, LESS.css, and vanilla JavaScript."
					}
				]
			}
		}
	},
	getItems: function() {

		var that = this;

		var shortenUrl = function(url) {
			var fixedUrl = url.split('://')[1];
			fixedUrl = fixedUrl.split('/')[0];
			return fixedUrl;
		}

		var items = this.state.items_raw.data.map(function(it) {
			return (
				<PortfolioItem 
					title={it.title}
					img={it.img}
					url={it.url}
					shortened_url={shortenUrl(it.url)}
					desc={it.desc}/>
			);
		});
		that.setState({
			items: items
		});
	},
	render: function() {

		return (
			<div className="portfolioContainer">
				{this.state.items}
			</div>
		)
	}
});

var PortfolioItem = React.createClass({
	render: function() {
		return (
			<div className="portfolioItem">
				<img src={this.props.img} />
				<div className="desc">
					<h1>{this.props.title}</h1>
					<a className="url" href={this.props.url}>{this.props.shortened_url}</a>
					<p className="long-desc">{this.props.desc}</p>
				</div>
			</div>
		)
	}
});

var About = React.createClass({
	render: function() {

		var that = this;

		var markup = function(){
			return {
			__html: that.props.text
			};
		}

		return (
			<div
				className="aboutSection aboutText"
				dangerouslySetInnerHTML={markup()}>
			</div>
		)
	}
});

var InstaPreview = React.createClass({
	getInitialState: function() {
		return {
			data: {
				link: '#',
				images: {
					standard_resolution: {
						url: "/img/loading.gif"
					}
				}
			}
		}
	},
	componentDidMount: function() {
		this.getLatestPost();
	},
	getLatestPost: function() {

		var that = this;

		$.ajax({
			url: 'http://krish-api.herokuapp.com/api/insta',
			async: true,
			success: function(data) {
				that.setState({
					data: data 
				});
			}
		})
	},
	render: function() {
		return (
			<div className="aboutSection insta">
				<img className="logo" src='/img/insta.png' />
				<a href={this.state.data.link}>
					<img className="thumb" src={this.state.data.images.standard_resolution.url} />
				</a>
				<p className="caption">{this.state.data.caption}</p>
			</div>
		)
	}
});

var LastFm = React.createClass({
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
					name: data.name,
					img: img
				});
			}
		})

	},
	render: function() {
		return (
			<div className="aboutSection last">
				<img src={this.state.img} className="art" />
				<div className="text">
					<p className="name"><img className="eq" src="/img/eq.gif" /><strong> {this.state.name}</strong></p>
					<p className="artist">{this.state.artist}</p>
				</div>
			</div>
		)
	}
})

var AboutPage = React.createClass({
	componentWillMount: function() {
		this.getContent();
	},
	getContent: function() {
		var that = this;

		var md = new Remarkable();

		var rawContent = 'I\'m Krish Dholakiya -- I\'m a **designer**.' +
		' I also dabble in entrepreneurship, music, and social justice.\n\n' +
		'I co-founded **[slice.capital](http://slice.capital)**, ' +
		'and also work part-time as a freelancer. I\'m always available (and eager) to talk; ' +
		'feel free to email me at **krish@slice.capital**.';

		that.setState({
			text: md.render(rawContent)
		});
	},
	render: function() {
		return (
			<div className="aboutContainer">
				<About text={this.state.text} />
				<InstaPreview />
				<LastFm />
			</div>
		)
	}
});

var ContainerItem = React.createClass({
	getInitialState: function() {
		return {
			view: 'about'
		}
	},
	changeView: function(view) {
		this.setState({
				view: view
		});
	},
	render: function() {

		var that = this;

		var ContainerContainer;

		console.log(this.state.view);

		if (this.state.view === 'work') {
			ContainerContainer = PortfolioPage;
		} else {
			ContainerContainer = AboutPage;
		}

		return (
			<div>
				<NavigationItem
					currentView={that.state.view}
					changeView={that.changeView} />
				<ContainerContainer />
			</div>
		);
	}
});

var Paragraph = React.createClass({
	render: function() {
		return (
			<p>{this.props.children}</p>
		)
	}
});

ReactDOM.render(
	<ContainerItem />,
	document.getElementById('content')
);


