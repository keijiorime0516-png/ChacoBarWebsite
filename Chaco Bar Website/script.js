/* Setting Date Input to Current Date */
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("date").value = today;
});

/* Logo animation */
const logo = document.getElementById("logo");

const gifSrc = "image/spinning_logo2.gif";
const staticSrc = "image/logo_cream.png";
const preload = new Image();
preload.src = gifSrc;

logo.addEventListener("mouseover", () => {
  logo.src = gifSrc + "?v=" + Date.now(); // play GIF fresh each time
  setTimeout(() => {
    logo.src = staticSrc; // go back after 3 seconds
  }, 300); // 3000 = 3 seconds
});

logo.addEventListener("mouseout", () => {
  clearTimeout(timer);
  logo.src = staticSrc;
});

const announcementContainers = document.querySelectorAll(".announcement_container");

announcementContainers.forEach(container => {
    container.addEventListener("mouseover", () => {
        let textContainer = container.querySelector(".announcement_textContainer");
        let texts = container.querySelectorAll("h3, h4, h5, button");
        textContainer.style.backgroundColor =  "rgba(255, 239, 226)";
        texts.forEach(text => {
            text.style.color = "rgba(63, 63, 63)";
            if (text.tagName === "BUTTON") {
                text.style.borderColor = "rgba(63, 63, 63)"; 
            }
        });
    
    });
    container.addEventListener("mouseout", () => {
        let textContainer = container.querySelector(".announcement_textContainer");
        textContainer.style.backgroundColor =  "rgba(0, 0, 0)";
        let texts = container.querySelectorAll("h3, h4, h5, button");
        texts.forEach(text => {
            text.style.color = "rgba(255, 239, 226)";
            if (text.tagName === "BUTTON") {
                text.style.borderColor = "rgba(255, 239, 226)"; 
            }
        });
    
    });
});

const btns = document.querySelectorAll(".btn_design");

btns.forEach(btn => {
    btn.addEventListener("mouseover", () => {
        btn.style.textDecoration = "underline";
    });

    btn.addEventListener("mouseout", () => {
        btn.style.textDecoration = "none";
    });
});

const nav_items = document.querySelectorAll("#nav_right > a");

nav_items.forEach(element => {
    element.addEventListener("mouseover", () => {
        if(!element.classList.contains("active")) {
            element.style.fontWeight = "400";
            element.style.textDecoration = "underline 2px";
            element.style.textDecorationColor = "rgba(255, 239, 226, 0.7)";
            element.style.textUnderlineOffset = "12px";
        }
        
    });

    element.addEventListener("mouseout", () => {
        if(!element.classList.contains("active")) {
            element.style.textDecoration = "none";
            element.style.fontWeight = "250";
        }

    });

});

const menuItems = document.querySelectorAll(".foodItem");

menuItems.forEach(item => {
    let background = item.querySelector(".foodItemBackground");
    let name = item.querySelector(".foodName");

    item.addEventListener("mouseover", () => {
        background.style.opacity = "100%";
        name.style.opacity = "100%";
    });
    item.addEventListener("mouseout", () => {
        background.style.opacity = "0%";
        name.style.opacity = "0%";
    });
});




/* Menu Filtering Button Behaviour */
const buttons = document.querySelectorAll(".btn_menuFilter");
const slider = document.getElementById("slider");
const foodSections = document.querySelectorAll(".menuFoodSection.food");
const drinkSections = document.querySelectorAll(".menuFoodSection.drink");
const setMenuSections = document.querySelector(".menuFoodSection.setMenu");

// Slider Behaviour
function setSliderPosition(button) {
    if (!button) return;
    const buttonWidth = button.offsetWidth;
    const buttonLeft = button.offsetLeft;

    slider.style.width = (buttonWidth * 0.9) + "px";
    slider.style.transform = "translateX(" + (buttonLeft + buttonWidth * 0.05) + "px)";

}

// Inital Menu State
const activeButton = document.querySelector(".btn_menuFilter.active");
setSliderPosition(activeButton);

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".btn_menuFilter.active").classList.remove("active");
        btn.classList.add("active");
        setSliderPosition(btn);

        const categoryName = btn.textContent;
        
        if (categoryName === "DRINKS") {
            foodSections.forEach(section => section.style.display = "none");
            setMenuSections.style.display = "none";
            drinkSections.forEach(section => section.style.display = "block");
        } else if (categoryName === "SET MENU") {
            foodSections.forEach(section => section.style.display = "none");
            drinkSections.forEach(section => section.style.display = "none");
            setMenuSections.style.display = "block";

            // Inside your SET MENU else if
            // Assuming you have a way to match the food items, e.g., by name
            // Query set menu items
            const setMenuItems = document.querySelectorAll("#setMenuSection .foodItem");

            setMenuItems.forEach(item => {
                // Reset initial state with random offset
                const randomX = Math.random() * 200 - 100; // -100 to +100 px
                const randomY = Math.random() * 200 - 100; // -100 to +100 px

                item.style.transform = `translate(${randomX}px, ${randomY}px)`;
                item.style.opacity = 0;

                // Animate to final position
                requestAnimationFrame(() => {
                    item.style.opacity = 1;
                    item.style.transform = "translate(0, 0)";
                });
            });

        } else {
            foodSections.forEach(section => section.style.display = "block");
            setMenuSections.style.display = "none";
            drinkSections.forEach(section => section.style.display = "none");
        }
    });
 });


/* Reservation input Data behaviour */
const inputScreen = document.getElementById("reservationInputScreen");
const contactScreen = document.getElementById("reservationContactDetailScreen");
const confirmationScreen = document.getElementById("reservationConfirmationScreen");

const btnGetTable = document.getElementById("btnGetTable");
const btnMakeReservation = document.getElementById("btnMakeReservation");
const btnAddEmail = document.getElementById("btnAddEmail");
const displayGuestContainer= document.getElementById("displayGuestEmail");


const reservationInput = new Object();

btnGetTable.addEventListener("click", (e) => {
    e.preventDefault();
    const guestNumInput = document.getElementById("people").value;
    const dateInput = document.getElementById("date").value;
    const timeInput = document.getElementById("time").value; 

    reservationInput.guestNum = guestNumInput;
    reservationInput.date = dateInput;
    reservationInput.time = timeInput;
    // ADD for seating option
    console.log(reservationInput);
    inputScreen.style.display = "none";
    contactScreen.style.display = "flex";
})

/* adding email div structure
<div class="guestEmailContainer">
    <h5 class="guestEmailh5">keiji.orime@gmail.com</h5>
    <button class="removeEmail">✖</button>
</div> 
                     */
function createGuestEmail(email) {
    const newdiv = document.createElement("div");
    newdiv.className = 'guestEmailContainer';

    newdiv.innerHTML = `<h5 class="guestEmailh5">${email}</h5>
                     <button class="removeEmail">✖</button>`;

    displayGuestContainer.append(newdiv);

}

const guestEmailList = []
btnAddEmail.addEventListener("click", (e) => {
    e.preventDefault();
    const guestEmail = document.getElementById("guestEmail");
    const guestEmailInput = guestEmail.value.trim();


    if (guestEmailList.length === 10) {
        alert("You cannot add more than 10 Guest")
    } else if (guestEmailInput !== "" && guestEmail.checkValidity()) {
        guestEmailList.push(guestEmailInput);
        console.log(guestEmailList)

        createGuestEmail(guestEmailInput);
        guestEmail.value = "";

    } else {
        alert("Invalid Email");
    }    
});


// removing guest email
displayGuestContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeEmail")) {
        e.preventDefault();
        const parentDiv = e.target.parentElement;
        const valueRemove = parentDiv.querySelector(".guestEmailh5").textContent;
        const indexValue = guestEmailList.indexOf(valueRemove);

        if (indexValue !== -1) {
            guestEmailList.splice(indexValue, 1);
            console.log(guestEmailList);
        }
        parentDiv.remove();
    }
})

    

btnMakeReservation.addEventListener("click", (e) => {
    e.preventDefault();
    const emailEl = document.getElementById("email");
    const emailInput = emailEl.value.trim();
    const phoneInput = document.getElementById("tel").value.trim();
    const phoneCodeInput =document.getElementById("countryCode").value;
    let commentInput = document.getElementById("comment").value.trim();

    if (commentInput === "") {
        commentInput = "None";
    }

    if (emailInput !== "" && emailEl.checkValidity() && /^\d{9}$/.test(phoneInput)) {
        reservationInput.email = emailInput;
        reservationInput.phone = `${phoneCodeInput} ${phoneInput}`;
        reservationInput.guestList = guestEmailList;
        reservationInput.comments = commentInput;

        const confirmationDiv= document.getElementById("reservationConfirmationContainer");

        const guestNumText = confirmationDiv.children[3];
        const dateTimeText = confirmationDiv.children[4];
        const commentText = confirmationDiv.children[5];

        console.log(reservationInput);
        contactScreen.style.display = "none";
        confirmationScreen.style.display = "flex";
        guestNumText.textContent = `Number of Guests: ${reservationInput.guestNum}`;
        dateTimeText.textContent = `Date & Time: ${reservationInput.date} ${reservationInput.time}`;
        commentText.textContent = `Additional Info: ${reservationInput.comments}`;

    } else {
        alert('Invalid Input: Email must be a valid email & Mobile Number must be 9 digits');
    }
});

const btnBacks = document.querySelectorAll(".btnReturn");

btnBacks.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        contactScreen.style.display = "none";
        confirmationScreen.style.display = "none";
        reservationInputScreen.style.display = "flex";
    });
});



