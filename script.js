// Fetch and populate data from JSON
async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    populateWebsite(data);
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function populateWebsite(data) {
  // Populate Navigation
  populateNav(data.navigation);
  
  // Populate Hero Slides
  populateHeroSlides(data.heroSlides);
  
  // Populate Quick Cards
  populateQuickCards(data.quickCards);
  
  // Populate News
  populateNews(data.news);
  
  // Populate Events
  populateEvents(data.events);
  
  // Populate Quick Links
  populateQuickLinks(data.quickLinks);
  
  // Populate Accreditation Strip
  populateAccreditation(data.accreditationStrip);
  
  // Populate Programs
  populatePrograms(data.programs);
  
  // Populate Footer
  populateFooter(data.footer);
}

function populateNav(navItems) {
  const navInner = document.querySelector('.nav-inner');
  navInner.innerHTML = '';
  navItems.forEach((item, index) => {
    const navItem = document.createElement('div');
    navItem.className = `nav-item ${index === 0 ? 'active' : ''}`;
    navItem.textContent = item.text;
    navItem.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
    navInner.appendChild(navItem);
  });
}

function populateHeroSlides(slides) {
  const heroContainer = document.querySelector('.hero');
  const slidesContainer = document.createElement('div');
  slidesContainer.innerHTML = '';
  
  // Clear existing slides and dots
  document.querySelectorAll('.hero-slide').forEach(s => s.remove());
  document.querySelectorAll('.hero-dot').forEach(d => d.remove());
  
  slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.id = `s${index}`;
    slideDiv.className = `hero-slide ${index === 0 ? 'active' : ''}`;
    slideDiv.innerHTML = `
      <div class="hero-canvas hero-canvas-gradient-${index + 1}"></div>
      <div class="hero-overlay ${index > 0 ? `hero-overlay-gradient-${index + 1}` : ''}">
        <div class="hero-text">
          <h2>${slide.title}</h2>
          <p>${slide.description}</p>
          <a href="${slide.buttonLink}" class="header-btn btn-inline">${slide.buttonText}</a>
        </div>
      </div>
    `;
    heroContainer.insertBefore(slideDiv, document.querySelector('.hero-dots'));
  });
  
  // Create dots
  const dotsContainer = document.querySelector('.hero-dots');
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goSlide(index);
    dotsContainer.appendChild(dot);
  });
  
  // Reset hero slider
  initializeHeroSlider();
}

function populateQuickCards(cards) {
  const cardsRow = document.querySelector('.cards-row');
  cardsRow.innerHTML = '';
  cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'info-card';
    cardDiv.innerHTML = `
      <div class="ic-icon">${card.icon}</div>
      <h3>${card.title}</h3>
      <p>${card.description}</p>
    `;
    cardsRow.appendChild(cardDiv);
  });
}

function populateNews(newsItems) {
  const newsList = document.querySelector('.news-list');
  newsList.innerHTML = '';
  newsItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="news-date">${item.date}<br/>${item.month}</div>
      <div class="news-body">
        <div class="title">${item.title}</div>
        <span class="tag ${item.tagType}">${item.tag}</span>
        ${item.ref ? `<a href="${item.ref}" target="_blank" class="pdf-link">View   </a>` : ''}
      </div>
    `;
    newsList.appendChild(li);
  });
}

function populateEvents(eventItems) {
  const eventsContainer = document.querySelector('.events-list') || createEventsSection();
  eventsContainer.innerHTML = '';
  eventItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="news-date">${item.date}<br/>${item.month}</div>
      <div class="news-body">
        <div class="title">${item.title}</div>
        <div class="desc">${item.description}</div>
        <span class="tag ${item.tagType}">${item.tag}</span>
      </div>
    `;
    eventsContainer.appendChild(li);
  });
}

function createEventsSection() {
  const eventList = document.createElement('ul');
  eventList.className = 'news-list events-list';
  const heading = document.querySelector('.sec-heading.margin-top-30');
  if (heading && heading.textContent.includes('Upcoming Events')) {
    heading.insertAdjacentElement('afterend', eventList);
  }
  return eventList;
}

function populateQuickLinks(links) {
  const quickLinksList = document.querySelector('.quick-links ul');
  quickLinksList.innerHTML = '';
  links.forEach(link => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${link.href}">${link.text}</a>`;
    quickLinksList.appendChild(li);
  });
}

function populateAccreditation(accredItems) {
  const accredContainer = document.querySelector('.accreditation');
  accredContainer.innerHTML = '';
  accredItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'accred-item';
    div.innerHTML = `<span class="name">${item.name}</span>${item.text}`;
    accredContainer.appendChild(div);
    
    if (index < accredItems.length - 1) {
      const divider = document.createElement('div');
      divider.className = 'accreditation-divider';
      accredContainer.appendChild(divider);
    }
  });
}

function populatePrograms(programs) {
  const progGrid = document.querySelector('.prog-grid');
  progGrid.innerHTML = '';
  programs.forEach(prog => {
    const card = document.createElement('div');
    card.className = 'prog-card';
    card.innerHTML = `
      <div class="dept-icon">${prog.icon}</div>
      <h4>${prog.name}</h4>
      <p>${prog.levels}</p>
    `;
    progGrid.appendChild(card);
  });
}

function populateFooter(footerData) {
  // Brand section
  const brandDiv = document.querySelector('.footer-brand');
  if (brandDiv) {
    brandDiv.innerHTML = `
      <h3>${footerData.brand.title}</h3>
      <p>${footerData.brand.description}</p>
    `;
  }
  
  // Footer columns
  const footerCols = document.querySelectorAll('.footer-col');
  if (footerCols.length >= 3) {
    populateFooterCol(footerCols[0], 'Academics', footerData.academics);
    populateFooterCol(footerCols[1], 'Student Zone', footerData.studentZone);
    populateFooterCol(footerCols[2], 'Institute', footerData.institute);
  }
}

function populateFooterCol(colElement, title, items) {
  colElement.innerHTML = `<h4>${title}</h4><ul>${items.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}</ul>`;
}

// Hero slider initialization
function initializeHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let current = 0;
  
  window.goSlide = function(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  };
  
  setInterval(() => goSlide((current + 1) % slides.length), 4500);
}

// Load data on page load
document.addEventListener('DOMContentLoaded', loadData);
