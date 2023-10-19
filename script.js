document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("csvTable");
    const loadButton = document.getElementById("loadCSV");

    loadButton.addEventListener("click", function () {
        fetch("data.csv")
            .then(response => response.text())
            .then(data => {
                const lines = data.split("\n");
                if (lines.length < 2) {
                    console.error("Invalid CSV format");
                    return;
                }

                // Get the headers and create the table header row
                const headers = lines[0].split(",");
                let headerRow = "<tr>";
                headers.forEach(header => {
                    headerRow += `<th>${header}</th>`;
                });
                headerRow += "</tr>";
                table.innerHTML = headerRow;

                // Populate the table with data
                for (let i = 1; i < lines.length; i++) {
                    const cells = lines[i].split(",");
                    let row = "<tr>";
                    cells.forEach(cell => {
                        row += `<td>${cell}</td>`;
                    });
                    row += "</tr>";
                    table.innerHTML += row;
                }
            })
            .catch(error => console.error("Error loading CSV:", error));
    });
});
