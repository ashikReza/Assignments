# [TWS Assignments] (https://github.com/ashikReza/assignments)

This repository contains my assignments for the TWS course. The assignments are:

- [smart-grade-showcase] (https://github.com/ashikReza/assignments/tree/smart-grade-showcase): A web app that showcases the smart grading feature of TWS. It allows users to upload their assignments and get instant feedback and grades. It uses HTML, CSS, JavaScript, and Firebase.
- [Book-Finder] (https://github.com/ashikReza/assignments/tree/Book-Finder): A web app that helps users find books based on their preferences. It uses the Google Books API to fetch book data and display it in a user-friendly interface. It uses HTML, CSS, JavaScript, and Bootstrap.
- [tasker] (https://github.com/ashikReza/assignments/tree/tasker): A web app that helps users manage their tasks and projects. It allows users to create, edit, delete, and prioritize tasks, as well as set deadlines and reminders. It uses HTML, CSS, JavaScript, and React.

## Installation and Usage

To run these projects locally, you need to have Node.js and npm installed on your machine. Then, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/ashikReza/assignments.git`<button class="copy-btn" data-clipboard-text="git clone https://github.com/ashikReza/assignments.git">Copy</button>

2. Navigate to the project folder using `cd assignments`<button class="copy-btn" data-clipboard-text="cd assignments">Copy</button>

3. Choose the project you want to run using `cd project-name`<button class="copy-btn" data-clipboard-text="cd project-name">Copy</button>

4. Install the dependencies using `npm install`<button class="copy-btn" data-clipboard-text="npm install">Copy</button>

5. Start the development server using `npm run dev`<button class="copy-btn" data-clipboard-text="npm run dev">Copy</button>

6. Open your browser and go to `http://localhost:3000` to see the project in action.

## Contributing

If you want to contribute to these projects, you are welcome to do so. Please follow these steps:

1. Fork this repository to your GitHub account using the fork button on the top right corner of this page.

2. Clone your forked repository to your local machine using `git clone https://github.com/ashikReza/assignments.git`<button class="copy-btn" data-clipboard-text="git clone https://github.com/ashikReza/assignments.git">Copy</button>

3. Create a new branch for your feature or bug fix using `git checkout -b branch-name`<button class="copy-btn" data-clipboard-text="git checkout -b branch-name">Copy</button>

4. Make your changes and commit them using `git commit -m "your commit message"`<button class="copy-btn" data-clipboard-text="git commit -m "your commit message"">Copy</button>

5. Push your changes to your remote repository using `git push origin branch-name`<button class="copy-btn" data-clipboard-text="git push origin branch-name">Copy</button>

6. Create a pull request from your forked repository to this repository, describing your changes and why they should be merged.

<!-- Add the CSS styles for the copy button -->
<style>
  .copy-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 10px;
  }
</style>

<!-- Add the script tags for the clipboard.js library and the initialization code -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.8/clipboard.min.js"></script>

<script>
  // Initialize clipboard.js
  var clipboard = new ClipboardJS(".copy-btn");

  // Show a success message when the text is copied
  clipboard.on("success", function (e) {
    e.trigger.textContent = "Copied!";
    setTimeout(function () {
      e.trigger.textContent = "Copy";
    }, 1000);
  });

  // Show an error message when the text is not copied
  clipboard.on("error", function (e) {
    e.trigger.textContent = "Failed!";
    setTimeout(function () {
      e.trigger.textContent = "Copy";
    }, 1000);
  });
</script>
