function User() {
    this.name = "John Deer";
    this.money = 1000;
    this.lawnsCompleted = 0;
    
    this.makePurchase = function(price) {
        if(this.money - price >= 0) {
            this.money -= price;
            return true;
        }
        
        return false;
    }
}

var battery = {
    limit: 100,
    energy: 100,
    cUnit: 1,
    
    getBatteryPercent() {
        return (this.energy / this.limit);
    },
    
    addEnergy(amount) {
        if(amount === undefined) {
            amount = this.cUnit;
        }
        this.energy = Math.min(this.energy + amount, this.limit);
        return this.energy;
    },
    
    removeEnergy(amount) {
        if(this.energy - amount >= 0) {
            this.energy -= amount;
            return true;
        } else {
            return false;
        }
    }
};

var mower = {
    name: "Mower of Grass",
    areaTotal: 0,
    areaGoal: 10,
    width: 1,
    speed: 1,
    
    periodMow: function(mult, add) {
        this.areaTotal += this.width * this.speed;
        
        return this.checkGoal();
    },
    
    //Checks Goal and updates if needed
    checkGoal: function() {
        //Check if goal is met
        if(this.areaTotal > this.areaGoal) {
            //Update Goal
            this.areaGoal *= 2;
            return true;
        } else {
            return false;
        }
    }
}
var upgradeTrack = {
    mower: {
        width: {
            level: 1,
            unit: 1,
            getNextCost: function() {
                return this.level * 20;
            },
            info: "Raises the width of the mower, which increases the amount of area mowed every second.",
        },
        
        speed: {
            level: 1,
            unit: 1,
            getNextCost: function() {
                return this.level * 100;
            },
            info: "Raises the speed of the mower, which increases the amount of area mowed every second.",
        },
    },
    
    battery: {
        limit: {
            level: 1,
            unit:100,
            getNextCost: function() {
                return this.level * 500;
            },
            info: "Raises the maximum amount of energy that you can store. Make it so you can go longer with out charging.",
        },
        
        cUnit: {
            level: 1,
            unit:1,
            getNextCost: function() {
                return this.level * 10;
            },
            info: "Raises the energy gained from interacting with the system.",
        },
    },
}

var controller = {
    user: new User(),
    mower: mower,
    battery: battery,
    upgradeTrack: upgradeTrack,
    pages: new Pages(),
    updatePage: function(newPage) {
        console.log("Function not set");
    },

}