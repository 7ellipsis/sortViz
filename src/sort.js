export function mergeSort(array) {
    const animations = [];
    const aux = array.slice();
    mergesort(array, 0, array.length - 1, aux, animations);
    return animations;
}
function mergesort(array, start, end, aux, animations) {
    if (start == end)
        return;
    const mid = Math.floor((start + end) / 2);
    mergesort(aux, start, mid, array, animations);
    mergesort(aux, mid + 1, end, array, animations);
    merge(array, start, mid, end, aux, animations);
}
function merge(array, start, mid, end, aux, animations) {
    let k = start;
    let i = start;
    let j = mid + 1;
    while (i <= mid && j <= end) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (aux[i] <= aux[j]) {
            animations.push([k, aux[i]]);
            array[k++] = aux[i++];
        }
        else {
            animations.push([k, aux[j]]);
            array[k++] = aux[j++];
        }
    }
    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, aux[i]]);
        array[k++] = aux[i++];
    }
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, aux[j]]);
        array[k++] = aux[j++];
    }
}


export function bubbleSort(array) {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            animations.push([j, array[j], j + 1, array[j + 1], false])
            if (array[j] > array[j + 1]) {
                animations.push([j, array[j], j + 1, array[j + 1], true])
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return animations;
}


export function selectionSort(array) {
    const animations = [];

    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            animations.push([i, array[i], j, array[j], false])
            if (array[j] < array[min])
                min = j;
        }
        animations.push([i, array[i], min, array[min], true])
        let temp = array[min];
        array[min] = array[i];
        array[i] = temp;
    }
    console.log(animations)
    return animations;
}



export function quickSort(array) {
    const animations = [];
    let low = 0;
    let high = array.length - 1;
    quicksort(low, high, array, animations);
    return animations;
}
function partition(low, high, array, animations) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        animations.push([j, array[j], high, array[high], false]);
        if (array[j] < pivot) {
            i++;
            animations.push([i, array[i], j, array[j], true]);
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    animations.push([i + 1, array[i + 1], high, array[high], true]);
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    return i + 1;
}
function quicksort(low, high, array, animations) {
    if (low < high) {
        let x = partition(low, high, array, animations);
        quicksort(low, x - 1, array, animations);
        quicksort(x + 1, high, array, animations);
    }
}

