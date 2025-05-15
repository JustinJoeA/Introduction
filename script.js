function refreshPage() {
  
  const navEntries = performance.getEntriesByType('navigation');
  const navType    = navEntries.length ? navEntries[0].type : '';


  if (navType === 'reload' && window.location.hash) {

    window.location.replace(window.location.href.split('#')[0]);
  }
}

window.addEventListener('load', refreshPage);

const cursor = document.getElementById("cursor");
const buttonElements = document.getElementsByClassName("button");

let isHovering = false;
let currentSize = 10;


window.document.onpointermove = (event) => {
  const { clientX, clientY } = event;

  cursor.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
};


Array.from(buttonElements).forEach((button) => {
  button.addEventListener("mouseenter", () => {
    const rect = button.getBoundingClientRect();
    const borderWidth = 2;


    const largerDimension = Math.max(rect.width, rect.height) * 1.1;


    const newLeft = rect.left - (largerDimension - rect.width) / 2;
    const newTop = rect.top - (largerDimension - rect.height) / 2;

    cursor.animate(
      {
        transform: 'translate(-50%,-50%)',
        width: `${largerDimension}px`,
        height: `${largerDimension}px`,
        left: `${newLeft}px`,
        top: `${newTop}px`,
        backgroundColor: '#99d6ea',
        opacity: `10%`,

      },
      { duration: 300, fill: "forwards" }
    );

    isHovering = true;
    currentSize = largerDimension;
  });

  button.addEventListener("mouseleave", () => {
    cursor.animate(
      {
        width: '10px',
        height: '10px',
        backgroundColor: '#99d6ea',
        border: 'none',
        borderRadius: '50%',
        transform: 'translate(-90%, -90%)',
        opacity: `100%`
      },
      { duration: 300, fill: "forwards" }
    );

    isHovering = false;
    currentSize = 10;
  });
});


window.document.onpointerdown = () => {
  if (isHovering) {
    const newSize = currentSize - 10;
    cursor.animate(
      {
        width: `${newSize}px`,
        height: `${newSize}px`,
      },
      { duration: 150, fill: "forwards" }
    );
  } else {
    cursor.animate(
      {
        width: `5px`,
        height: `5px`,
      },
      { duration: 150, fill: "forwards" }
    );
  }
};

window.document.onpointerup = () => {
  if (isHovering) {
    cursor.animate(
      {
        width: `${currentSize}px`,
        height: `${currentSize}px`,
      },
      { duration: 150, fill: "forwards" }
    );
  } else {
    cursor.animate(
      {
        width: `10px`,
        height: `10px`,
      },
      { duration: 150, fill: "forwards" }
    );
  }
};

function updateHeaderDate() {
  const now = new Date();
  const dayNum = now.getDate();
  const dow = now.getDay();
  const dowNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  document.getElementById("date-number").textContent = dayNum;
  document.getElementById("date-day").textContent = dowNames[dow];
}

window.addEventListener("DOMContentLoaded", () => {
  updateHeaderDate();
});



const menuButtons = document.querySelectorAll('.project-selection-menu');
const containers = document.querySelectorAll('.project-overview-container');

function clearAll() {
  containers.forEach(c => c.style.display = 'none');
  menuButtons.forEach(b => b.classList.remove('active'));
}

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const targetDiv = document.getElementById(targetId);
    if (!targetDiv) return;

    clearAll();

    targetDiv.style.display = 'flex';
    button.classList.add('active');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  clearAll();
  const defaultBtn = Array.from(menuButtons).find(b => b.dataset.target === 'chinalife');
  if (defaultBtn) defaultBtn.click();
});

const section2 = document.getElementById('section-2');
const worksMenu = document.getElementById('works-menu');
const aboutMenu = document.getElementById('about-menu');


window.addEventListener('scroll', () => {
  const rect = section2.getBoundingClientRect();
  const midY = window.innerHeight * 0.5;
  if (rect.top <= midY && rect.bottom >= midY) {
    worksMenu.classList.add('active');
  } else {
    worksMenu.classList.remove('active');
  }
});

aboutMenu.addEventListener('click', () => {
  worksMenu.classList.remove('active');
});

window.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('about.html')) {
    aboutMenu.classList.add('active');
    worksMenu.classList.remove('active');
  }
});


const letters   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const greetings = ["¡Hola!","こんにちは!","Bonjour!","여보!","你好!"];

let lastGreeting = null;


function startScramble(el) {
  const finalText = el.parentElement.dataset.value;
  let iteration = 0;

  if (el._scrambleInterval) clearInterval(el._scrambleInterval);

  el._scrambleInterval = setInterval(() => {
    el.textContent = finalText
      .split("")
      .map((ch, idx) => idx < iteration ? ch : letters[Math.floor(Math.random() * letters.length)])
      .join("");

    if (iteration >= finalText.length) {
      clearInterval(el._scrambleInterval);
    }
    iteration += 1;
  }, 40);
}


document.querySelectorAll('.icons.button').forEach(btn => {
  const tip = btn.querySelector('.hover-text');

  btn.addEventListener('mouseenter', () => {

    if (btn.id === 'snowman-icon') {
      const options = greetings.filter(g => g !== lastGreeting);
      const rnd     = options[Math.floor(Math.random() * options.length)];
      lastGreeting  = rnd;
      btn.dataset.value = rnd;
    }
    
    tip.style.opacity   = "1";
    tip.style.transform = "translateY(-50%) scale(1)";
 
    startScramble(tip);
  });

  btn.addEventListener('mouseleave', () => {
    if (tip._scrambleInterval) clearInterval(tip._scrambleInterval);
    tip.style.opacity   = "0";
    tip.style.transform = "translateY(-50%) scale(0.8)";
  });
});






