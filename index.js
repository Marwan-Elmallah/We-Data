const table_body = document.getElementById('table-body');
const table_header = document.getElementById('table-header');
const main_body = document.getElementById('main-body');
const display_button = document.getElementById('display-button');
const url = "http://localhost:8000/schedule";

async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayData(data) {
    // Ensure data and data.schedule are valid
    if (!data || !data.schedule) {
        console.error('Invalid data structure:', data);
        return;
    }

    // Clear any existing rows in the table body and header
    table_body.innerHTML = '';
    table_header.innerHTML = '';

    const schedule = data.schedule;
    const agentIds = Object.keys(schedule);

    // Create table headers
    const headerRow = document.createElement('tr');
    const weekHeader = document.createElement('th');
    weekHeader.textContent = 'Week';
    headerRow.appendChild(weekHeader);

    agentIds.forEach(agentId => {
        const headerCell = document.createElement('th');
        headerCell.textContent = agentId;
        headerRow.appendChild(headerCell);
        headerCell.classList.add("text-center");
    });
    table_header.appendChild(headerRow);

    // Determine the number of weeks (assuming all agents have the same number of weeks)
    const numWeeks = schedule[agentIds[0]].length;

    // Create table rows for each week
    for (let weekIndex = 0; weekIndex < numWeeks; weekIndex++) {
        const row = document.createElement('tr');
        const weekCell = document.createElement('td');
        weekCell.textContent = weekIndex + 1;
        row.appendChild(weekCell);

        agentIds.forEach(agentId => {
            const cell = document.createElement('td');
            cell.textContent = schedule[agentId][weekIndex];  // Location for each agent in the current week
            cell.classList.add("text-center");
            if (schedule[agentId][weekIndex] == "annual random" || schedule[agentId][weekIndex] == "annual") {
                cell.classList.add("bg-danger", "text-white");
                // cell.style.backgroundColor = '#D11E1E';
                // cell.style.color = 'white';
            }
            row.appendChild(cell);
        });
        table_body.appendChild(row);
    }
}

window.onload = async () => {
    main_body.style.display = 'block';
    const { data } = await fetchData();
    if (data) {
        console.log(data);
        displayData(data);
    }
}
// display_button.addEventListener('click', async () => {
// });