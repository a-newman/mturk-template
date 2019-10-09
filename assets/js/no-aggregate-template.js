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
            var taskData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var numSubtasks = taskData.length;
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
        $(".exp-data").text("Input for task " + taskInput.toString());
        $("#exp-input").val(taskOutput);
        $("#exp-input").focus();
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
        return $("#exp-input").val();
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
        if (taskOutput.trim().length > 0) {
            return false;
        } else {
            return {errorMessage: "please complete the task!"};
        }
    }
};
