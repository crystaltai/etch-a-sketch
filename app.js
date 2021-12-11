// PIXEL SIZE SELECTION ----------------------------------------------------------------------------------------------------------------
// 0. Grab individual Pixel buttons
const smallPixels = document.getElementById('small-pixels');
const mediumPixels = document.getElementById('medium-pixels');
const largePixels = document.getElementById('large-pixels');

// 1. Toggle active selection for Pixel buttons
// Pull the Pixel size container element
const pixelSizeContainer = document.getElementById('pixel-size-container');

// Grab all the buttons inside the PixelSizeContainer 
const pixelButtons = pixelSizeContainer.getElementsByTagName('button');

// Loop through all Pixel buttons and assign active class to selected button
for (let i = 0; i < pixelButtons.length; i++) {
    pixelButtons[i].addEventListener('click', function() {
        let current = document.getElementsByClassName('active-pixel');
        current[0].className = current[0].className.replace('active-pixel', '');
        pixelButtons[i].className += 'active-pixel';
    });
}

// 2. Update grid based on user's selected Pixel size
// Grab grid container element
const gridContainer = document.getElementById('grid-container');

// Generates grid rows and cells
function generateGrid(rowCount, columnCount, pixelSize) {
    // Create grid rows and add class 'row'
    for (let i = 0; i < rowCount; i++) {
        let row = document.createElement('div');
        row.className = 'row';

        // Create grid columns/cells and add class 'cell'
        for (let j = 0; j < columnCount; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.width = `${pixelSize}px`;
            cell.style.height = `${pixelSize}px`;
            // Add each cell to the row
            row.appendChild(cell);
        }
        // Add each row to the gridContainer
        gridContainer.appendChild(row);
    }
}

// Clears grid rows and cells (before generating new grid)
function clearGrid() {
    gridContainer.querySelectorAll('div').forEach(e => e.remove());
}

// 3. Event handlers added to Pixel size buttons
// Clears current grid and replaces with respective grid based on button selected
// Calls the modeSelector function to select correct Mode for hovering over cells
smallPixels.addEventListener('click', function() {
    clearGrid();
    generateGrid(30, 40, 18);
    modeSelector();
});

mediumPixels.addEventListener('click', function() {
    clearGrid();
    generateGrid(15, 20, 38);
    modeSelector();
});

largePixels.addEventListener('click', function() {
    clearGrid();
    generateGrid(12, 16, 48);
    modeSelector();
});


// MODE SELECTION ----------------------------------------------------------------------------------------------------------------
// 0. Grab individual buttons
const classicMode = document.getElementById('classic-mode');
const colorMode = document.getElementById('color-mode');

// 2. Toggle active selection for Mode buttons
// Pull the Mode container element
const modeContainer = document.getElementById('mode-container');

// Grab all the buttons inside the ModeContainer
const modeButtons = modeContainer.getElementsByTagName('button');

// Loop through all Mode buttons and assign active class to selected button
for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function() {
        let current = document.getElementsByClassName('active-mode');
        current[0].className = current[0].className.replace('active-mode', '');
        modeButtons[i].className += 'active-mode';
    });
}

// 3. Update mousehovers to selected Mode (when cells are hovered over, change background color)

// Grab all the individual cells
const allCells = document.getElementsByClassName('cell');

// Determine whether cells should be colored Classic or Color
function modeSelector() {
    if (classicMode.classList.contains('active-mode')) {
        colorClassicCells();   
    } else {
        colorColorCells();
    }
}

// Color all cells Classic 
function colorClassicCells() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].addEventListener('mouseover', function() {
            allCells[i].style.backgroundColor = '#424242';
        });
    }
}

// Color all cells Color
function colorColorCells() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].addEventListener('mouseover', function() {
            allCells[i].style.backgroundColor = `${randomColor()}`;
        });
    }
}

// Random color generator (for Colored cells)
function randomColor() {
    const colorOptions = ['#fc5c65', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b6584'];
    let color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    return color;
}

// 4. Event handlers added to Mode buttons
classicMode.addEventListener('click', function() {
    colorClassicCells();
});

colorMode.addEventListener('click', function() {
    colorColorCells();
});

// CLEAR BUTTON --------------------------------------------------
// Grab individual button
const clearButton = document.getElementById('clear-grid');

// Add event listener to clear all cell colors when clicked
clearButton.addEventListener('click', function() {
    clearCells();
});

// Clear colors in all cells
function clearCells() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].style.backgroundColor = '';
    }
}


// Call formulas immmediately and set default grid size to Small
generateGrid(30, 40, 18);
colorClassicCells();