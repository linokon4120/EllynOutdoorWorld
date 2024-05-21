// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");

    // Write your code to manipulate the DOM here


}


// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);




// Add your query for the sign now button here
let signNowButton = document.getElementById("sign-now-button");
// Add code to keep track of the current number of signatures
let count = 3;


const addSignature = (person) => {

    // Write your code to manipulate the DOM here

  const newSign = `🖊️ ${person.fname} joined this.`; 
  document.querySelector('.signatures').insertAdjacentHTML('beforeend', `<p>${newSign}</p>`);
  // Remove the old count of signatures
  document.getElementById('counter').remove();

  // Update the count
  count = count + 1;

  // Create a new counter element
  const newCounter = document.createElement('p');
  newCounter.id = 'counter';
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  // Append the counter to the signatures div
  document.querySelector('.signatures').appendChild(newCounter);
}


// Add a function to validate form inputs from users
const validateForm = () => {
  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    fname: petitionInputs[0].value, // accesses and saves value of first input
    email: petitionInputs[2].value 

  }
  // let email = {
  //   email: petitionInputs[2].value 
  // }
  

  for (let i = 0; i < petitionInputs.length; i++) {
    if (person.fname.length < 2 || person.email.length < 4) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  };

  // Checking if the email input contains error (if they dont have the ending ".com")
  const email = document.getElementById("email");
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  } else {
    email.classList.remove('error');
  }

  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

signNowButton.addEventListener('click', validateForm);


// And now we add animation to our page for more interactivity
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionPropery: 'all',
  transitionTimingFunction: 'ease'
}

const revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);


// Add event listener to the "Reduce Motion" button
document.getElementById('reduce-motion-btn').addEventListener('click', reduceMotion);

function reduceMotion() {
  // Update animation object with new values
  const animation = {
    transitionProperty: 'transform opacity',
    transitionDuration: '0s',
    transitionTimingFunction: 'ease-in-out',
    transitionDelay: '0s',
  };
  // Loop through revealableContainers and update styles
  const revealableContainers = document.getElementsByClassName('revealable');
  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
    revealableContainers[i].style.transitionDelay = animation.transitionDelay;
  }
}



function toggleModal(person) {
  let modal = document.getElementById('thanks-modal');
  let modalContent = document.getElementById('thanks-modal-content');

  // Set a nice thank you message including the user's name
  modalContent.textContent = `Thank you, ${person.fname}, for signing the petition! We appreciate your support.`;

  
  modal.style.display = "flex";
  let intervalId = setInterval(scaleImage, 500);
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000)



}


let scaleFactor = 1;
let modalImage = document.getElementById('modal-image');

function scaleImage() {
  // // Toggle the image size between a factor of 1 and 0.8
  // if (scaleFactor === 1) {
  //   modalImage.style.transform = 'scale(0.8)';
  //   scaleFactor = 0.8;
  // } else {
  //   modalImage.style.transform = 'scale(1)';
  //   scaleFactor = 1;
  // }
  scaleFactor = scaleFactor === 1 ? 0.8 : 1


  // Apply the scaleFactor to the image using CSS transform
  modalImage.style.transform = `scale(${scaleFactor})`;
  modalImage.style.transform = `scale(${scaleFactor}) rotate(15deg)`;


}

// Select the close modal button and save it to a variable
let closeModalButton = document.getElementById('close-modal');

// Function to hide the modal
const hideModal = () => {
  let modal = document.querySelector('.modal');
  modal.style.display = 'none';
}

// Add click event listener to the close modal button
closeModalButton.addEventListener('click', hideModal);


