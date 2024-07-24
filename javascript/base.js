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
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : 'auto';
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

/*footer naimation (smooth scroll and close) when click on menu item*/
const footerBigLinks = document.querySelectorAll('.footer-big-nav a[href^="#"]')

footerBigLinks.forEach(link => {
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


/*header background fill*/
const header = document.querySelector('.noPC')
const mainVisual = document.querySelector('.background')

window.addEventListener('scroll', function() {
    const mainVisualHeight = mainVisual.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY >= mainVisualHeight) {
        header.classList.add('fill');
    } else {
        header.classList.remove('fill');
    };
});


/*card open transition*/
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const closeButton = card.querySelector('.close-btn');
    const cardContent = card.querySelector('.card-content');
    const expandedContent = card.querySelector('.card-expanded-content');
    
    //If any of these elements are missing (falsy), the code inside the if block executes//
    if (!closeButton || !cardContent || !expandedContent) {
      console.warn('Some elements are missing in the card:', card);
      return;
    }

    // Function to open the card
    function adjustContainerHeight() {
      const beanBasket = document.querySelector('.bean-basket');
      beanBasket.style.height = 'auto';
      beanBasket.style.height = beanBasket.scrollHeight + 'px';
    }
    function openCard() {
      card.classList.add('open', 'expand');
      expandedContent.style.display = 'block';
      setTimeout(() => {
        cardContent.style.opacity = '1';
        expandedContent.style.opacity = '1';
      }, 50);
      adjustContainerHeight();
    }

    // Function to close the card
    function closeCard() {
      card.classList.remove('open', 'expand');
      cardContent.style.opacity = '1';
      expandedContent.style.opacity = '0';
      setTimeout(() => {
        expandedContent.style.display = 'none';
      }, 300);
      setTimeout(adjustContainerHeight,200);
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


/*change page's height when card is expanded*/
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function() {
    const beanBasket = document.querySelector('.bean-basket');
    beanBasket.style.height = 'auto';
    setTimeout(() => {
      beanBasket.style.height = beanBasket.scrollHeight + 'px';
    }, 300); // Wait for animation to complete
  });
});

// /*goes to correct tab and open new window when different button is clicked*/
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.see-more').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const defaultTab = this.getAttribute('data-default-tab');
      const url = new URL('bean-basket/index.html', window.location.href);
      url.searchParams.set('defaultTab', defaultTab);
      window.open(url.toString(), '_blank');
    });
  });
});

