// --- Start of Updated scripts.js ---

document.addEventListener("DOMContentLoaded", function () {
    const farmerList = document.getElementById("farmerList");
    const farmerInput = document.getElementById("farmerName");

    // Example farmers (Replace this with real data from Firebase if needed)
    const farmers = ["Dashrath Salunke", "Anand Nandgavn", "Parasa Alas"];

    // Load farmers into datalist
    function loadFarmers() {
        farmerList.innerHTML = ""; // Clear previous options
        farmers.forEach(farmer => {
            const option = document.createElement("option");
            option.value = farmer;
            farmerList.appendChild(option);
        });
    }

    loadFarmers(); // Populate the list on page load

    // Event: Show filtered suggestions while typing
    farmerInput.addEventListener("input", function () {
        const inputValue = this.value.toLowerCase();
        farmerList.innerHTML = ""; // Clear previous options

        farmers.forEach(farmer => {
            if (farmer.toLowerCase().includes(inputValue)) {
                const option = document.createElement("option");
                option.value = farmer;
                farmerList.appendChild(option);
            }
        });
    });
});


document.getElementById("billDate").addEventListener("change", generatePreviousDates);

function generatePreviousDates() {
    const selectedDate = new Date(document.getElementById("billDate").value);
    const morningTableBody = document.getElementById("morningTableBody");
    const eveningTableBody = document.getElementById("eveningTableBody");

    // Use arrays to build content (performance improvement added for efficiency)
    const morningRows = [];
    const eveningRows = [];

    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 6);

    const formattedOptions = { month: '2-digit', day: '2-digit' };

    for (let i = 0; i < 7; i++) {
        const formattedDate = currentDate.toLocaleDateString('en-GB', formattedOptions);
        
        // 4-column structure (Date, Litres, Fat, SNF) + 5th column (Total Amount)
        // NOTE: No visible Rate column is included here as requested.
        const rowMorning = `
            <tr>
                <td>${formattedDate}</td>
                <td><input type="number" step="0.01" class="input litres-morning" onchange="calculateAmount('morning', this)"></td>
                <td><input type="number" step="0.01" class="input fat-morning" onchange="calculateAmount('morning', this)"></td>
                <td><input type="number" step="0.01" class="input snf-morning" onchange="calculateAmount('morning', this)"></td>
                <td class="total-amount-morning"></td> </tr>
        `;
        morningRows.push(rowMorning);

        const rowEvening = `
            <tr>
                <td>${formattedDate}</td>
                <td><input type="number" step="0.01" class="input litres-evening" onchange="calculateAmount('evening', this)"></td>
                <td><input type="number" step="0.01" class="input fat-evening" onchange="calculateAmount('evening', this)"></td>
                <td><input type="number" step="0.01" class="input snf-evening" onchange="calculateAmount('evening', this)"></td>
                <td class="total-amount-evening"></td> </tr>
        `;
        eveningRows.push(rowEvening);

        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Update innerHTML once for efficiency
    if(morningTableBody) morningTableBody.innerHTML = morningRows.join('');
    if(eveningTableBody) eveningTableBody.innerHTML = eveningRows.join('');
}


// --- START OF NEW/MODIFIED RATE LOGIC (UPDATED WITH YOUR JSON) ---

// Milk Rate Chart converted from your JSON (unchanged, using your provided data)
const milkRateChart = {
    "5.0": {
        "7.5": 38.50, "7.6": 39.00, "7.7": 39.50, "7.8": 40.00, "7.9": 40.50, 
        "8.0": 41.00, "8.1": 41.50, "8.2": 42.00, "8.3": 42.50, "8.4": 43.00, 
        "8.5": 43.50, "8.6": 44.00, "8.7": 44.50, "8.8": 45.00, "8.9": 45.50, 
        "9.0": 46.00, "9.1": 46.05, "9.2": 46.10, "9.3": 46.15, "9.4": 46.20, "9.5": 46.25
    },
    "5.1": {
        "7.5": 39.00, "7.6": 39.50, "7.7": 40.00, "7.8": 40.50, "7.9": 41.00, 
        "8.0": 41.50, "8.1": 42.00, "8.2": 42.50, "8.3": 43.00, "8.4": 43.50, 
        "8.5": 44.00, "8.6": 44.50, "8.7": 45.00, "8.8": 45.50, "8.9": 46.00, 
        "9.0": 46.50, "9.1": 46.55, "9.2": 46.60, "9.3": 46.65, "9.4": 46.70, "9.5": 46.75
    },
    "5.2": {
        "7.5": 39.50, "7.6": 40.00, "7.7": 40.50, "7.8": 41.00, "7.9": 41.50, 
        "8.0": 42.00, "8.1": 42.50, "8.2": 43.00, "8.3": 43.50, "8.4": 44.00, 
        "8.5": 44.50, "8.6": 45.00, "8.7": 45.50, "8.8": 46.00, "8.9": 46.50, 
        "9.0": 47.00, "9.1": 47.05, "9.2": 47.10, "9.3": 47.15, "9.4": 47.20, "9.5": 47.25
    },
    "5.3": {
        "7.5": 40.00, "7.6": 40.50, "7.7": 41.00, "7.8": 41.50, "7.9": 42.00, 
        "8.0": 42.50, "8.1": 43.00, "8.2": 43.50, "8.3": 44.00, "8.4": 44.50, 
        "8.5": 45.00, "8.6": 45.50, "8.7": 46.00, "8.8": 46.50, "8.9": 47.00, 
        "9.0": 47.50, "9.1": 47.55, "9.2": 47.60, "9.3": 47.65, "9.4": 47.70, "9.5": 47.75
    },
    "5.4": {
        "7.5": 40.50, "7.6": 41.00, "7.7": 41.50, "7.8": 42.00, "7.9": 42.50, 
        "8.0": 43.00, "8.1": 43.50, "8.2": 44.00, "8.3": 44.50, "8.4": 45.00, 
        "8.5": 45.50, "8.6": 46.00, "8.7": 46.50, "8.8": 47.00, "8.9": 47.50, 
        "9.0": 48.00, "9.1": 48.05, "9.2": 48.10, "9.3": 48.15, "9.4": 48.20, "9.5": 48.25
    },
    "5.5": {
        "7.5": 41.00, "7.6": 41.50, "7.7": 42.00, "7.8": 42.50, "7.9": 43.00, 
        "8.0": 43.50, "8.1": 44.00, "8.2": 44.50, "8.3": 45.00, "8.4": 45.50, 
        "8.5": 46.00, "8.6": 46.50, "8.7": 47.00, "8.8": 47.50, "8.9": 48.00, 
        "9.0": 48.50, "9.1": 48.55, "9.2": 48.60, "9.3": 48.65, "9.4": 48.70, "9.5": 48.75
    },
    "5.6": {
        "7.5": 41.50, "7.6": 42.00, "7.7": 42.50, "7.8": 43.00, "7.9": 43.50, 
        "8.0": 44.00, "8.1": 44.50, "8.2": 45.00, "8.3": 45.50, "8.4": 46.00, 
        "8.5": 46.50, "8.6": 47.00, "8.7": 47.50, "8.8": 48.00, "8.9": 48.50, 
        "9.0": 49.00, "9.1": 49.05, "9.2": 49.10, "9.3": 49.15, "9.4": 49.20, "9.5": 49.25
    },
    "5.7": {
        "7.5": 42.00, "7.6": 42.50, "7.7": 43.00, "7.8": 43.50, "7.9": 44.00, 
        "8.0": 44.50, "8.1": 45.00, "8.2": 45.50, "8.3": 46.00, "8.4": 46.50, 
        "8.5": 47.00, "8.6": 47.50, "8.7": 48.00, "8.8": 48.50, "8.9": 49.00, 
        "9.0": 49.50, "9.1": 49.55, "9.2": 49.60, "9.3": 49.65, "9.4": 49.70, "9.5": 49.75
    },
    "5.8": {
        "7.5": 42.50, "7.6": 43.00, "7.7": 43.50, "7.8": 44.00, "7.9": 44.50, 
        "8.0": 45.00, "8.1": 45.50, "8.2": 46.00, "8.3": 46.50, "8.4": 47.00, 
        "8.5": 47.50, "8.6": 48.00, "8.7": 48.50, "8.8": 49.00, "8.9": 49.50, 
        "9.0": 50.00, "9.1": 50.05, "9.2": 50.10, "9.3": 50.15, "9.4": 50.20, "9.5": 50.25
    },
    "5.9": {
        "7.5": 43.00, "7.6": 43.50, "7.7": 44.00, "7.8": 44.50, "7.9": 45.00, 
        "8.0": 45.50, "8.1": 46.00, "8.2": 46.50, "8.3": 47.00, "8.4": 47.50, 
        "8.5": 48.00, "8.6": 48.50, "8.7": 49.00, "8.8": 49.50, "8.9": 50.00, 
        "9.0": 50.50, "9.1": 50.55, "9.2": 50.60, "9.3": 50.65, "9.4": 50.70, "9.5": 50.75
    },
    "6.0": {
        "7.5": 43.50, "7.6": 44.00, "7.7": 44.50, "7.8": 45.00, "7.9": 45.50, 
        "8.0": 46.00, "8.1": 46.50, "8.2": 47.00, "8.3": 47.50, "8.4": 48.00, 
        "8.5": 48.50, "8.6": 49.00, "8.7": 49.50, "8.8": 50.00, "8.9": 50.50, 
        "9.0": 51.00, "9.1": 51.05, "9.2": 51.10, "9.3": 51.15, "9.4": 51.20, "9.5": 51.25
    },
    "6.1": {
        "7.5": 44.00, "7.6": 44.50, "7.7": 45.00, "7.8": 45.50, "7.9": 46.00, 
        "8.0": 46.50, "8.1": 47.00, "8.2": 47.50, "8.3": 48.00, "8.4": 48.50, 
        "8.5": 49.00, "8.6": 49.50, "8.7": 50.00, "8.8": 50.50, "8.9": 51.00, 
        "9.0": 51.50, "9.1": 51.55, "9.2": 51.60, "9.3": 51.65, "9.4": 51.70, "9.5": 51.75
    },
    "6.2": {
        "7.5": 44.50, "7.6": 45.00, "7.7": 45.50, "7.8": 46.00, "7.9": 46.50, 
        "8.0": 47.00, "8.1": 47.50, "8.2": 48.00, "8.3": 48.50, "8.4": 49.00, 
        "8.5": 49.50, "8.6": 50.00, "8.7": 50.50, "8.8": 51.00, "8.9": 51.50, 
        "9.0": 52.00, "9.1": 52.05, "9.2": 52.10, "9.3": 52.15, "9.4": 52.20, "9.5": 52.25
    },
    "6.3": {
        "7.5": 45.00, "7.6": 45.50, "7.7": 46.00, "7.8": 46.50, "7.9": 47.00, 
        "8.0": 47.50, "8.1": 48.00, "8.2": 48.50, "8.3": 49.00, "8.4": 49.50, 
        "8.5": 50.00, "8.6": 50.50, "8.7": 51.00, "8.8": 51.50, "8.9": 52.00, 
        "9.0": 52.50, "9.1": 52.55, "9.2": 52.60, "9.3": 52.65, "9.4": 52.70, "9.5": 52.75
    },
    "6.4": {
        "7.5": 45.50, "7.6": 46.00, "7.7": 46.50, "7.8": 47.00, "7.9": 47.50, 
        "8.0": 48.00, "8.1": 48.50, "8.2": 49.00, "8.3": 49.50, "8.4": 50.00, 
        "8.5": 50.50, "8.6": 51.00, "8.7": 51.50, "8.8": 52.00, "8.9": 52.50, 
        "9.0": 53.00, "9.1": 53.05, "9.2": 53.10, "9.3": 53.15, "9.4": 53.20, "9.5": 53.25
    },
    "6.5": {
        "7.5": 46.00, "7.6": 46.50, "7.7": 47.00, "7.8": 47.50, "7.9": 48.00, 
        "8.0": 48.50, "8.1": 49.00, "8.2": 49.50, "8.3": 50.00, "8.4": 50.50, 
        "8.5": 51.00, "8.6": 51.50, "8.7": 52.00, "8.8": 52.50, "8.9": 53.00, 
        "9.0": 53.50, "9.1": 53.55, "9.2": 53.60, "9.3": 53.65, "9.4": 53.70, "9.5": 53.75
    },
    "6.6": {
        "7.5": 46.50, "7.6": 47.00, "7.7": 47.50, "7.8": 48.00, "7.9": 48.50, 
        "8.0": 49.00, "8.1": 49.50, "8.2": 50.00, "8.3": 50.50, "8.4": 51.00, 
        "8.5": 51.50, "8.6": 52.00, "8.7": 52.50, "8.8": 53.00, "8.9": 53.50, 
        "9.0": 54.00, "9.1": 54.05, "9.2": 54.10, "9.3": 54.15, "9.4": 54.20, "9.5": 54.25
    },
    "6.7": {
        "7.5": 47.00, "7.6": 47.50, "7.7": 48.00, "7.8": 48.50, "7.9": 49.00, 
        "8.0": 49.50, "8.1": 50.00, "8.2": 50.50, "8.3": 51.00, "8.4": 51.50, 
        "8.5": 52.00, "8.6": 52.50, "8.7": 53.00, "8.8": 53.50, "8.9": 54.00, 
        "9.0": 54.50, "9.1": 54.55, "9.2": 54.60, "9.3": 54.65, "9.4": 54.70, "9.5": 54.75
    },
    "6.8": {
        "7.5": 47.50, "7.6": 48.00, "7.7": 48.50, "7.8": 49.00, "7.9": 49.50, 
        "8.0": 50.00, "8.1": 50.50, "8.2": 51.00, "8.3": 51.50, "8.4": 52.00, 
        "8.5": 52.50, "8.6": 53.00, "8.7": 53.50, "8.8": 54.00, "8.9": 54.50, 
        "9.0": 55.00, "9.1": 55.05, "9.2": 55.10, "9.3": 55.15, "9.4": 55.20, "9.5": 55.25
    },
    "6.9": {
        "7.5": 48.00, "7.6": 48.50, "7.7": 49.00, "7.8": 49.50, "7.9": 50.00, 
        "8.0": 50.50, "8.1": 51.00, "8.2": 51.50, "8.3": 52.00, "8.4": 52.50, 
        "8.5": 53.00, "8.6": 53.50, "8.7": 54.00, "8.8": 54.50, "8.9": 55.00, 
        "9.0": 55.50, "9.1": 55.55, "9.2": 55.60, "9.3": 55.65, "9.4": 55.70, "9.5": 55.75
    },
    "7.0": {
        "7.5": 48.50, "7.6": 49.00, "7.7": 49.50, "7.8": 50.00, "7.9": 50.50, 
        "8.0": 51.00, "8.1": 51.50, "8.2": 52.00, "8.3": 52.50, "8.4": 53.00, 
        "8.5": 53.50, "8.6": 54.00, "8.7": 54.50, "8.8": 55.00, "8.9": 55.50, 
        "9.0": 56.00, "9.1": 56.05, "9.2": 56.10, "9.3": 56.15, "9.4": 56.20, "9.5": 56.25
    }
};

/**
 * Looks up the rate based on Fat and SNF from the milkRateChart.
 * @param {number} fat - The Fat percentage.
 * @param {number} snf - The SNF percentage.
 * @returns {number} The rate per litre, or 0.00 if not found.
 */
function getRate(fat, snf) {
    // Fat must be formatted to one decimal place for key (e.g., "5.5")
    const fatKey = parseFloat(fat).toFixed(1); 
    
    // SNF must be formatted to one decimal place for key (e.g., "8.0")
    const snfKey = parseFloat(snf).toFixed(1);

    // Look up the rate: milkRateChart[fatKey][snfKey]
    const rate = milkRateChart[fatKey] ? milkRateChart[fatKey][snfKey] : undefined;

    // Optional: Keep this console log for debugging rate lookup issues
    // console.log(`Lookup: Fat Key = ${fatKey}, SNF Key = ${snfKey}, Rate = ${rate || 0.00}`);

    return rate !== undefined ? rate : 0.00;
}

/**
 * Calculates the total amount for a row using the milk rate chart lookup.
 * @param {string} tableType - 'morning' or 'evening'.
 * @param {HTMLElement} element - The input element that was changed.
 */
function calculateAmount(tableType, element) {
    const row = element.parentElement.parentElement;
    
    // Get values from the respective inputs, ensuring proper fallback for parsing
    const litres = parseFloat(row.querySelector(`.litres-${tableType}`)?.value || 0);
    const fat = parseFloat(row.querySelector(`.fat-${tableType}`)?.value || 0);
    const snf = parseFloat(row.querySelector(`.snf-${tableType}`)?.value || 0);

    // Look up the rate in the background (as requested)
    const ratePerLitre = getRate(fat, snf); 
    
    // Calculate total amount
    const totalAmount = (litres * ratePerLitre);

    // Update the Total Amount cell
    row.querySelector(`.total-amount-${tableType}`).textContent = totalAmount.toFixed(2);

    calculateTotals();
}

// Function to calculate totals
function calculateTotals() {
    let totalLitresMorning = 0, totalAmountMorning = 0;
    let totalLitresEvening = 0, totalAmountEvening = 0;

    document.querySelectorAll("#morningTableBody tr").forEach(row => {
        // Use row.querySelector to safely handle case where element might not exist
        const litresInput = row.querySelector(".litres-morning");
        const amountDisplay = row.querySelector(".total-amount-morning");
        
        totalLitresMorning += parseFloat(litresInput?.value || 0);
        totalAmountMorning += parseFloat(amountDisplay?.textContent || "0");
    });

    document.querySelectorAll("#eveningTableBody tr").forEach(row => {
        const litresInput = row.querySelector(".litres-evening");
        const amountDisplay = row.querySelector(".total-amount-evening");

        totalLitresEvening += parseFloat(litresInput?.value || 0);
        totalAmountEvening += parseFloat(amountDisplay?.textContent || "0");
    });

    // Safely update total display elements
    if(document.getElementById("morningTotalLitres")) document.getElementById("morningTotalLitres").textContent = totalLitresMorning.toFixed(2);
    if(document.getElementById("morningTotalAmount")) document.getElementById("morningTotalAmount").textContent = totalAmountMorning.toFixed(2);
    if(document.getElementById("eveningTotalLitres")) document.getElementById("eveningTotalLitres").textContent = totalLitresEvening.toFixed(2);
    if(document.getElementById("eveningTotalAmount")) document.getElementById("eveningTotalAmount").textContent = totalAmountEvening.toFixed(2);

    if(document.getElementById("totalLitres")) document.getElementById("totalLitres").textContent = (totalLitresMorning + totalLitresEvening).toFixed(2);
    if(document.getElementById("totalAmount")) document.getElementById("totalAmount").textContent = (totalAmountMorning + totalAmountEvening).toFixed(2);
}

document.addEventListener("keydown", function (event) {
    const activeElement = document.activeElement;

    if (activeElement.tagName === "INPUT") {
        let row = activeElement.closest("tr");
        if (!row) return;  
        
        let table = row.closest("tbody");
        if (!table) return; 

        let inputs = Array.from(table.querySelectorAll("input"));
        let index = inputs.indexOf(activeElement);

        if (event.key === "ArrowRight" && index < inputs.length - 1) {
            event.preventDefault(); // Prevent browser auto-fill
            inputs[index + 1].focus();
        } 
        else if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            inputs[index - 1].focus();
        } 
        else if (event.key === "ArrowDown") {
            let cellIndex = activeElement.parentElement?.cellIndex;
            if (cellIndex !== undefined) {
                let nextRow = row.nextElementSibling;
                // Since the Rate column is removed, inputs will be at the same cellIndex (1, 2, 3) in the next row
                let nextInput = nextRow?.children[cellIndex]?.querySelector("input");
                if (nextInput) {
                    event.preventDefault();
                    nextInput.focus();
                }
            }
        } 
        else if (event.key === "ArrowUp") {
            let cellIndex = activeElement.parentElement?.cellIndex;
            if (cellIndex !== undefined) {
                let prevRow = row.previousElementSibling;
                 // Since the Rate column is removed, inputs will be at the same cellIndex (1, 2, 3) in the previous row
                let prevInput = prevRow?.children[cellIndex]?.querySelector("input");
                if (prevInput) {
                    event.preventDefault();
                    prevInput.focus();
                }
            }
        }
    }
});

function prepareForPrint() {
    document.querySelectorAll("input").forEach(input => {
        const span = document.createElement("span");
        span.textContent = input.value || "";
        span.style.display = "inline-block";
        input.parentNode.replaceChild(span, input);
    });
    window.print();
}

function clearData() {
    const elementsToClear = [
        "billDate", "farmerName", "balance", 
        "morningTotalLitres", "morningTotalAmount",
        "eveningTotalLitres", "eveningTotalAmount",
        "totalLitres", "totalAmount", "signature"
    ];

    // Clear input fields and displayed text
    elementsToClear.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === "INPUT") {
                element.value = "";
            } else {
                element.textContent = "-"; // Set to default display
            }
        }
    });

    // Clear all table data (both text content and inputs inside tables)
    document.querySelectorAll("table tbody").forEach(tbody => tbody.innerHTML = "");

    // Re-generate the table rows with the new structure
    generatePreviousDates();

    alert("All data cleared successfully");
}


document.addEventListener("DOMContentLoaded", () => {
    // Set today's date on load and generate table rows
    const billDateInput = document.getElementById("billDate");
    if(billDateInput) {
        billDateInput.value = new Date().toISOString().substring(0, 10);
        generatePreviousDates();
    }

    const darkModeToggle = document.createElement("button");
    darkModeToggle.innerHTML = "🌙"; // Default icon as moon
    darkModeToggle.classList.add("dark-mode-toggle");
    document.body.appendChild(darkModeToggle);

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.innerHTML = "☀️"; // Change to sun
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.body.style.transition = "background-color 0.3s ease-in-out, color 0.3s ease-in-out";
        
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.innerHTML = "🌙";
        }
    });
});
// --- End of Updated scripts.js ---
