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


  
  
  

  
  
  
  
  
  
  
  
  
