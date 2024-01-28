let matrixInterval;
  let matrix;

  function startMatrix() {
    // Detener el intervalo anterior, si existe
    if (matrixInterval) {
      clearInterval(matrixInterval);
    }

    // Obtener los valores de los campos de entrada
    const rowsInput = document.getElementById('rows');
    const colsInput = document.getElementById('cols');
    const intervalInput = document.getElementById('interval');

    // Verificar que los valores sean números válidos y mayores que cero
    const rows = validateInput(rowsInput);
    const cols = validateInput(colsInput);
    const interval = validateInput(intervalInput);

    // Si alguna validación falla, salir de la función
    if (rows === null || cols === null || interval === null) {
      return;
    }

    createMatrix(rows, cols);

    // Actualizar una celda aleatoria cada 'interval' milisegundos
    matrixInterval = setInterval(() => {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      const randomColor = getRandomColor();
      matrix[randomRow][randomCol].style.backgroundColor = randomColor;
    }, interval * 1000);
  }

  function validateInput(inputElement) {
    const value = parseInt(inputElement.value);
    if (isNaN(value) || value <= 0) {
      alert(`Por favor, ingrese un número válido y mayor que cero en el campo ${inputElement.name}.`);
      return null;
    }
    return value;
  }

  function createMatrix(rows, cols) {
    // Limpiar el contenedor antes de crear una nueva matriz
    document.getElementById('matrixContainer').innerHTML = '';

    // Crear una nueva matriz bidimensional con celdas HTML
    matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
      matrix[i] = new Array(cols);
    }

    // Llenar la matriz con celdas y agregar al contenedor
    const matrixContainer = document.getElementById('matrixContainer');
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        matrix[i][j] = cell;
        matrixContainer.appendChild(cell);
      }
      matrixContainer.appendChild(document.createElement('br')); // Saltar a la siguiente fila
    }
  }

  function getRandomColor() {