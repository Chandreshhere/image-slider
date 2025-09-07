const items  = document.querySelectorAll('.carousel .list .item');
const thumbs = document.querySelectorAll('.thumbnail .item');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const timeBar = document.querySelector('.time');

let active = 0;
let interval;
const time = 7000; // 7 seconds

function showSlide(index){
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
    if (thumbs[i]) thumbs[i].classList.toggle('active', i === index);
  });
  active = index;
  resetTimeBar();
}

function nextSlide(){
  const idx = (active + 1) % items.length;
  showSlide(idx);
}

function prevSlide(){
  const idx = (active - 1 + items.length) % items.length;
  showSlide(idx);
}

function resetTimeBar(){
  timeBar.style.transition = 'none';
  timeBar.style.width = '0%';
  // Force reflow to restart transition
  void timeBar.offsetWidth;
  timeBar.style.transition = `width ${time}ms linear`;
  timeBar.style.width = '100%';
}

function startAutoPlay(){ interval = setInterval(nextSlide, time); }
function stopAutoPlay(){ clearInterval(interval); }

nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoPlay(); startAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoPlay(); startAutoPlay();
});

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    showSlide(index);
    stopAutoPlay(); startAutoPlay();
  });
});

// optional: keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { nextSlide(); stopAutoPlay(); startAutoPlay(); }
  if (e.key === 'ArrowLeft')  { prevSlide(); stopAutoPlay(); startAutoPlay(); }
});

// init
showSlide(active);
startAutoPlay();