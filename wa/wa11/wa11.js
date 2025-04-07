const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const pictures = [];
for(let i = 1; i < 6; i++){
    let name = "images/pic" + i + ".jpg";
    pictures.push(name);
}

/* Declaring the alternative text for each image file */
const altText = "arbitrary alt text cuz validation sux";

/* Looping through images */
for(let i = 0; i < pictures.length; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', pictures[i]);
    newImage.setAttribute('alt', altText);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', event => {
        displayedImage.src = event.target.src;
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const brightness = btn.getAttribute('class');
    if (brightness === 'dark') {
      btn.setAttribute('class','light');
      btn.textContent = 'lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.4)';
    } else {
      btn.setAttribute('class','dark');
      btn.textContent = 'darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });