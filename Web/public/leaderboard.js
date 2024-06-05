let usersData = [];

// Función para cargar los datos de los usuarios
function loadUsers() {
  fetch('/users')
    .then(response => response.json())
    .then(usersWithDetails => {
      usersData = usersWithDetails;
      populateCompanyFilter(usersWithDetails);
      displayUsers(usersWithDetails);
    })
    .catch(error => console.error('Error al obtener el leaderboard:', error));
}

// Función para mostrar los usuarios en la tabla
function displayUsers(users) {
  const leaderboard = document.getElementById('leaderboard').querySelector('tbody');
  leaderboard.innerHTML = ''; // Limpiar la tabla antes de llenarla
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.company}</td>
      <td>${user.status_s || 'Unknown'}</td>
      <td>${user.role || 'N/A'}</td> <!-- Mostrar el nivel del usuario -->
    `;
    leaderboard.appendChild(row);
  });
}

// Función para poblar los filtros de compañía
function populateCompanyFilter(users) {
  const companyFilter = document.getElementById('companyFilter');
  const companies = [...new Set(users.map(user => user.company))];
  companies.forEach(company => {
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="checkbox" value="${company}" onclick="applyFilters()"> ${company}
    `;
    companyFilter.appendChild(label);
  });
}

// Función para obtener los valores seleccionados de los filtros
function getSelectedValues(filterId) {
  const checkboxes = document.querySelectorAll(`#${filterId} input[type="checkbox"]`);
  const selectedValues = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedValues.push(checkbox.value);
    }
  });
  return selectedValues;
}

// Función para aplicar los filtros seleccionados
function applyFilters() {
  const selectedCompanies = getSelectedValues('companyFilter');
  const selectedStatuses = getSelectedValues('statusFilter');
  let filteredUsers = usersData;

  if (selectedCompanies.length > 0) {
    filteredUsers = filteredUsers.filter(user => selectedCompanies.includes(user.company));
  }

  if (selectedStatuses.length > 0) {
    filteredUsers = filteredUsers.filter(user => selectedStatuses.includes(user.status_s));
  }

  displayUsers(filteredUsers);
}

// Función para mostrar y ocultar las opciones de filtro al hacer clic en la flecha
function toggleFilter(filterId, arrowElement) {
  const filterContent = document.getElementById(filterId);
  if (filterContent.style.display === 'block') {
    filterContent.style.display = 'none';
    arrowElement.classList.remove('open');
  } else {
    filterContent.style.display = 'block';
    arrowElement.classList.add('open');
  }
}

// Función para manejar el cierre de sesión
function signOut() {
  fetch('/auth/logout', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    })
    .catch(error => console.error('Error al cerrar sesión:', error));
}

// Cargar los usuarios al cargar la página
loadUsers();
