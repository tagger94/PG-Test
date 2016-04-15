var stepper = {
    steps: 0,
    getStepCount: function(success, failure) {
        this.steps++;
        if (true) {
            success(this.steps);
        }
        else {
            failure();
        }
    }
};

var controller = {
    user: new User(),
    stepper: stepper,
    pages: new Pages(),
    updatePage: function(newPage) {
        console.log("Function not set");
    },

}