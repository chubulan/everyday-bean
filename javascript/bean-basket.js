"use strict";

/*loading animation*/
window.addEventListener('load', function() {
  document.getElementById('loading-overlay').style.display = 'none';
});


/*nav hamburger transition*/
const ham = document.querySelector('.nav-hamburger-btn');
const hamLine01 = document.querySelector('.header__btn__line01');
const hamLine02 = document.querySelector('.header__btn__line02');
const hamLine03 = document.querySelector('.header__btn__line03');
const nav = document.querySelector('.navmenu');

function toggleMenu() {
    ham.classList.toggle('open');
    hamLine01.classList.toggle('open');
    hamLine02.classList.toggle('open');
    hamLine03.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : 'auto'; //Sets the body's overflow style to 'hidden', preventing scrolling when the menu is open.//
    ham.setAttribute('aria-expanded', ham.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
}

ham.addEventListener('click', toggleMenu);


/*nav menu animation(smooth scroll and close) when click on menu item*/
const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
const navLinksPC = document.querySelectorAll('.PC-navmenu a[href^="#"]')

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        
        // Close the menu
        toggleMenu();
        
        // Scroll to the target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Wait a bit for the menu to close before scrolling
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 300); // Adjust this delay if needed
        }
    });
});
navLinksPC.forEach(link => {
  link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      
      // Scroll to the target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
          // Wait a bit for the menu to close before scrolling
          setTimeout(() => {
              targetSection.scrollIntoView({ behavior: 'smooth' });
          }, 300); // Adjust this delay if needed
      }
  });
});



/*tab change transition*/
// 1. Tab switching functionality
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    
    // Don't do anything if the clicked tab is already active
    if (button.classList.contains('active')) return;

    // Update tab button styles
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
      btn.classList.add('inactive');
    });
    
    button.classList.add('active');
    button.classList.remove('inactive');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.opacity = '0';
      content.style.visibility = 'hidden';
    });
    
    // Show the selected tab content after a short delay
    setTimeout(() => {
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });
      const activeContent = document.getElementById(tab);
      activeContent.classList.add('active');
      activeContent.style.opacity = '1';
      activeContent.style.visibility = 'visible';
      activeContent.style.display = 'block';
      
      // Show the correct filter and apply current filter
      showCorrectFilter(tab);
      applyCurrentFilter();
      document.body.offsetHeight;
      console.log('Tab switched to:', tab);
      logTabHeights();
      adjustLayout();
      console.log('Layout adjusted after tab switch');
    }, 300);
  });
});


// 2. Function to show the correct filter based on active tab
function showCorrectFilter(activeTab) {
  document.querySelectorAll('.filter-select').forEach(select => {
    select.style.display = 'none';
  });
  
  const activeFilter = document.getElementById(`${activeTab}-filter`);
  activeFilter.style.display = 'block';
}

// 3. Function to apply the current filter
function applyCurrentFilter() {
  const activeTab = document.querySelector('.tab-content.active');
  const filterSelect = document.getElementById(`${activeTab.id}-filter`);
  const filter = filterSelect.value;
  console.log("Current filter:", filter);
  console.log("Filter select element:", filterSelect);

  console.log("Active tab:", activeTab.id);

  activeTab.querySelectorAll('.card').forEach(card => {
    const tags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
    console.log("Card tags:", tags);
    if (filter === 'all' || tags.includes(filter)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  console.log('Applying filter...');
  adjustLayout();
  console.log('Layout adjusted after filter application');
}


// 4. Event listener for filter changes
document.querySelectorAll('.filter-select').forEach(select => {
  select.addEventListener('change', applyCurrentFilter);
});

// 5. Adjust layout based on the active tab's content
function adjustLayout() {
  const activeTab = document.querySelector('.tab-content.active');
  const mainContent = document.querySelector('.main-content');
  mainContent.style.minHeight = ''; // Remove any previously set minHeight
  document.body.style.minHeight = ''; // Remove any previously set minHeight
}


// 6. Ensure images are loaded before calculating heights
function whenImagesLoaded(callback) {
  const images = document.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;

  if (totalImages === 0) {
    callback();
  } else {
    images.forEach(img => {
      if (img.complete) {
        loadedImages++;
        if (loadedImages === totalImages) {
          callback();
        }
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            callback();
          }
        });
      }
    });
  }
}

// 7. Adjust layout on window resize
window.addEventListener('resize', adjustLayout);

// 8. Initialize filter options and apply initial filter
showCorrectFilter('design');
applyCurrentFilter();

// 9. Adjust layout once the window is loaded and images are loaded
window.addEventListener('load', () => {
  console.log('Window loaded');
  whenImagesLoaded(() => {
    console.log('All images loaded');
    adjustLayout();
    console.log('Initial layout adjustment complete');
  });
});


function logTabHeights() {
  const designTab = document.getElementById('design');
  const codingTab = document.getElementById('coding');
  console.log('Design tab height:', designTab.offsetHeight);
  console.log('Coding tab height:', codingTab.offsetHeight);
}
// Call this function on load and after each tab switch
window.addEventListener('load', logTabHeights);


function activateTab(tabName) {
  const tabButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
  if (tabButton) {
    tabButton.click();
  }
}

window.addEventListener('load', () => {
  console.log('Window loaded');
  whenImagesLoaded(() => {
    console.log('All images loaded');
    
    // Check if this is a fresh page load or a reload
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      // If it's a reload, always activate the design tab
      activateTab('design');
    } else {
      // If it's a fresh load, check for URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const defaultTab = urlParams.get('defaultTab');
      if (defaultTab) {
        activateTab(defaultTab);
      } else {
        activateTab('design');
      }
    }
    
    adjustLayout();
    console.log('Initial layout adjustment complete');
  });
});


/*card open transition*/
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const closeButton = card.querySelector('.close-btn');
    const cardContent = card.querySelector('.card-content');
    const expandedContent = card.querySelector('.card-expanded-content');
    
    //If any of these elements are missing (i.e., if any of these variables are falsy), the code inside the if block executes//
    if (!closeButton || !cardContent || !expandedContent) {
      console.warn('Some elements are missing in the card:', card);
      return; 
    }

    // Function to open the card
    function openCard() {
      card.classList.add('open', 'expand');
      expandedContent.style.display = 'block';
      setTimeout(() => {
        cardContent.style.opacity = '1';
        expandedContent.style.opacity = '1';
      }, 50);
    }

    // Function to close the card
    function closeCard() {
      card.classList.remove('open', 'expand');
      cardContent.style.opacity = '1';
      expandedContent.style.opacity = '0';
      setTimeout(() => {
        expandedContent.style.display = 'none';
      }, 300);
    }

    // Add click event to the card content to open the card
    cardContent.addEventListener('click', function(event) {
      if (!card.classList.contains('open')) {
        openCard();
      }
    });

    // Close button event
    closeButton.addEventListener('click', function(event) {
      event.stopPropagation();
      closeCard();
    });
  });
});

