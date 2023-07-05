$(document).ready(function() {
    $("#login-form").submit(function(event) {
      event.preventDefault(); 
  
      var email = $("#email").val();
      var password = $("#password").val();
  
      $.ajax({
        url: "http://localhost/localbb/server/rest/login",
        method: "POST",
        data: {
          email: email,
          password: password
        },
        success: function(response) {
          var token = response.token;
          if (token) {
            localStorage.setItem("token", token);
            console.log("Login successful. Token stored in localStorage.");
            window.location.href = "index.html";
  
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
    
  
    function updateSidebar() {
      var token = localStorage.getItem("token");
      if (token) {
        $(".sidebar-bottom-buttons").html(`
          <li class="sidebar-items-li">Admin panel</li>
          <li class="sidebar-items-li">Logout</li>
        `);
      } else {
        $(".sidebar-bottom-buttons").html(`
          <li class="sidebar-items-li">Sign in</li>
        `);
      }
    }
  
    updateSidebar();
  });
  