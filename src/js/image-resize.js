export function resize(width, height, newWidth) {
    let newHeight = 0;
    newHeight = Math.round(newWidth * height / width);
    return newHeight;
}