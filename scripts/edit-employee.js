let baseUrl = `https://mock5empbackend-production.up.railway.app`

// Function to parse query parameters from the URL
function getQueryParameter(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

// Retrieve the 'id' parameter from the URL
const id = getQueryParameter('id');

if (id !== null) {
    // You can use the 'id' value for further processing
    console.log(`ID from URL: ${id}`);
} else {
    console.error('ID parameter not found in the URL');
}

// Function to retrieve employee data by ID
function fetchEmployeeData(id) {
    fetch(`${baseUrl}/employees/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        showData(data);
    })
    .catch(error => {
        console.error('Error fetching employee data:', error);
    });
}

// Function to populate form fields with employee data
function showData(employeeData) {
    // Select form elements by their IDs
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const departmentSelect = document.getElementById('department');
    const salaryInput = document.getElementById('salary');

    // Populate form fields with data from the employeeData object
    firstNameInput.value = employeeData.firstName;
    lastNameInput.value = employeeData.lastName;
    emailInput.value = employeeData.email;
    departmentSelect.value = employeeData.department;
    salaryInput.value = employeeData.salary;
}

// Function to update employee data
document.getElementById("employeeEditForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting by default

    // Collect the form data
    const formData = new FormData(event.target);

    // Convert form data to a JavaScript object
    const employeeData = {};
    formData.forEach((value, key) => {
        employeeData[key] = value;
    });

    // Send updated employee data to the server for processing
    fetch(`${baseUrl}/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Employee data has been updated');
        window.location.href = 'dashboard.html'; // Redirect to the employees dashboard
    })
    .catch(error => {
        console.error('Error updating employee data:', error);
    });
});

// Call the function to retrieve and display employee data
fetchEmployeeData(id);
