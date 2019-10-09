var custom = {
  loadTasks: function() {
    /*
     * Load and pre-process any files or data required to run this task. This function is called on
     * page load and should implement the promise interface
     *
     * returns: array[taskData, numSubtasks]
     *      task data (obj): data needed to run your task; will be made available to all subtasks
     *      numSubtasks (int): the number of discrete subtasks in your task; will be used to set the
     *        progress bar and guide the task flow.
     */
    return $.get("").then(function() {
      var taskData = {
        number: Math.floor(Math.random() * 10 + 1) // random number between 1 and 10
      };
      var numSubtasks = 3;
      return [taskData, numSubtasks];
    });
  },
  showTask: function(taskInput, taskIndex, taskOutput) {
    /*
     * This function is called when the experiment view is unhidden or when the task index is changed.
     * Should modify the UI to show the current subtask.
     *
     * taskInput (obj): the input object from loadTasks
     * taskIndex (int): the number of the current subtask
     * taskOutput (obj): Responses collected from the user thus far. Starts
     *   as an empty object.
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
        $("#exp-input")
          .show()
          .focus();
        break;
      case 2: // Step 3: thank you page
        $("#exp-input").hide();
        $(".exp-data").text("Thanks for your input!");
        break;
    }
  },
  collectData: function(taskInput, taskIndex, taskOutput) {
    /*
     * This function records the experimental data for the current subtask. It
     * should modify taskOutput.
     *
     * taskInput (obj): The input data from loadTasks
     * taskIndex (int): the number of the current subtask
     * taskOutput (obj): Outputs collected thus far. Starts as an empty object
     *
     * returns: nothing
     */
    switch (taskIndex) {
      case 0: // show the number
        taskOutput.numberShown = taskInput.number;
        break;
      case 1: // record the number
        taskOutput.userResponse = $("#exp-input").val();
        break;
      case 2: // thank-you message; no data collection required
        break;
    }
  },
  validateTask: function(taskInput, taskIndex, taskOutput) {
    /*
     * This function should return a falsey value if data stored in taskOutput is valid
     * (e.g. fully filled out), and otherwise an object {errorMessage: "string"}
     * containing an error message to display.
     *
     * If the errorMessage string has length 0, the data will still be marked as invalid and
     * the task will not be allowed to proceed, but no error message will be displayed (in case
     * you would like to use this function to implement your own error response).
     *
     * taskInput (obj): The task data from loadTasks
     * taskIndex (int): the number of the current subtask
     * taskOutput (int): outputs collected so far.
     *
     * returns: falsey value if the data is valid; otherwise an object with a field "errorMessage"
     *    containing a string error message to display.
     */
    if (taskIndex == 1) {
      //validate user input
      if (parseInt(taskOutput.userResponse.trim()) == taskInput.number) {
        return false;
      } else {
        return { errorMessage: "incorrect response; try again!" };
      }
    }
    return false;
  }
};
