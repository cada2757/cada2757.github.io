const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    pixelSort();
  };
});

function pixelSort() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imageData;

  for (let x = 0; x < width; x++) {
    const column = [];

    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * 4;
      const pixel = data.slice(i, i + 4); // RGBA
      column.push(pixel);
    }

    column.sort((a, b) => {
      const brightnessA = (a[0] + a[1] + a[2]) / 3;
      const brightnessB = (b[0] + b[1] + b[2]) / 3;
      return brightnessA - brightnessB;
    });

    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * 4;
      const [r, g, b, a] = column[y];
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = a;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}