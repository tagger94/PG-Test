/*global React*/
/*global ReactDOM*/
/*global User*/

var HomePage = React.createClass({
    render: function() {
        const style = {
            
        };
        
        return (
            <div>
                <Navigation stepper={this.props.stepper}/>
            </div>
        );
    }
});

var Navigation = React.createClass({
    yardClick: function(event) {
        console.log(this.props);
        ReactDOM.render(
            <YardPage stepper={this.props.stepper}/>,
            document.getElementById("view")
        );
    },

    render: function() {
        const style = {
            
        };
        
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
                <button >Garage</button>
            </td>
        </tr>
        <tr>
            <td>
                <button id='btn_profile'>Profile</button>
            </td>
        </tr>
        <tr>
            <td>
                <button id='btn_graph'>Graph</button>
            </td>
        </tr>
        <tr>
            <td>
                <button id='btn_settings'>Settings</button>
            </td>
        </tr>
        </tbody>
    </table>
        );
    }
});

var YardPage = React.createClass({
    getInitialState: function() {
        return {user: new User()};
    },
    
    updateMoney: function(){
        this.state.user.money++;
        this.setState(this.state.user);
    },
    
    updateStep: function(newTotal) {
        this.state.user.stepTotal = newTotal;
        this.setState(this.state.user);
    },
    
    periodicStepUpdate: function() {
        this.props.stepper.getStepCount(this.updateStep);
    },
    
    componentWillMount: function() {
        this.updateMoney();
        this.periodicStepUpdate();
        window.setInterval(this.updateMoney, 1000);
        window.setInterval(this.periodicStepUpdate, 1000);
    },
    
    render: function() {
        const style = {
            
        };
        
        return (
            <div>
                <Mower mower={this.state.user.mower} />
                <Money money={this.state.user.money} />
                <ProgressSimple total={this.state.user.stepTotal} />
                <ProgressCircle stepper={this.props.stepper} />
            </div>
        );
    }
});

var Mower = React.createClass({

    render: function() {
        const style = {
            border: 'solid black .5vw',
            borderRadius: '4vw',
            padding: '2vw',
            fontSize: '3vw',
            width: '50vw',
            backgroundColor: '#8AD819'
        };
        
        return (
            <div className="display">Mower: {this.props.mower}</div>
        );
    }
});

var Money = React.createClass({

    render: function() {
        const style = {
            border: 'solid black .5vw',
            borderRadius: '4vw',
            padding: '2vw',
            fontSize: '3vw',
            width: '50vw',
            backgroundColor: '#8AD819'
        };
        
        return (
            <div className="display">${this.props.money}</div>
        );
    }
});

var ProgressSimple = React.createClass({

    render: function() {
        const style = {
            border: 'solid black .5vw',
            borderRadius: '4vw',
            padding: '2vw',
            fontSize: '3vw',
            width: '50vw',
            backgroundColor: '#8AD819'
        };
        
        return (
            <div className="display">Step Total: {this.props.total}</div>
        );
    }
});

var ProgressCircle = React.createClass({
    
    getInitialState: function() {
        return {total: 0, goal: 1000};
    },
    
    updateStep: function(newTotal) {
        this.state.total = newTotal;
        this.setState(this.state.user);
        this.circle.animate(this.state.total / this.state.goal);
        this.circle.setText(Math.round(this.state.total / this.state.goal * 100) + "%");
    },
    
    periodicStepUpdate: function() {
        this.props.stepper.getStepCount(this.updateStep);
    },
    
    componentDidMount: function() {
        this.circle = new ProgressBar.Circle(document.getElementById('progressCircle'), {
            color: '#FCB03C',
            strokeWidth: 2,
            fill: '#aaa',
        });
        
        this.periodicStepUpdate();
        
        window.setInterval(this.periodicStepUpdate, 1000);
    },

    render: function() {
        const style = {
            
        };
        
        return (
            <div id="progressCircle"></div>
        );
    }
});



//Actual Code Time


if(!stepcounter){
    var stepcounter = {};
    stepcounter.steps = 0;
    stepcounter.getStepCount = function(success, failure) {
        this.steps++
        if(true) {
            success(this.steps);
        } else {
            failure();
        }
        
    };
}

ReactDOM.render(
    <YardPage stepper = {stepcounter} />,
    document.getElementById("view")
);