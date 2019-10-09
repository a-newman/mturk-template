var custom = {
    loadTasks: function() {
        /*
         * This function is called on page load and should implement the promise interface
         *
         * numSubtasks - int indicating what length array to return (how many subtasks this task should have)
         * 
         * returns: array[taskData, numSubtasks] 
         *      task Data: if config.meta.aggregate is set to false, an array of objects with length 
         *        config.meta.numTasks, one object for each task; else, an object that will be made 
         *        available to all subtasks
         *      numSubtasks: the number of discrete subtasks in your task; will be used to set the
         *        progress bar and guide the task flow. 
         */
        return $.get("").then(function() {
            var taskData = {
                number: Math.floor(Math.random()*10 + 1) // random number between 1 and 10
            };
            var numSubtasks = 3; 
            return [taskData, numSubtasks]; 
        });
    },
    showTask: function(taskInput, taskIndex, taskOutput) {
        /*
         * This function is called when the experiment view is unhidden 
         * or when the task index is changed
         *
         * taskInput - if config.meta.aggregate is false, the object in the array from loadTasks
         *   corresponding to subtask taskIndex; else, the input object from loadTasks
         * taskIndex - the number of the current subtask 
         * taskOutput - a partially filled out task corresponding to the subtask taskIndex
         *   If config.meta.aggregate is set to false, this is the results object for the current 
         *   subtask. If config.meta.aggregate is set to true, this is the results object for the
         *   entire task. 
         * 
         * returns: None
         */
        switch (taskIndex) {
            case 0: // Step 1: show the number 
                var number = taskInput.number;
                $(".exp-data").text("This is your number: " + number.toString());
                $("#exp-input").hide();
                break;
            case 1: // Step 2: ask users to record the number
                $(".exp-data").text("Please input the number you were shown.");
                if (taskOutput.userResponse) {
                    $("#exp-input").val(taskOutput.userResponse);
                }
                $("#exp-input").show().focus();
                break;
            case 2:  // Step 3: thank you page
                $("#exp-input").hide();
                $(".exp-data").text("Thanks for your input!");
                break;
        }
    },
    collectData: function(taskInput, taskIndex, taskOutput) {
        /* 
         * This function should return the experiment data for the current task 
         * as an object. 
         *
         * taskInput - if config.meta.aggregate is false, the object in the array from loadTasks
         *   corresponding to subtask taskIndex; else, the input object from loadTasks
         * taskIndex - the number of the current subtask 
         * taskOutput - outputs collected for the subtask taskIndex
         *   If config.meta.aggregate is set to false, this is the results object for the current 
         *   subtask. If config.meta.aggregate is set to true, this is the results object for the
         *   entire task.
         *
         * returns: if config.meta.aggregate is false, any object that will be stored as the new
         *   taskOutput for this subtask in the overall array of taskOutputs. If
         *   config.meta.aggregate is true, an object with key-value pairs to be merged with the
         *   taskOutput object.
         */
        switch (taskIndex) {
            case 0: // show the number
                taskOutput.numberShown = taskInput.number;
                break
            case 1: // record the number
                taskOutput.userResponse = $("#exp-input").val();
                break
            case 2: // thank-you message; no data collection required
                break
        }
    },
    validateTask: function(taskInput, taskIndex, taskOutput) {
       /*
         * This function should return a falsey value if data stored in taskOutput is valid 
         * (e.g. fully filled out), and otherwise an object {errorMessage: "string"} 
         * containing an error message to display. 
         * 
         * If the errorMessage string has length 0, the data will still be marked as invalid and
         * the task will not be allowed to proceed, but no error message will be displayed (for
         * instance, if you want to implement your own error announcement). 
         *
         * taskInput - if config.meta.aggregate is false, the object in the array from loadTasks
         *   corresponding to subtask taskIndex; else, the input object from loadTasks
         * taskIndex - the number of the current subtask 
         * taskOutput - outputs collected for the subtask taskIndex
         *   If config.meta.aggregate is set to false, this is the results object for the current 
         *   subtask. If config.meta.aggregate is set to true, this is the results object for the
         *   entire task
         * 
         * returns: falsey value if the data is valid; otherwise an object with a field "errorMessage"
         *    containing a string error message to display. 
         */
        if (taskIndex == 1) { //validate user input 
            if (parseInt(taskOutput.userResponse.trim()) == taskInput.number) {
                return false;
            } else {
                return {errorMessage: "incorrect response; try again!"};
            }
        }
        return false;
    }
};
