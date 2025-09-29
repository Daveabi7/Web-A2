/* =========================
   SLIDERS
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  let items, itemWidth, totalWidth, halfWidth, buffer;
  let offset = 0;
  let speed = 0.5;

  function recalc() {
    items = carousel.querySelectorAll(".item-photo");
    if (items.length === 0) return;

    itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight);

    totalWidth = Array.from(items).reduce((acc, el) => acc + el.offsetWidth + parseInt(getComputedStyle(el).marginRight), 0);

    const screenWidth = window.innerWidth;
    const minWidth = screenWidth * 3;

    while (carousel.scrollWidth < minWidth) {
      items.forEach(el => carousel.appendChild(el.cloneNode(true)));
    }

    halfWidth = carousel.scrollWidth / 2;
    buffer = itemWidth;
  }

  function animate() {
    offset -= speed;

    if (offset <= -halfWidth - buffer) {
      offset += halfWidth;
    }
    if (offset > buffer) {
      offset -= halfWidth;
    }

    carousel.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animate);
  }

  recalc();
  animate();

  window.addEventListener("resize", () => {
    offset = 0;
    recalc();
  });
});


/* =========================
   POPUP
   ========================= */
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.popup-close');
let popupShown = false;

window.addEventListener('scroll', () => {
  if (popupShown) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;

  if (scrollPercent > 0.85) {
    popup.style.display = 'flex';
    popupShown = true;
  }
});

if (closePopup) {
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});



/* =========================
   ACCORDION
   ========================= */
const filterBtns = document.querySelectorAll('.filter-btns .btn');
  const categories = document.querySelectorAll('.category');
  const toggleBtn = document.getElementById('toggleMore');

  let showAll = false;

  function applyFilter(filter) {
    categories.forEach((cat, index) => {
      if (filter === 'all') {
        if (!showAll && index >= 3) {
          cat.style.display = 'none';
        } else {
          cat.style.display = 'block';
        }
      } else {
        if (cat.classList.contains(filter)) {
          cat.style.display = 'block';
        } else {
          cat.style.display = 'none';
        }
      }
    });

    toggleBtn.style.display = (filter === 'all') ? 'block' : 'none';
    toggleBtn.textContent = showAll ? 'Звернути' : 'Більше вакансій';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      showAll = false;
      applyFilter(filter);
    });
  });

  toggleBtn.addEventListener('click', () => {
    showAll = !showAll;
    applyFilter('all');
  });

  applyFilter('all');
  