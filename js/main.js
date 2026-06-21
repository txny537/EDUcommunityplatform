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

// ================================
// FAQ SEARCH
// hides questions that don't match
// what the user is typing
// ================================
const faqSearch = document.getElementById('faqSearch');
// gets all accordion FAQ items
const faqItems = document.querySelectorAll('.faq-item');
const faqNoResults = document.getElementById('faqNoResults');

if (faqSearch) {
  faqSearch.addEventListener('input', () => {
    // get what user typed in lowercase
    const term = faqSearch.value.toLowerCase();
    let visibleCount = 0;

    faqItems.forEach(item => {
      // get the question text from the button
      const question = item.querySelector('.accordion-button').textContent.toLowerCase();
      // get the answer text from the body
      const answer = item.querySelector('.accordion-body').textContent.toLowerCase();

      // show item if question OR answer contains the search term
      if (question.includes(term) || answer.includes(term)) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        // hide item if it doesnt match
        item.style.display = 'none';
      }
    });

    // show no results message if nothing matched
    if (faqNoResults) {
      faqNoResults.classList.toggle('d-none', visibleCount > 0);
    }
  });
}

// ================================
// CONTACT FORM VALIDATION
// checks all fields before submit
// shows error or success message
// ================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // stop page from refreshing on submit
    e.preventDefault();

    // get all field values
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value.trim();

    // get all input elements
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    // reset previous validation styles
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      input.classList.remove('is-invalid', 'is-valid');
    });

    let isValid = true;

    // check name is not empty
    if (name === '') {
      nameInput.classList.add('is-invalid'); // red border
      isValid = false;
    } else {
      nameInput.classList.add('is-valid'); // green border
    }

    // check email has @ and . in it
    if (!email.includes('@') || !email.includes('.')) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.add('is-valid');
    }

    // check subject is selected
    if (subject === '') {
      subjectInput.classList.add('is-invalid');
      isValid = false;
    } else {
      subjectInput.classList.add('is-valid');
    }

    // check message is at least 10 characters
    if (message.length < 10) {
      messageInput.classList.add('is-invalid');
      isValid = false;
    } else {
      messageInput.classList.add('is-valid');
    }

    // get success and error message elements
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');

    if (isValid) {
      // hide error, show success message
      errorMsg.classList.add('d-none');
      successMsg.classList.remove('d-none');
      // clear the form after successful submit
      contactForm.reset();
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.classList.remove('is-valid');
      });
    } else {
      // hide success, show error message
      successMsg.classList.add('d-none');
      errorMsg.classList.remove('d-none');
    }
  });
}