// Live Search Filter for Courses Page
const searchInput = document.getElementById('courseSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');
const noResults = document.getElementById('noResults');

let currentFilter = 'all';

function filterCourses() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  let visibleCount = 0;

  courseCards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const category = card.getAttribute('data-category');
    const matchesSearch = title.includes(searchTerm);
    const matchesFilter = currentFilter === 'all' || category === currentFilter;

    if (matchesSearch && matchesFilter) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  if (noResults) {
    noResults.classList.toggle('d-none', visibleCount > 0);
  }
}

if (searchInput) {
  searchInput.addEventListener('input', filterCourses);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active', 'btn-primary', 'btn-success', 'btn-warning', 'btn-danger');
      b.classList.add('btn-outline-primary');
    });
    btn.classList.add('active');
    btn.classList.remove('btn-outline-primary');
    currentFilter = btn.getAttribute('data-filter');
    filterCourses();
  });
});