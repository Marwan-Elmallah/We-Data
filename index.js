const table_body = document.getElementById('table-body');
const table_header = document.getElementById('table-header');

async function getData() {
    try {
        const response = await fetch('https://wedata.onrender.com/'); // Replace with your server endpoint

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Return the data fetched from the server
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or handle the error accordingly
    }
}

async function displayData() {
    try {
        const data = await getData(); // Wait for getData() to fetch data
        if (data) {
            // console.log(data); // Log the data to console
            data.forEach((item, index) => {
                // console.log(item);
                table_header.innerHTML += `
                <th scope="col">${item.agent} </th>`;

                table_body.innerHTML += `
                <tr id="raw_data_${index}">
                    <th scope="row">${index + 1}</th>
                    <td>${item["locations"][index]["Location"]}</td>
                </tr>
                `

                let current = document.getElementById(`raw_data_${index}`);
                item["locations"].forEach(locat => {
                    current.innerHTML += `
                    <tr>
                        <td>${locat["Location"]}</td>
                    </tr>
                    `
                })
            });
        } else {
            console.error('No data fetched.');
        }
    } catch (error) {
        console.error('Error displaying data:', error);
    }
}

// Call displayData() to fetch and display data when needed
displayData();
