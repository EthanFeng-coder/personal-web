document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener("click", function() {
      const captchaInput = document.getElementById("verification");
      const captchaValue = captchaInput.value.trim();
      const captchaImage = document.querySelector(".captcha-image");
      const captchaSrc = captchaImage.src;
  
      // Extract the CAPTCHA code from the image URL
      const captchaCode = captchaSrc.split("=").pop();
  
      // Validate the CAPTCHA code
      if (captchaValue === captchaCode) {
        // CAPTCHA code matches, submit the form
        document.getElementById("contact-form").submit();
      } else {
        // CAPTCHA code doesn't match, display an error message (you can customize this)
        alert("Invalid CAPTCHA code. Please try again.");
      }
    });
  });
  
  
  
  
  
  
  
  