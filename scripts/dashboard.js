
    let baseUrl = `https://mock5empbackend-production.up.railway.app`

    const employeeForm = document.getElementById("employeeForm");

    // Call the function to fetch and display employee data
    fetchAndDisplayEmployees();

    employeeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(employeeForm);
        const employeeData = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            department: formData.get("department"),
            salary: parseInt(formData.get("salary"), 10), // Convert to integer
        };

        // Send employee data to your backend API using Fetch
        fetch(`${baseUrl}/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
        })
        .then(response => response.json())
        .then(data => {
            alert('Employee Added')
            console.log("Employee added:", data);
        })
        .catch(error => {
            console.log("Error adding employee:", error);
        });
    });

    function fetchAndDisplayEmployees(query) {
        fetch(`${baseUrl}/employees?${query?query:""}`)
        .then(response => response.json())
        .then(data => {
            showData(data.employees)
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    // Example function to display employee data in the table
    function showData(data) {
        const employeeTable = document.getElementById('employeeTable');
        // Clear the table
        employeeTable.innerHTML = '';
        
        // Loop through the data and create table rows
        data.forEach(employee => {
            // console.log(employee)
            const row = document.createElement('tr');
            row.classList.add('employee-row');
            row.innerHTML = `
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>
                    <button class="edit-button" onclick="editEmployee('${(employee._id)}')">Edit</button>
                </td>
                <td>
                    <button class="delete-button" onclick="deleteEmployee('${(employee._id)}')">Delete</button>
                </td>
            `;
            employeeTable.appendChild(row);
        });
    }
    
    // Function to delete an employee
    function deleteEmployee(id) {
        console.log(id)
        // Send a DELETE request to the JSON Server endpoint for the resource
        fetch(`${baseUrl}/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Object successfully deleted
                console.log(`Employee with ID ${id} deleted.`);
                fetchAndDisplayEmployees();
            } else {
                // Handle error if needed
                console.error(`Failed to delete employee with ID ${appointmentIdToDelete}.`);
            }
        })
        .catch(error => {
            // Handle network or other errors
            console.error(`Error occurred: ${error}`);
        });
    }

    function editEmployee(id){
        window.location.href = `edit-employee.html?id=${id}`;
    }

    function logout() {
        // Remove the token from localStorage
        localStorage.removeItem('token');
      
        // Redirect to index.html
        window.location.href = '../index.html';
      }
      

      function filterEmployees() {
        const searchInput = document.getElementById('search').value.toLowerCase();
        const departmentFilter = document.getElementById('filterDepartment').value
        const sortDirection = document.getElementById('sortSalary').value;

        let query = `search=${searchInput}&department=${departmentFilter}&sort=${sortDirection}`
        fetchAndDisplayEmployees(query)
    }

   