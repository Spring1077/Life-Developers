document.getElementById('continue-button').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const errorMessage = document.querySelector('#step1 .error-message');
    
    if (!validateEmail(email)) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    }
});

document.getElementById('continue-button-step2').addEventListener('click', function() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const birthDate = document.getElementById('birth-date').value;
    const errorMessageFirstName = document.querySelector('#step2 #first-name + .error-message');
    const errorMessageLastName = document.querySelector('#step2 #last-name + .error-message');
    const errorMessageBirthDate = document.querySelector('#step2 #birth-date + .error-message');

    if (!firstName) {
        errorMessageFirstName.style.display = 'block';
    } else {
        errorMessageFirstName.style.display = 'none';
    }

    if (!lastName) {
        errorMessageLastName.style.display = 'block';
    } else {
        errorMessageLastName.style.display = 'none';
    }

    if (!birthDate) {
        errorMessageBirthDate.style.display = 'block';
    } else {
        errorMessageBirthDate.style.display = 'none';
    }

    if (firstName && lastName && birthDate) {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
    }
});


document.getElementById('continue-button-step3').addEventListener('click', function() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
});

document.getElementById('skip-button-step3').addEventListener('click', function() {
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


document.getElementById('continue-button-step4').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.querySelector('#step4 .error-message');
    const termsCheckbox = document.getElementById('terms-checkbox');

    if (!password || !confirmPassword || password !== confirmPassword) {
        errorMessage.textContent = "Passwords don't match";
        errorMessage.style.display = 'block';
    } else if (password.length < 15) {
        errorMessage.textContent = "Password must be at least 15 characters long";
        errorMessage.style.display = 'block';
    } else if (!validatePassword(password)) {
        errorMessage.textContent = "Password must not contain your first name, last name, or email address";
        errorMessage.style.display = 'block';
    } else if (!termsCheckbox.checked) {
        errorMessage.textContent = "Please agree to the terms and conditions";
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        // Code to proceed to next step or submit form
    }
});

function validatePassword(password) {
    const firstName = document.getElementById('first-name').value.toLowerCase();
    const lastName = document.getElementById('last-name').value.toLowerCase();
    const email = document.getElementById('email').value.toLowerCase();

    if (password.includes(firstName) || password.includes(lastName) || password.includes(email)) {
        return false;
    }
    return true;
}

// Hide the confirm password input field
document.getElementById('confirm-password').style.display = 'none';

