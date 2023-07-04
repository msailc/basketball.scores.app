$(document).ready(function() {
    $("#login-form").submit(function(event) {
      event.preventDefault(); // Prevent form submission
  
      var email = $("#email").val();
      var password = $("#password").val();
  
      // Send login request
      $.ajax({
        url: "http://localhost/localbb/server/rest/login",
        method: "POST",
        data: {
          email: email,
          password: password
        },
        success: function(response) {
          // Assuming the response contains the token
          var token = response.token;
          if (token) {
            // Store the token in localStorage
            localStorage.setItem("token", token);
            console.log("Login successful. Token stored in localStorage.");
            window.location.href = "index.html";
  
            // Redirect to the main page or update the sidebar based on the token's presence
            updateSidebar();
          } else {
            console.log("Login failed. Token not found in the response.");
          }
        },
        error: function(xhr, status, error) {
          console.error("Login request failed:", error);
        }
      });
    });
    
  
    // Function to update the sidebar based on the token's presence
    function updateSidebar() {
      var token = localStorage.getItem("token");
      if (token) {
        // Token is present, show Admin panel and Logout options
        $(".sidebar-bottom-buttons").html(`
          <li class="sidebar-items-li">Admin panel</li>
          <li class="sidebar-items-li">Logout</li>
        `);
      } else {
        // Token is not present, show the default Sign in option
        $(".sidebar-bottom-buttons").html(`
          <li class="sidebar-items-li">Sign in</li>
        `);
      }
    }
  
    // Call updateSidebar() on page load
    updateSidebar();
  });
  