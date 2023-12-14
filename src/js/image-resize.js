export function resize(width, height, newWidth) {
    let newHeight = 0;
    newHeight = newWidth * height / width;
    return newHeight;
}