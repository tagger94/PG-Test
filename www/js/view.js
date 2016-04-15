/*global React*/
/*global ReactDOM*/
/*global User*/

var Parent = React.createClass({

    getInitialState: function () {
        this.pages = new Pages ();
        this.props.controller.updatePage = this.updatePage;
        
        return {
            active: this.pages.main
        };
    },
    
    updatePage: function (newPage) {
        this.setState({
            active : newPage
        });
    },
    
    handleClick: function () {
        var page = this.state.active;
        
        if(page === this.pages.hardwareStore || page === this.pages.gnomes || page === this.pages.testField) {
            this.updatePage(this.pages.garage);
        } else {
            this.updatePage(this.pages.main);
        }
        
    },

    render: function () {

        var active = this.state.active;

        return (
            <div className="parent">
                <div className="topbar">
                    <input type="image" src="img/back.png" alt="Back" onClick={this.handleClick}/>
                    {this.state.active}
                </div>
                
                <div className="child">
                {active === this.pages.main ? (
                    <span>
                        <HomePage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.yard ? (
                    <span>
                        <YardPage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.garage ? (
                    <span>
                        <GaragePage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.hardwareStore ? (
                    <span>
                        <HardwareStorePage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.gnomes ? (
                    <span>
                        <GnomesPage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.testField ? (
                    <span>
                        <TestFieldPage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.profile ? (
                    <span>
                        <ProfilePage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.graph ? (
                    <span>
                        <GraphPage controller={this.props.controller}/>
                    </span>
                ) : active === this.pages.settings ? (
                    <span>
                        <SettingsPage controller={this.props.controller}/>
                    </span>
                ) : (
                    <span>
                        <h1>ERROR</h1>
                        <HomePage />
                    </span>
                )}
                </div>
                
            </div>
        );

     }

});

var HomePage = React.createClass({
    yardClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.yard);
    },
    
    garageClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.garage);
    },
    
    profileClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.profile);
    },
    
    graphClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.graph);
    },
    
    settingsClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.settings);
    },

    render: function() {
        
        return (
            <table className="navigation">
            <tbody>
        <tr>
            <td>
                <button onClick={this.yardClick} >Yard Progress</button>
            </td>
        </tr>
        <tr>
            <td>
                <button onClick={this.garageClick}>Garage</button>
            </td>
        </tr>
        <tr>
            <td>
                <button onClick={this.profileClick}>Profile</button>
            </td>
        </tr>
        <tr>
            <td>
                <button onClick={this.graphClick}>Graph</button>
            </td>
        </tr>
        <tr>
            <td>
                <button onClick={this.settingsClick}>Settings</button>
            </td>
        </tr>
        </tbody>
    </table>
        );
    }
});

var YardPage = React.createClass({
    getInitialState: function() {
        return new User();
    },

    componentWillMount: function() {
        //Set state
        this.setState(this.props.controller.user);
        this.stepInterval = window.setInterval(this.periodicStepUpdate, 1000);
        console.log(this.props.controller.user.stepCurrent);
    },
    
    componentWillUnmount: function() {
        window.clearInterval(this.stepInterval);
    },
    
    render: function() {
        return (
            <div className="yard">
                <Mower mower={this.state.mower} />
                <Money money={this.state.money} />
                <ProgressSimple current={this.state.stepCurrent - this.state.goalTotal} goal={this.state.goalCurrent} />
                <ProgressCircle controller={this.props.controller} />
            </div>
        );
    },
    
    updateMoney: function(amount){
        this.props.controller.user.money += amount;
        this.setState(this.props.controller.user);
    },
    
    periodicStepUpdate: function() {
        this.props.controller.stepper.getStepCount(this.updateStep);
    },
    
    updateStep: function(newTotal) {
        var user = this.props.controller.user;
        user.stepCurrent = newTotal;
        
        //Check Goal Completion
        if(user.stepCurrent - user.goalTotal >= user.goalCurrent) {
            console.log(user);
            
            //Add current goal to running total
            user.goalTotal += user.goalCurrent;
            
            //Double Step Goal;
            user.goalCurrent *= 2;
            
            //Award Money
            this.updateMoney(20);
        }
        
        this.setState(user);
    },
});

var GaragePage = React.createClass({
    getInitialState: function() {
        return new User();
    },
    
    componentWillMount: function() {
        //Set state
        this.setState(this.props.controller.user);
    },
    
    hardwareClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.hardwareStore);
    },
    
    gnomesClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.gnomes);
    },
    
    testFieldClick: function(event) {
        this.props.controller.updatePage(this.props.controller.pages.testField);
    },

    render: function() {
        return (
            <div className="garage">
                <Money money={this.state.money} />
                
                <span>
                    <div className="spacer"/>
                    <input type="image" src="img/hardwarestore.png" alt="HS" onClick={this.hardwareClick}/>
                    <div className="spacer"/>
                    <input type="image" src="img/gnome_male.png" alt="GN" onClick={this.gnomesClick}/>
                    <div className="spacer"/>
                    <input type="image" src="img/fence.png" alt="TF" onClick={this.testFieldClick}/>
                    <div className="spacer"/>
                </span>
                
                <span>
                    <MowerGraphic img="img/mower.png"/>
                    <Mower mower={this.state.mower} />
                </span>
                
            </div>
        );
    }
});

var HardwareStorePage = React.createClass({
    getInitialState: function() {
        return new User();
    },
    
    componentWillMount: function() {
        //Set state
        this.setState(this.props.controller.user);
    },
    
    render: function() {
        return (
            <div>
                <Mower mower={this.state.mower} />
                <Money money={this.state.money} />
            </div>
        );
    }
});

var GnomesPage = React.createClass({

    render: function() {
        return (
            <div>
                <h1>NOT IMPLEMENTED</h1>
            </div>
        );
    }
});

var TestFieldPage = React.createClass({

    render: function() {
        return (
            <div>
                <h1>NOT IMPLEMENTED</h1>
            </div>
        );
    }
});

var ProfilePage = React.createClass({

    render: function() {
        return (
            <div>
                <h1>NOT IMPLEMENTED</h1>
            </div>
        );
    }
});

var GraphPage = React.createClass({

    render: function() {
        return (
            <div>
                <h1>NOT IMPLEMENTED</h1>
            </div>
        );
    }
});

var SettingsPage = React.createClass({

    render: function() {
        return (
            <div>
                <h1>NOT IMPLEMENTED</h1>
            </div>
        );
    }
});

var Mower = React.createClass({

    render: function() {
        return (
            <div className="display">Mower: {this.props.mower}</div>
        );
    }
});

var MowerGraphic = React.createClass({
    
    render: function() {
        return (
            <div className="mowergraphic">
                <img className="display" src={this.props.img}/>
            </div>
        );
    }
});

var Money = React.createClass({

    render: function() {
        return (
            <div className="display">${this.props.money}</div>
        );
    }
});

var ProgressSimple = React.createClass({

    render: function() {
        return (
            <div className="display">Steps: {this.props.current} / {this.props.goal}</div>
        );
    }
});

var ProgressCircle = React.createClass({
    
    componentDidMount: function() {
        //Draw Circle
        this.circle = new ProgressBar.Circle(document.getElementById('progressCircle'), {
            color: '#FCB03C',
            strokeWidth: 2,
            fill: '#aaa',
        });
        
        //Update View
        this.updateProgress();
        this.stepInterval = window.setInterval(this.updateProgress, 1000);
    },

    render: function() {
        return (
            <div id="progressCircle"></div>
        );
    },
    
    updateProgress: function() {
        var user = this.props.controller.user;
        var temp = (user.stepCurrent - user.goalTotal) / user.goalCurrent;
        //Animate Progress Bar
        this.circle.animate(temp);
        this.circle.setText(Math.round(temp * 100) + "%");
    },
});

var Upgrades = React.createClass({

    render: function() {
        return (
            <div>
                
            </div>
        );
    }
});



//Actual Code Time



ReactDOM.render(
    <Parent controller = {controller} />,
    document.getElementById("view")
);