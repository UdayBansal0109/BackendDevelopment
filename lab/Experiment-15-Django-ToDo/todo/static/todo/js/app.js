document.addEventListener("DOMContentLoaded", function() {
    const titleInput = document.querySelector("#title");

    if (titleInput) {
        titleInput.focus();
    }

    // Ask for confirmation before a task is deleted.
    // If JavaScript is disabled the form still works (normal POST).
    document.querySelectorAll("form button.danger").forEach(function(button) {
        button.addEventListener("click", function(event) {
            if (!confirm("Delete this task?")) {
                event.preventDefault();
            }
        });
    });

    console.log("Task Tracker JavaScript loaded.");
});
