document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.createElement('div'); // Crear elemento para el mensaje de error
    errorMessage.classList.add('error-message');
    loginForm.appendChild(errorMessage); // Agregar el mensaje de error al formulario

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe de inmediato

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        // Suponiendo que estás utilizando Fetch API para realizar solicitudes HTTP
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value,
            }),
        })
        .then(response => {
            if (response.ok) {
                errorMessage.style.display = 'none';
                // Aquí puedes continuar con el envío del formulario si las credenciales son válidas
                loginForm.submit();
            } else {
                errorMessage.textContent = "Usuario o contraseña incorrecta";
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = "Error de conexión, por favor intenta de nuevo más tarde";
            errorMessage.style.display = 'block';
        });
    });
});
