document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const hardwoodPhotos = [
  '/images/hardwood-1.png',
  '/images/hardwood-2.png',
  '/images/hardwood-3.png',
];
let hardwoodIndex = 0;
const hardwoodImg = document.getElementById('hardwood-img');
if (hardwoodImg) {
  setInterval(() => {
    hardwoodIndex = (hardwoodIndex + 1) % hardwoodPhotos.length;
    hardwoodImg.style.opacity = '0';
    setTimeout(() => {
      hardwoodImg.src = hardwoodPhotos[hardwoodIndex];
      hardwoodImg.style.opacity = '1';
    }, 300);
  }, 3000);
  hardwoodImg.style.transition = 'opacity 0.3s ease';
}
