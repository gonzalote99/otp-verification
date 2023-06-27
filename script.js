let otpInput = document.querySelectorAll("[name=otp]"); // Get all the inputs.
let verifyOtpBtn = document.getElementsByTagName('button')[0]; // Get verify button.
const pasteBtn = document.querySelector('#paste-btn'); // Get paste button.

// To keep button disabled till all the fields are filled.
const checkInputs = () => {
    let validInputs = Array.from(otpInput).filter( input => input.value !== "");
    if(validInputs.length == 6) {
        verifyOtpBtn.classList.remove("disabled");
    }
}

const pasteOTP = () => {
  let clipboardData = navigator.clipboard.readText();
  clipboardData.then((clipboardText) => {
    const digits = clipboardText.match(/\d+/g);
    const firstValue = Object.values(digits)[0].split('');
    if(firstValue && firstValue.length > 0) {
      otpInput.forEach((el, index) => {
        if(index <= firstValue.length) {
          el.value = firstValue[index];
          otpInput[index + 1]?.focus();
        } else {
          el.value = '';
        }
      })
      checkInputs()
    }
  })
}

pasteBtn.addEventListener('click', () => {
  pasteOTP();
});


otpInput.forEach((el, index) => {
  el.addEventListener('input', () => {
    let value = el.value;
    value = value.replace(/[^0-9]/g, "");
    if(value.length > 1) {
      value = value.slice(0, 1);
    }
    el.value = value;
  });

  el.addEventListener('keyup', (event) => {
    const key = event.key;
    if(el.value.length >= 1 && (key >= 96 || key <= 105)) {
      otpInput[index + 1]?.focus();
    }
    else if(el.value == '' && key === "Backspace") {
      verifyOptBtn.classList.add('disabled');
      otpInput[index - 1]?.focus();
    }
    checkInputs();
  })


})


otpInput[0].addEventListener('keydown', function (ev) {
  ev = ev || window.event;
  var key = ev.which || ev.keyCode;

  var ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) 
  ? true : false);

  if(key == 86 && ctrl) {
    pasteOTP();
  }
});

const form = document.getElementsByTagName('form')[0];

window.onload = function() {
  form.reset();
  otpInput[0].focus();
}
  let fullOtp = [];
  let correctOtp = "123456";
  let attempts = 0;
  form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const formData = new FormData(form);
    for(const pair of formData.entries()) {
      fullOtp.push(pair[1]);
    }
    let a = fullOtp.join('');
    if(a == correctOtp) {
      document.getElementsByTagName('body')[0].innerText = 'correct otp';
    } else {
      attempts++;
      if(attempts < 3) {
        alert( `entered incorrect, have ${3 - attempts} attempts`);
        for(let i = 0; i < otpInput.length - 1; i++ ) {
          if(otpInput[i].value == "") {
            otpInput[i].focus();
            break;
          }
        }
        fullOtp = [];
      } else {
        alert('exceeded number attempts');
         window.location.reload();
      }
    }
  })
