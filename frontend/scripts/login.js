const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector("form.signup");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector(".signup-link a");
const loginText = document.querySelector(".titleText .login");
const signupText = document.querySelector(".titleText .signup");
const invalidspan = document.getElementById("invalid-text");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

// BaseURL
const baseURL = "http://localhost:6420/";

const sendOtpButton = document.getElementById("send-otp");

sendOtpButton.addEventListener("click", async function () {
  const emailInput = document.getElementById("sign-up-email");
  const email = emailInput.value;
  console.log(email);
  try {
    const response = await fetch(`${baseURL}users/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      invalidspan.innerHTML=`${data.msg}`; // Show success message
      invalidspan.style.color = "green"
    } else {
      invalidspan.innerHTML=`${data.msg}`; // Show error message
      invalidspan.style.color = "red"
    }
  } catch (error) {
    console.error("Error:", error);
    
    invalidspan.innerHTML= "Something went wrong !";
  }
});

document.getElementById("register_btn").addEventListener("click", registerUser);
async function registerUser() {
  //getting elements
  const username_input = document.getElementById("sign-up-username");
  const password_input = document.getElementById("sign-up-password");
  const email_input = document.getElementById("sign-up-email");
  const otp_input = document.getElementById("sign-up-otp");
  
  //getting values
  const username = username_input.value;
  const password = password_input.value;
  const email = email_input.value;
  const otp = otp_input.value;
  try {
    if (username && password && email && otp) {
      const response = await fetch(`${baseURL}users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        invalidspan.innerHTML=`${data.msg}`; // Show success message
      invalidspan.style.color = "green"
      } else {
        invalidspan.innerHTML=`${data.msg}`; // Show success message
         invalidspan.style.color = "red"
        // checkCredentials("Invalid Otp or Password"); // Show error message
      }
    } else {
      invalidspan.innerHTML= "Enter Your Details"
      invalidspan.style.color = "red";
    }
  } catch (error) {
    console.error("Error:", error);
    invalidspan.innerHTML= "Something went wrong"; // Show success message
    invalidspan.style.color = "red"
  }
}
/// function to handle Invalid credentials
// async function checkCredentials(message) {
//   const invalidspan = document.getElementById("invalid-text");
//   const invaliddiv = document.getElementById("invalid");
//   invalidspan.innerHTML = message;
//   invaliddiv.classList.remove("invalid-invisible");
//   setTimeout(() => {
//     invaliddiv.classList.add("invalid-invisible");
//   }, 1500);
// }
