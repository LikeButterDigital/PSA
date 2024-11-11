var tennisStep1Button, tennisStep2Button, tennisSubmit, firstBackButton, secondBackButton;
document.addEventListener("DOMContentLoaded", function () {
    // Declare all the elements at the top
     tennisStep1Button = document.getElementById("tennis-court-next");
     tennisStep2Button = document.getElementById("tennis-court-selection-next");
     tennisSubmit = document.getElementById('tennis-submit');
     firstBackButton = document.getElementById("tennis-court-selection-back");
     secondBackButton = document.getElementById("tennis-user-information-back");

     const selectedCourtsIds = [
        "one-option",
        "2-option",
        "three-option",
        "four-vertical-option",
        "four-horizontal-option-2",
        "five-option-2",
        "six-vertical-option-3",
        "six-horizontal-option-2",
        "seven-option-2",
        "eight-vertical-option-2",
        "eight-horizontal-option-2",
      ];

    const registrationFormIds = [
        {id: 'fullName', value: 'Full-Name-2'},
        {id: "phone", value: 'Phone-2'},
        {id: "email", value: 'Email-2'},
        {id: "zipCode", value: 'Zip-Code-2'}
    ];

    // Initialize page when loaded
    initializePage();
    registerEventListeners();

    // Initialize page state (disable buttons, hide steps, clear sessionStorage)
    function initializePage() {

    function updateFillColor(targetElementClassName, color) {
        sessionStorage.setItem(targetElementClassName, color);
        sessionStorage.setItem("type", "tennis")
        
        if(sessionStorage.getItem('border') || sessionStorage.getItem('court')) {
          tennisStep1Button.classList.remove("disabled");
        }
        
        if (targetElementClassName && color) {
          var elements = document.getElementsByClassName(targetElementClassName);
          if (elements) {
            for (let element of elements) {
              element.setAttribute('fill', color);
            }
          }
        }
      }
      // Change colors on click on each color block
      function changeColors(colorClassName) {
        var colorElements = document.getElementsByClassName(colorClassName);
        console.log(colorElements);
        if (colorElements) {
          for (let colorElement of colorElements) {
            colorElement.addEventListener('click', function () {
              var targetElementClass = colorElement.getAttribute('data-svg-path-class');
              var color = colorElement.getAttribute('data-color');
              updateFillColor(targetElementClass, color);
            });
          }
        }
      }
      changeColors('color-block');
        sessionStorage.clear();
        tennisStep1Button.classList.add("disabled");
        tennisStep2Button.classList.add("disabled");
        tennisSubmit.classList.add("disabled");

        hideSecondStep();
        hideThirdStep();
    }

    // Register event listeners for buttons and form inputs
    function registerEventListeners() {
        if (tennisStep1Button) {
            tennisStep1Button.addEventListener("click", step1ButtonClickHandler);
        }

        if (tennisStep2Button) {
            tennisStep2Button.addEventListener("click", step2ButtonClickHandler);
        }

        if (firstBackButton) {
            firstBackButton.addEventListener("click", firstBackButtonClickHandler);
        }

        if (tennisSubmit) {
            tennisSubmit.addEventListener("click", function () {
                console.log(sessionStorage);
                const payload = getPayload();
                postToServer(payload);
                
            });
        }

        if (secondBackButton) {
            secondBackButton.addEventListener("click", function () {
                console.log(sessionStorage);
                showSecondStep();
                hideFirstStep();
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
                    tennisStep2Button.classList.remove("disabled");
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
                        tennisSubmit.classList.remove("disabled");
                    } else {
                        tennisSubmit.classList.add("disabled");
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
        showSecondStep();
        hideFirstStep();
        hideThirdStep();
    }

    function step2ButtonClickHandler() {
        console.log(sessionStorage);
        hideFirstStep();
        hideSecondStep();
        showThirdStep();
    }

    function firstBackButtonClickHandler() {
        console.log(sessionStorage);
        hideSecondStep();
        showFirstStep();
        hideThirdStep();
    }

    // Utility function for generating the payload
    function getPayload() {
        return {
            "email": 'neeraj111261cse@gmail.com' || 'admin@pinestateasphalt.com',
            "customerEmail":  sessionStorage.getItem('email'),
            "fullName": sessionStorage.getItem('fullName'),
            "phone": sessionStorage.getItem('phone'),
            "zipCode": sessionStorage.getItem('zipCode'),
            "size": "No Preference",
            "numberOfCourts": sessionStorage.getItem('numberOfCourts')||'No Preference',
            "color": {
                "border": sessionStorage.getItem('border')||'No Preference',
                "court": sessionStorage.getItem('court')||'No Preference',
            },
            "courtType": sessionStorage.getItem('type')||'No Preference',
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
        }).finally(() => {
            //redirect user to home page after 3000 second
            sessionStorage.clear();
            setTimeout(() => {
                window.location.href = "http://pine-state-asphalt.webflow.io/";
            }, 3000);
        });
    }

    // Show/hide step functions
    function hideSecondStep() {
        const tennisCourtDiv = document.getElementById("tennis-court-selection-section");
        if (tennisCourtDiv) {
            tennisCourtDiv.style.display = "none";
        }
    }

    function showSecondStep() {
        const tennisCourtDiv = document.getElementById("tennis-court-selection-section");
        if (tennisCourtDiv) {
            tennisCourtDiv.style.display = "flex";
        }
    }

    function hideThirdStep() {
        const tennisCourtDiv = document.getElementById("tennis-court-contact-section");
        if (tennisCourtDiv) {
            tennisCourtDiv.style.display = "none";
        }
    }

    function showThirdStep() {
        const tennisCourtDiv = document.getElementById("tennis-court-contact-section");
        if (tennisCourtDiv) {
            tennisCourtDiv.style.display = "flex";
        }
    }

    function hideFirstStep() {
        const tennisCourtDiv = document.getElementById("tennis-court-section");
        if (tennisCourtDiv) {
            tennisCourtDiv.style.display = "none";
        }
    }

    function showFirstStep() {
        const tennisCourtDiv = document.getElementById("tennis-court-section");
        if (tennisCourtDiv) {
            tennisCourtDiv.style.display = "flex";
        }
    }

});