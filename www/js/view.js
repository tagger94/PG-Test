/*global React*/
/*global ReactDOM*/
/*global User*/

var Parent = React.createClass({

    getInitialState: function() {
        this.pages = new Pages();
        this.props.controller.updatePage = this.updatePage;

        return {
            active: this.pages.main
        };
    },

    updatePage: function(newPage) {
        this.setState({
            active: newPage
        });
    },

    handleClick: function() {
        var page = this.state.active;

        if (page === this.pages.hardwareStore || page === this.pages.gnomes || page === this.pages.testField) {
            this.updatePage(this.pages.garage);
        }
        else {
            this.updatePage(this.pages.main);
        }

    },

    render: function() {

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
            <ul className='navigation'>
                <li><button onClick={this.yardClick}>Yard</button></li>
                <li><button onClick={this.garageClick}>Garage</button></li>
                <li><button onClick={this.profileClick}>Profile</button></li>
                <li><button onClick={this.graphClick}>!Graph!</button></li>
                <li><button onClick={this.settingsClick}>!Settings!</button></li>
            </ul>
        );
    }
});

var YardPage = React.createClass({
    getInitialState: function() {
        return {
            money: 0,
            areaTotal: 0,
            areaGoal: 0,
        };
    },

    componentWillMount: function() {
        var c = this.props.controller;
        //Set state
        this.setState({
            money: c.user.money,
            areaTotal: c.mower.areaTotal,
            areaGoal: c.mower.areaGoal,
        });
        //Start interval for updating values
        this.interval = window.setInterval(this.periodicUpdate, 500);
    },

    componentWillUnmount: function() {
        window.clearInterval(this.interval);
    },

    render: function() {
        return (
            <div className="yard">
                <Money money={this.state.money} />
                <ProgressSimple current={this.state.areaTotal} goal={this.state.areaGoal} />
                <Battery battery={this.props.controller.battery}/>
            </div>
        );
    },

    updateMoney: function(amount) {
        this.props.controller.user.money += amount;
        this.setState({
            money: this.props.controller.user.money
        });
    },

    // periodicStepUpdate: function() {
    //     this.props.controller.stepper.getStepCount(this.updateStep);
    // },

    // updateStep: function(newTotal) {
    //     var user = this.props.controller.user;
    //     user.stepCurrent = newTotal;

    //     //Check Goal Completion
    //     if (user.stepCurrent - user.goalTotal >= user.goalCurrent) {
    //         console.log(user);

    //         //Add current goal to running total
    //         user.goalTotal += user.goalCurrent;

    //         //Double Step Goal;
    //         user.goalCurrent *= 2;

    //         //Award Money
    //         this.updateMoney(20);
    //     }

    //     this.setState(user);
    // },

    periodicUpdate: function() {
        //Shorten variable call
        var c = this.props.controller;

        //Try to remove Energy
        if (c.battery.removeEnergy(1)) {
            //Successfuly removed energy

            //Mow Lawn
            if (c.mower.periodMow()) { //Goal Met
                //Update Money
                this.updateMoney(10 + c.mower.areaGoal / 2);

                //Update Completed Goals
                c.user.lawnsCompleted++;

                //Update Goal and Total
                this.setState({
                    areaTotal: c.mower.areaTotal,
                    areaGoal: c.mower.areaGoal,
                });
            }
            else { //Goal not met yet
                //Update Total
                this.setState({
                    areaTotal: c.mower.areaTotal,
                });
            } //END check for goal

        }
        else {
            //Energy Failed to remove
            //Do something later for this
        } //END check energy
    }
});

var GaragePage = React.createClass({

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
        var c = this.props.controller;
        return (
            <div className="garage">
                <Money money={c.user.money} />
                
                <ul className='garagenav'>
                    <li><input type="image" className='hardwareButton' src="img/hardwarestore.png" alt="HS" onClick={this.hardwareClick}/></li>
                    <li><input type="image" className='hardwareButton' src="img/gnome_male.png" alt="GN" onClick={this.gnomesClick}/></li>
                    <li><input type="image" className='hardwareButton' src="img/fence.png" alt="TF" onClick={this.testFieldClick}/></li>
                </ul>
                <span className='garagestat'>
                    <MowerGraphic img="img/mower.png"/>
                    <MowerStats mower={c.mower} />
                </span>
            </div>
        );
    }
});

var HardwareStorePage = React.createClass({
    getInitialState: function() {
        return {money: 0};
    },

    componentWillMount: function() {
        this.updateMoney();
    },

    updateMoney: function() {
        var c = this.props.controller;

        this.setState({
            money: c.user.money,
        });

    },

    render: function() {
        return (
            <div>
                <Money money={this.state.money} />
                <Upgrades controller={this.props.controller} update={this.updateMoney}/>
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
    //this.props.controller.user
    componentWillMount: function() {
        //Set state

    },
    render: function() {
        var user = this.props.controller.user;
        return (

            <div className = "uName">
                <h1>{user.name}</h1>
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

var MowerTitle = React.createClass({

    render: function() {
        return (
            <div className="display">{this.props.mower.name}</div>
        );
    }
});

var MowerStats = React.createClass({
    render: function() {
        var mower = this.props.mower;
        return (
            <table className='mowerstat'>
                <tbody>
                    <tr><th colspan='2'><h1>{mower.name}</h1></th></tr>
                    <tr>
                        <td>Speed:</td><td className='tdcenter'>{mower.speed}</td>
                    </tr>
                    <tr>
                        <td>Width:</td><td className='tdcenter'>{mower.width}</td>
                    </tr>
                    <tr className='areacalc'>
                        <td>Area / Second:</td><td className='tdcenter'>{mower.speed * mower.width}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

var MowerGraphic = React.createClass({

    render: function() {
        return (
            <div className="image">
                <img className="mowerGraphic" src={this.props.img}/>
            </div>
        );
    }
});

var Money = React.createClass({

    render: function() {
        return (
            <div className="money">${this.props.money}</div>
        );
    }
});

var ProgressSimple = React.createClass({

    render: function() {
        return (
            <div className="display">Area: {this.props.current} / {this.props.goal}</div>
        );
    },
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

var Battery = React.createClass({

    componentDidMount: function() {
        //Draw Circle
        this.line = new ProgressBar.Line(document.getElementById('battery'), {
            color: '#000000',
            strokeWidth: 10,
            fill: '#B87333',
            duration: 200,
            easing: 'linear',
            text: {
                style: {
                    color: 'white',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    textAlign: 'right',
                    fontFamily: "'Courier New', Courier, monospace",
                    padding: 0,
                    margin: 0,
                    // You can specify styles which will be browser prefixed
                    transform: {
                        prefix: true,
                        value: 'translate(-50%, -50%)'
                    }
                }
            },
        });


        this.line.set(this.props.battery.getBatteryPercent());

        //Update View
        this.periodicUpdate();
        this.batteryInterval = window.setInterval(this.periodicUpdate);
    },

    componentWillUnmount: function() {
        window.clearInterval(this.batteryInterval);
    },

    render: function() {
        return (
            <div className="battery">
                <div id="battery"></div>
                <button onClick={this.clickBattery}>Charge</button>
            </div>
        );
    },

    periodicUpdate: function() {
        var b = this.props.battery;
        //Animate Progress Bar
        this.line.set(b.getBatteryPercent());
        this.line.setText(b.energy + "<br/>" + b.limit);
    },

    clickBattery: function() {
        var b = this.props.battery;
        b.addEnergy();
        this.line.set(b.getBatteryPercent());
        this.line.setText(b.energy + "<br/>" + b.limit);
    }
});

var InfoButton = React.createClass({

    displayInfo: function() {
        alert(this.props.message)
    },

    render: function() {
        return (
            <a className='info' onClick={this.displayInfo}>i</a>
        );
    }
});

var BuyBox = React.createClass({
    render: function() {
        var p = this.props;
        return (
            <div className='buybox'>
                <span className='title'>{p.name}</span>
                <InfoButton message={p.info} />
                <br/><br/>
                <span className='value'>{p.value}</span>
                <br/>
                <button className='buy' onClick={p.action}>${p.cost}</button>
            </div>
        );
    }
});

var Upgrades = React.createClass({

    getInitialState: function() {
        return {
            money: 0,
            width: 0,
            speed: 0,
            cUnit: 0,
            limit: 0,
            costWidth: 0,
            costSpeed: 0,
            costCUnit: 0,
            costLimit: 0,
        };
    },

    componentWillMount: function() {
        var c = this.props.controller;
        //Set state
        this.setState({
            money: c.user.money,
            width: c.mower.areaTotal,
            speed: c.mower.areaGoal,
            cUnit: c.battery.cUnit,
            limit: c.battery.limit,
            costWidth: c.upgradeTrack.mower.width.getNextCost(),
            costSpeed: c.upgradeTrack.mower.speed.getNextCost(),
            costCUnit: c.upgradeTrack.battery.cUnit.getNextCost(),
            costLimit: c.upgradeTrack.battery.limit.getNextCost(),
        });
        //Start interval for updating values
        this.interval = window.setInterval(this.periodicUpdate, 500);
    },

    render: function() {
        var c = this.props.controller;
        return (
            <div>
                <BuyBox name='Battery Limit' 
                    info={c.upgradeTrack.battery.limit.info} 
                    value={this.state.limit} 
                    cost={this.state.costLimit} 
                    action={this.upgradeLimitClick}>
                </BuyBox>
                
                <BuyBox name='Charge Unit' 
                    info={c.upgradeTrack.battery.cUnit.info} 
                    value={this.state.cUnit} 
                    cost={this.state.costCUnit} 
                    action={this.upgradeUnitClick}>
                </BuyBox>
                
                <BuyBox name='Mower Width' 
                    info={c.upgradeTrack.mower.width.info} 
                    value={this.state.width} 
                    cost={this.state.costWidth} 
                    action={this.upgradeWidthClick}>
                </BuyBox>
                
                <BuyBox name='Mower Speed' 
                    info={c.upgradeTrack.mower.speed.info} 
                    value={this.state.speed} 
                    cost={this.state.costSpeed} 
                    action={this.upgradeSpeedClick}>
                </BuyBox>
            </div>
        );
    },

    updateMoney: function() {
        this.props.update();

        //Check What can be purchased
    },

    upgradeLimitClick: function() {
        var c = this.props.controller;

        //Try purchase
        if (c.user.makePurchase(c.upgradeTrack.battery.limit.getNextCost())) {
            c.battery.limit += c.upgradeTrack.battery.limit.unit;
            c.upgradeTrack.battery.limit.level++;
            this.setState({
                limit: c.battery.limit,
                costLimit: c.upgradeTrack.battery.limit.getNextCost(),
            });
            this.updateMoney();
        }
    },

    upgradeUnitClick: function() {
        var c = this.props.controller;

        //Try purchase
        if (c.user.makePurchase(c.upgradeTrack.battery.cUnit.getNextCost())) {
            c.battery.cUnit += c.upgradeTrack.battery.cUnit.unit;
            c.upgradeTrack.battery.cUnit.level++;
            this.setState({
                cUnit: c.battery.cUnit,
                costCUnit: c.upgradeTrack.battery.cUnit.getNextCost(),
            });
            this.updateMoney();
        }
    },

    upgradeWidthClick: function() {
        var c = this.props.controller;

        //Try purchase
        if (c.user.makePurchase(c.upgradeTrack.mower.width.getNextCost())) {
            c.mower.width += c.upgradeTrack.mower.width.unit;
            c.upgradeTrack.mower.width.level++;
            this.setState({
                width: c.mower.width,
                costWidth: c.upgradeTrack.mower.width.getNextCost(),
            });
            this.updateMoney();
        }
    },

    upgradeSpeedClick: function() {
        var c = this.props.controller;

        //Try purchase
        if (c.user.makePurchase(c.upgradeTrack.mower.speed.getNextCost())) {
            c.mower.speed += c.upgradeTrack.mower.speed.unit;
            c.upgradeTrack.mower.speed.level++;
            this.setState({
                speed: c.mower.speed,
                costSpeed: c.upgradeTrack.mower.speed.getNextCost(),
            });
            this.updateMoney();
        }
    }
});


//Actual Code Time



ReactDOM.render(
    <Parent controller = {controller} />,
    document.getElementById("view")
);