// Create a button element
let loginButton = document.createElement("button");
// Set the text content of the button to "Login"
loginButton.textContent = "Login";

// Append the button to the body of the document
document.body.appendChild(loginButton);

// Add event listener to the button
loginButton.addEventListener("click", function () {
  // Prompt the user to enter their username
  let user = prompt("Enter your username");
  let pass;

  // Check if the entered username is "khoder"
  if (user == "khoder") {
    // Prompt the user to enter their password
    pass = prompt("Enter your password");
    // Check if the entered password is "khoder"
    if (pass == "khoder") {
      // Display "Welcome username" if both username and password are correct
      document.write("Welcome ", user);
    } else {
      // Display an error message if the password is incorrect
      document.write("Incorrect password, try again");
    }
  } else {
    // Display an error message if the username is not "khoder"
    document.write("User does not exist, try again");
  }
});
