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
	/*getInitialState: function() {
		return {
			items: []
		}
	},*/
	getItems: function() {

		var that = this;

		var shortenUrl = function(url) {
			var fixedUrl = url.split('://')[1];
			fixedUrl = fixedUrl.split('/')[0];
			return fixedUrl;
		}

		$.ajax({
			url:'/portfolio.json',
			async: false,
			success: function(content) {
				var items = content.data;
				console.log(items);
				items = items.map(function(it) {
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
			}
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


