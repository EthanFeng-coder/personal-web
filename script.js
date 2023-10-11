window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-6E7P137R0P');

function generateCaptcha() {
    var chars = '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
    var captchaLength = 4;
    var captcha = '';
    
    for(var i = 0; i < captchaLength; i++) {
        var randomIndex = Math.floor(Math.random() * chars.length);
        captcha += chars.substring(randomIndex, randomIndex+1);
    }

    var canvas = document.getElementById('captcha-canvas');
    var context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set the font and background
    context.font = '30px Arial';
    context.fillStyle = '#f0e9e9';

    // Add random lines for added complexity
    for(var i = 0; i < 5; i++) {
        context.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        context.stroke();
    }

    // Add the CAPTCHA text
    context.fillStyle = '#000';
    context.fillText(captcha, 30, 40);

    // Save the captcha text so we can verify it later
    canvas.setAttribute('data-captcha', captcha);
}

window.onload = generateCaptcha;


(function(){
  emailjs.init("q9oQfd5eXYq2enm0w");
})();


document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var enteredCaptcha = document.getElementById('verification').value;
  var canvas = document.getElementById('captcha-canvas');
  var generatedCaptcha = canvas.getAttribute('data-captcha');

  if(enteredCaptcha === generatedCaptcha) {
      // CAPTCHA is correct, now we can prepare to send the email
      var templateParams = {
        name: document.getElementById('name').value,
        contact_info: document.getElementById('contact-info').value,
        message: document.getElementById('message').value,
      };

      emailjs.send('service_hrxsr1k', 'template_0hipbzj', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          document.getElementById('message-notification').innerHTML = 'Thank you for contact me I will respon soon';
          document.getElementById('message-notification').style.backgroundColor = 'green';
          document.getElementById('message-notification').style.display = 'block';
          setTimeout(function() {
            document.getElementById('message-notification').style.display = 'none';
          }, 5000);
          document.getElementById('name').value = '';
          document.getElementById('contact-info').value = '';
          document.getElementById('message').value = '';
          document.getElementById('verification').value = '';
          generateCaptcha();
        }, function(error) {
          console.log('FAILED...', error);
          alert('Failed to send message. Please try again later');
        });
  } else {
      // CAPTCHA is incorrect, show an error message
      document.getElementById('message-notification').innerHTML = 'Incorrect CAPTCHA. Please try again.';
      document.getElementById('message-notification').style.backgroundColor = 'red';
      document.getElementById('message-notification').style.display = 'block';
      setTimeout(function() {
      document.getElementById('message-notification').style.display = 'none';
      }, 5000);
      document.getElementById('verification').value = '';
      generateCaptcha(); // Generate a new CAPTCHA
  }
});

$(document).ready(function() {
  $('a.nav-link[href^="#"]').click(function(event) {
      event.preventDefault();
      var target = $($(this).attr('href'));
      if (target.length) {
          $('html, body').animate({
              scrollTop: target.offset().top - 130
          }, 300);
      }
  });
});

$(document).ready(function() {
  // When "HTB solutions" link is clicked
  $(document).ready(function() {
    // When the HTB link is clicked
    $('a[href="#htb"]').on('click', function(e) {
        e.preventDefault();
        
        // Hide all sections except for HTB
        $('.page-section').attr('hidden', true);
        $('#htb').removeAttr('hidden');

        // Hide the lab sections
        $('.lab-content').attr('hidden', true);
        
        // Restore all lab tags
        $('.lab-item').removeAttr('hidden');
        
        // Hide the go-back button
        if (document.getElementById('go-back-btn')) {
            document.getElementById('go-back-btn').setAttribute('hidden', 'true');
        }

        // Animate the scroll to the HTB section
        $('html, body').animate({
            scrollTop: $('#htb').offset().top -150
        }, 300);
    });

    // When other links are clicked
    $('a.nav-link').not('a[href="#htb"]').on('click', function(e) {
        e.preventDefault();
        var targetSection = $(this).attr('href');
        if (document.getElementById('go-back-btn')) {
          document.getElementById('go-back-btn').setAttribute('hidden', 'true');
      }
        
        // Show all sections
        $('.page-section').removeAttr('hidden');
         // Hide it initially
        
        // Keep the HTB section hidden
        $('#htb').attr('hidden', true);
        
        // Scroll to the targeted section
        $('html, body').animate({
            scrollTop: $(targetSection).offset().top - 130
        }, 300);
    });
});
});

function toggleLabDetails(labId) {
  let labElement = document.getElementById(labId);
  if (labElement.hasAttribute('hidden')) {
      labElement.removeAttribute('hidden');
  } else {
      labElement.setAttribute('hidden', 'true');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let labSelections = document.querySelectorAll('.lab-item');
  let labContents = document.querySelectorAll('.lab-content'); // Assuming you have multiple contents
  let backButton = document.createElement('button');

  // Configure the back button
  backButton.innerText = "Go Back";
  backButton.setAttribute('hidden', 'true'); // Hide it initially
  backButton.addEventListener('click', function() {
      labContents.forEach(content => content.setAttribute('hidden', 'true'));
      labSelections.forEach(item => item.removeAttribute('hidden'));
      backButton.setAttribute('hidden', 'true');
      backButton.id = 'go-back-btn'; // Add this line to set the id for styling
  });
  document.body.appendChild(backButton); // Add it to the body once

  labSelections.forEach((item, index) => {
      item.addEventListener('click', function() {
          labSelections.forEach(item => item.setAttribute('hidden', 'true'));
          
          // Only show the content corresponding to the clicked lab
          labContents[index].removeAttribute('hidden'); 
          
          backButton.removeAttribute('hidden');
      
      });
  });
});




  
  
  
  
  
  
  
  
  
