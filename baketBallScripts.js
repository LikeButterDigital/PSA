var basketBallStep1Button, basketBallStep2Button, basketBallSubmit, basketBallFirstBackButton,
    basketBallSecondBackButton, addtionalNextButton, addtionalBackButton;

document.addEventListener("DOMContentLoaded", function () {
    sessionStorage.clear();
    // Declare all the elements at the top
    basketBallStep1Button = document.getElementById("basketball-court-next");
    basketBallStep2Button = document.getElementById("basketball-court-selection-next");
    basketBallSubmit = document.getElementById('basketball-submit');
    basketBallFirstBackButton = document.getElementById("basketball-court-selection-back");
    basketBallSecondBackButton = document.getElementById("basketball-user-information-back");
    addtionalNextButton = document.getElementById("basketball-court-size-selection-next");
    addtionalBackButton = document.getElementById("basketball-court-size-selection-back");

    const selectedCourtsIds = [
        "one-option", "2-option", "three-option", "four-vertical-option", "four-horizontal-option-2",
        "five-option-2", "six-vertical-option-3", "six-horizontal-option-2", "seven-option-2",
        "eight-vertical-option-2", "eight-horizontal-option-2"
    ];

    const registrationFormIds = [
        { id: 'fullName', value: 'Full-Name-2' },
        { id: "phone", value: 'Phone-2' },
        { id: "email", value: 'Email-2' },
        { id: "zipCode", value: 'Zip-Code-2' }
    ];

    // Initialize page when loaded
    initializePage();
    registerEventListeners();

    // Initialize page state (disable buttons, hide steps, clear sessionStorage)
    function initializePage() {
        function updateFillColor(targetElementClassName, color) {
            if(targetElementClassName=='key'){
              sessionStorage.setItem('basket-ball-keys', color);
            }else{
              sessionStorage.setItem(targetElementClassName, color);
            }
           
            sessionStorage.setItem("type", "basketball")
            console.log(sessionStorage)
            if(sessionStorage.getItem('border') || sessionStorage.getItem('court')) {
              basketBallStep1Button.classList.remove("disabled");
            }
            if(targetElementClassName && color) {
              var elements = document.getElementsByClassName(targetElementClassName);
              if(elements) {
                for (let element of elements) {
                  element.setAttribute('fill', color);
                }
              }
            }
          }
          // Change colors on click on each color block
          function changeColors(colorClassName) {
            var colorElements = document.getElementsByClassName(colorClassName);
            if(colorElements) {
              for (let colorElement of colorElements) {
                colorElement.addEventListener('click', function() {
                  var targetElementClass = colorElement.getAttribute('data-svg-path-class');
                  var color = colorElement.getAttribute('data-color');
                  updateFillColor(targetElementClass, color);
                });
              }
            }
          }
          changeColors('color-block');
        sessionStorage.clear();
        basketBallStep1Button.classList.add("disabled");
        basketBallStep2Button.classList.add("disabled");
        basketBallSubmit.classList.add("disabled");
        addtionalNextButton.classList.add("disabled");
        hideAdditonalStep();
        hideSecondStep();
        hideThirdStep();
    }

    // Register event listeners for buttons and form inputs
    function registerEventListeners() {
        if (addtionalNextButton) {
            addtionalNextButton.addEventListener("click", additonalButtonClickHandler);
        }
        if (basketBallStep1Button) {
            basketBallStep1Button.addEventListener("click", step1ButtonClickHandler);
        }
        if (basketBallStep2Button) {
            basketBallStep2Button.addEventListener("click", step2ButtonClickHandler);
        }
        if (basketBallFirstBackButton) {
            basketBallFirstBackButton.addEventListener("click", basketBallFirstBackButtonClickHandler);
        }
        if (basketBallSubmit) {
            basketBallSubmit.addEventListener("click", function () {
                console.log(sessionStorage);
                const payload = getPayload();
                postToServer(payload);
                sessionStorage.clear();
            });
        }
        if (basketBallSecondBackButton) {
            basketBallSecondBackButton.addEventListener("click", function () {
                console.log(sessionStorage);
                showSecondStep();
                hideFirstStep();
                hideThirdStep();
            });
        }
        if (addtionalBackButton) {
            addtionalBackButton.addEventListener("click", function () {
                console.log(sessionStorage);
                hideSecondStep();
                showFirstStep();
                hideAdditonalStep();
                hideThirdStep();
            });
        }

        // Register event listeners for court selection
        selectedCourtsIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener("click", function () {
                    sessionStorage.setItem("numberOfCourts", id);
                    console.log(sessionStorage);
                    basketBallStep2Button.classList.remove("disabled");
                });
            }
        });

        const sizeIds = ['NBA-option', 'college-option-2','high-school-option-2'];
        sizeIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener("click", function () {
                    sessionStorage.setItem("sizeOfCourt", id);
                    console.log(sessionStorage);
                    addtionalNextButton.classList.remove("disabled");
                });
            }
        });

        // Register event listeners for registration form fields
        registrationFormIds.forEach((formElement) => {
            const element = document.getElementById(formElement.value);
            if (element) {
                element.addEventListener("change", function () {
                    sessionStorage.setItem(formElement.id, element.value);
                    console.log(sessionStorage);
                    if (
                        sessionStorage.getItem('fullName') &&
                        sessionStorage.getItem('phone') &&
                        sessionStorage.getItem('email') &&
                        sessionStorage.getItem('zipCode')
                    ) {
                        basketBallSubmit.classList.remove("disabled");
                    } else {
                        basketBallSubmit.classList.add("disabled");
                    }
                });
            } else {
                console.warn(`Element with ID ${formElement.id} not found.`);
            }
        });
    }

    // Event handlers
    function step1ButtonClickHandler() {
        console.log(sessionStorage);
        hideSecondStep();
        hideFirstStep();
        hideThirdStep();
        showAdditonalStep();
    }

    function additonalButtonClickHandler() {
        console.log(sessionStorage);
        showSecondStep();
        hideFirstStep();
        hideThirdStep();
        hideAdditonalStep();
    }

    function step2ButtonClickHandler() {
        console.log(sessionStorage);
        hideFirstStep();
        hideSecondStep();
        showThirdStep();
        hideAdditonalStep();
    }

    function basketBallFirstBackButtonClickHandler() {
        console.log(sessionStorage);
        hideSecondStep();
        showFirstStep();
        hideThirdStep();
        hideAdditonalStep();
    }

    // Utility function for generating the payload
    function getPayload() {
        return {
            "email": 'neeraj111261cse@gmail.com' || 'admin@pinestateasphalt.com',
            "customerEmail": sessionStorage.getItem('email'),
            "fullName": sessionStorage.getItem('fullName'),
            "phone": sessionStorage.getItem('phone'),
            "zipCode": sessionStorage.getItem('zipCode'),
            "size": sessionStorage.getItem('sizeOfCourt'),  
            "numberOfCourts": sessionStorage.getItem('numberOfCourts')||'No Preference',
            "color": {
                border: sessionStorage.getItem('border')||'No Preference',
                centerCourt: sessionStorage.getItem('center-court')||'No Preference',
                court: sessionStorage.getItem('court')||'No Preference',
                threePoint: sessionStorage.getItem('three-point')||'No Preference',
                topKey: sessionStorage.getItem('top-key')||'No Preference',
                "basketBallKeys":sessionStorage.getItem('basket-ball-keys')||'No Preference',
            },
            "courtType": sessionStorage.getItem('type'),
        };
    }

    // Function to post data to the server
    function postToServer(payload) {
        fetch('https://csqp150d41.execute-api.us-east-1.amazonaws.com/dev/court', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('There was an error:', error);
        })
        .finally(() => {
            // Redirect user to home page after 3000ms
            sessionStorage.clear();
            setTimeout(() => {
                window.location.href = "http://pine-state-asphalt.webflow.io/";
            }, 3000);
        });
    }

    // Show/hide step functions
    function hideSecondStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-selection-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "none";
        }
    }

    function showSecondStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-selection-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "flex";
        }
    }

    function hideThirdStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-contact-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "none";
        }
    }

    function showThirdStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-contact-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "flex";
        }
    }

    function hideFirstStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "none";
        }
    }

    function showFirstStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "flex";
        }
    }

    function hideAdditonalStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-size-selection-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "none";
        }
    }

    function showAdditonalStep() {
        const basketballCourtDiv = document.getElementById("basketball-court-size-selection-section");
        if (basketballCourtDiv) {
            basketballCourtDiv.style.display = "flex";
        }
    }

});
