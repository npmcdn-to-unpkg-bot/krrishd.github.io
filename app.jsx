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
			<div className="portfolioItem animated bounceInDown">
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
				className="aboutSection"
				dangerouslySetInnerHTML={markup()}>
			</div>
		)
	}
});

var AboutPage = React.createClass({
	componentWillMount: function() {
		this.getContent();
	},
	getContent: function() {
		var that = this;
		$.ajax({
			url: '/about.html',
			async: false,
			success: function(conten) {
				that.setState({
					text: conten
				});
			}
		});
	},
	render: function() {
		return (
			<About text={this.state.text} />
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


