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
      var taskData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var numSubtasks = taskData.length;
      return [taskData, numSubtasks];
    });
  },
  showTask: function(taskInput, taskIndex, taskOutput) {
    /*
     * This function is called when the experiment view is unhidden or when the task index is
     * changed. Should modify the UI to show the current subtask.
     *
     * taskInput (obj): the input object from loadTasks
     * taskIndex (int): the number of the current subtask
     * taskOutput (obj): Responses collected from the user thus far. Starts
     *   as an empty object.
     *
     * returns: None
     */
    $(".exp-data").text("Input for task " + taskInput[taskIndex].toString());
    $("#exp-input").val(taskOutput[taskIndex]);
    $("#exp-input").focus();
    if (taskIndex == 1) {
      hideIfNotAccepted();
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
    if (!("responses" in taskOutput)) taskOutput.responses = [];
    var response = $("#exp-input").val();
    taskOutput.responses[taskIndex] = response;
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
    var response = taskOutput.responses[taskIndex];
    if (response.trim().length > 0) {
      return false;
    } else {
      return {
        errorMessage: "please complete the task!"
      };
    }
  }
};
