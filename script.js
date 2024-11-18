async function fetchStudentData() {
    const response = await fetch('http://localhost:3000/api/students');
    const data = await response.json();
    const tableBody = document.getElementById('table-body');
    const table = document.getElementById('students-table');
    
    tableBody.innerHTML = ''; 
    table.classList.remove('hidden');

    data.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
        `;
        tableBody.appendChild(row);
    });
}
