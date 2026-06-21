// ================================
// LIVE SEARCH & FILTER - Courses
// searches courses as you type
// ================================
const searchInput = document.getElementById('courseSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const noResults = document.getElementById('noResults');

let currentFilter = 'all';

function filterCourses() {
  // get what user typed and make it lowercase for comparison
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  let visibleCount = 0;

  courseCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const category = card.getAttribute('data-category');
    const matchesSearch = title.includes(searchTerm);
    const matchesFilter = currentFilter === 'all' || category === currentFilter;

    // show card only if it matches both search and filter
    if (matchesSearch && matchesFilter) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // show "no results" message if nothing found
  if (noResults) {
    noResults.classList.toggle('d-none', visibleCount > 0);
  }
}

if (searchInput) {
  // runs filterCourses every time user types something
  searchInput.addEventListener('input', filterCourses);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // remove active style from all buttons first
    filterBtns.forEach(b => {
      b.classList.remove('active', 'btn-primary', 'btn-success', 'btn-warning', 'btn-danger');
      b.classList.add('btn-outline-primary');
    });
    // add active style to the clicked button
    btn.classList.add('active');
    btn.classList.remove('btn-outline-primary');
    currentFilter = btn.getAttribute('data-filter');
    filterCourses();
  });
});

// ================================
// DARK MODE TOGGLE
// switches between light and dark
// ================================
const darkModeBtn = document.getElementById('darkModeToggle');

if (darkModeBtn) {
  // check if user had dark mode on before and restore it
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
  }

  darkModeBtn.addEventListener('click', () => {
    // toggle adds dark-mode if not there, removes if it is
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    // change emoji based on current mode
    darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    // save preference so it remembers after page refresh
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
}

// ================================
// GALLERY FILTER
// shows/hides gallery cards
// based on selected category
// ================================
const galleryFilters = document.querySelectorAll('.gallery-filter');
// gets all gallery item cards
const galleryItems = document.querySelectorAll('.gallery-item');

galleryFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    // remove active style from all filter buttons
    galleryFilters.forEach(b => {
      b.classList.remove('active', 'btn-primary', 'btn-success', 'btn-warning');
      b.classList.add('btn-outline-primary');
    });
    // highlight the clicked button
    btn.classList.add('active');
    btn.classList.remove('btn-outline-primary');

    const filter = btn.getAttribute('data-filter');

    // loop through all cards and show/hide based on category
    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block'; // show matching cards
      } else {
        item.style.display = 'none'; // hide non-matching cards
      }
    });
  });
});