let numbers = [];
let graphCanvas = null;
let graphContext = null;
let graphVisible = false;
let graphIntervalId = null;

function turnOffGraph() {
  numbers = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 0) + 1
  );
  const graphContainer = document.getElementById("graphContainer");
  graphContainer.innerHTML = '<canvas id="graphCanvas" height="400"></canvas>';
  graphVisible = true;
  if (graphIntervalId) {
    clearInterval(graphIntervalId);
  }
  graphIntervalId = setInterval(drawGraph, 1000);
  drawNumbers();
}

function generateNumbers() {
  numbers = Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 99) + 1
  );
  const graphContainer = document.getElementById("graphContainer");
  graphContainer.innerHTML = '<canvas id="graphCanvas" height="400"></canvas>';
  graphVisible = true;
  if (graphIntervalId) {
    clearInterval(graphIntervalId);
  }
  graphIntervalId = setInterval(drawGraph, 1000);
  drawNumbers();
}

function drawNumbers() {
  document.getElementById("numbersList").innerHTML = "";
  for (let i = 0; i < numbers.length; i++) {
    let listItem = document.createElement("li");
    listItem.className = "list-group-item bg-dark text-white";
    listItem.textContent = numbers[i];
    document.getElementById("numbersList").appendChild(listItem);
  }
}

function drawGraph() {
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");
  const graphWidth = canvas.width - 20;
  const graphHeight = canvas.height - 20;
  const xSpacing = graphWidth / (numbers.length - 1);
  const yScale = graphHeight / (Math.max(...numbers) + 1);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const animateLine = (startX, startY, endX, endY) => {
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numbers.length; i++) {
      const x = 10 + i * xSpacing;
      const y = canvas.height - 10 - numbers[i] * yScale;
      animateLine(x, canvas.height - 10, x, y);
    }
    graphVisible = false;
    if (graphIntervalId) {
      clearInterval(graphIntervalId);
    }
    graphIntervalId = null;
  };
  animate();
  if (graphVisible && !graphIntervalId) {
    graphIntervalId = requestAnimationFrame(drawGraph);
  }
}

function performQuickSort() {
  let startTime = performance.now();
  quickSort(numbers, 0, numbers.length - 1);
  let endTime = performance.now(); // Measure end time
  let sortingTime = (endTime - startTime) / 1000; // Calculate sorting time in seconds
  document.getElementById("time").textContent = sortingTime.toFixed(2); // Update UI with sorting time
  drawNumbers(); // Update the "Generated Numbers" list after sorting
  drawGraph();
}
function quickSort(arr, low, high) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  const temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  return i + 1;
}

function performBubbleSort() {
  let startTime = performance.now(); // Measure start time
  let n = numbers.length;
  let swapped;
  let intervalId = setInterval(() => {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (numbers[i] > numbers[i + 1]) {
        let temp = numbers[i];
        numbers[i] = numbers[i + 1];
        numbers[i + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) {
      clearInterval(intervalId);
      let endTime = performance.now(); // Measure end time
      let sortingTime = (endTime - startTime) / 1000; // Calculate sorting time in seconds
      document.getElementById("time").textContent = sortingTime.toFixed(2); // Update UI with sorting time
      drawNumbers();
      drawGraph();
    }
  }, 500);
}

function performMergeSort() {
  let startTime = performance.now(); // Measure start time
  mergeSort(numbers, 0, numbers.length - 1);
  let endTime = performance.now(); // Measure end time
  let sortingTime = (endTime - startTime) / 1000; // Calculate sorting time in seconds
  document.getElementById("time").textContent = sortingTime.toFixed(2); // Update UI with sorting time
  drawNumbers(); // Update the "Generated Numbers" list after sorting
  drawGraph(); // Update the graph after sorting
}

function mergeSort(arr, l, r) {
  if (l < r) {
    let m = Math.floor((l + r) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

function merge(arr, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;
  let leftArr = new Array(n1);
  let rightArr = new Array(n2);
  for (let i = 0; i < n1; i++) {
    leftArr[i] = arr[l + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArr[j] = arr[m + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }
  while (i < n1) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }
  while (j < n2) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}



