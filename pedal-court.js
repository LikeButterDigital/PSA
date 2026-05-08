<script> var Webflow = Webflow || []; Webflow.push(function () { $.get('https://raw.githubusercontent.com/LikeButterDigital/PSA/refs/heads/main/padel-court.html', function (data) { $('#padel-court-image').append(data); }); }); </script>
<script> var Webflow = Webflow || []; Webflow.push(function () { $.get('https://raw.githubusercontent.com/LikeButterDigital/PSA/refs/heads/main/straight-turf.html', function (data) { $('#padel-straight-turf-image').append(data); }); }); </script>
<script> var Webflow = Webflow || []; Webflow.push(function () { $.get('https://raw.githubusercontent.com/LikeButterDigital/PSA/refs/heads/main/curled-turf.html', function (data) { $('#padel-curled-turf-image').append(data); }); }); </script>
<style>
    .disabled {
        pointer-events: none;
        /* Disables clicking and other interactions */
        opacity: 0.5;
        /* Makes the element appear faded */
        cursor: not-allowed;
        /* Changes the cursor to a "not allowed" icon */
    }
</style>
<script>
    var padelStep1Button, padelStep2Button, padelStep3Button, padelSubmit, padelStep2BackButton, padelStep3BackButton, padelFormBackButton;
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('success-message').style.display = 'none';
        // Declare all the elements at the top
        padelStep1Button = document.getElementById("padel-court-next");
        padelStep2Button = document.getElementById("padel-court-type-next");
        padelStep3Button = document.getElementById("padel-court-selection-next");
        padelSubmit = document.getElementById('padel-submit');
        padelStep2BackButton = document.getElementById("padel-court-type-back");
        padelStep3BackButton = document.getElementById("padel-court-selection-back");
        padelFormBackButton = document.getElementById("padel-user-information-back");
        const checkbox = document.getElementById('checkbox');
        const padelCourtSizeIds = [
            "club",
            "club-plus",
            "panoramic",
            "panoramic-plus",
            "tournament",
            "tournament-plus",
            "iam-not-sure",
        ]
        const selectedCourtsIds = [
            "one-option",
            "two-option",
            "three-option",
            "four-vertical-option",
            "four-horizontal-option-2",
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
                sessionStorage.setItem(targetElementClassName, color);
                sessionStorage.setItem("type", "padel")
                if (sessionStorage.getItem('court')) {
                    padelStep1Button.classList.remove("disabled");
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

                if (colorElements) {
                    for (let colorElement of colorElements) {
                        colorElement.addEventListener('click', function () {
                            var turfType = colorElement.getAttribute('data-turf-type');
                            var targetElementClass = colorElement.getAttribute('data-svg-path-class');
                            var color = colorElement.getAttribute('data-color');
                            updateFillColor(targetElementClass, color);
                            sessionStorage.setItem('turfType', turfType);
                        });
                    }
                }
            }
            changeColors('color-block');
            sessionStorage.clear();
            padelStep1Button.classList.add("disabled");
            padelStep2Button.classList.add("disabled");
            padelStep3Button.classList.add("disabled");
            padelSubmit.classList.add("disabled");
            hideSecondStep();
            hideThirdStep();
            hideFourthStep();
        }
        // Register event listeners for buttons and form inputs
        function registerEventListeners() {
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {

                    sessionStorage.setItem('isResurfacedCourt', 'YES')
                } else {
                    sessionStorage.setItem('isResurfacedCourt', 'NO')

                }
            });

            if (padelStep1Button) {
                padelStep1Button.addEventListener("click", step1ButtonClickHandler);
            }

            if (padelStep2Button) {
                padelStep2Button.addEventListener("click", step2ButtonClickHandler);
            }

            if (padelStep3Button) {
                padelStep3Button.addEventListener("click", step3ButtonClickHandler);
            }

            if (padelStep2BackButton) {
                padelStep2BackButton.addEventListener("click", step2BackButtonClickHandler);
            }

            if (padelStep3BackButton) {
                padelStep3BackButton.addEventListener("click", step3BackButtonClickHandler);
            }

            if (padelFormBackButton) {
                padelFormBackButton.addEventListener("click", formBackButtonClickHandler);
            }

            if (padelSubmit) {
                padelSubmit.addEventListener("click", function () {

                    const payload = getPayload();
                    postToServer(payload);
                });
            }

            // Register event listeners for court type selection
            padelCourtSizeIds.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener("click", function () {
                        sessionStorage.setItem("size", id);

                        // Enable next button
                        padelStep2Button.classList.remove("disabled");
                    });
                }
            });

            // Register event listeners for court selection
            selectedCourtsIds.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.addEventListener("click", function () {
                        sessionStorage.setItem("numberOfCourts", id);

                        padelStep3Button.classList.remove("disabled");
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
                            padelSubmit.classList.remove("disabled");
                        } else {
                            padelSubmit.classList.add("disabled");
                        }
                    });
                } else {
                    console.warn(`Element with ID ${formElement.id} not found.`);
                }
            });
        }
        // Event handlers
        function step1ButtonClickHandler() {
            scrollToTop();
            showSecondStep();
            hideFirstStep();
            hideThirdStep();
            hideFourthStep();
        }

        function step2ButtonClickHandler() {
            scrollToTop();
            hideFirstStep();
            hideSecondStep();
            showThirdStep();
            hideFourthStep();
        }

        function step3ButtonClickHandler() {
            scrollToTop();
            hideFirstStep();
            hideSecondStep();
            hideThirdStep();
            showFourthStep();
        }

        function step2BackButtonClickHandler() {
            scrollToTop();
            showFirstStep();
            hideSecondStep();
            hideThirdStep();
            hideFourthStep();
        }

        function step3BackButtonClickHandler() {
            scrollToTop();
            hideFirstStep();
            showSecondStep();
            hideThirdStep();
            hideFourthStep();
        }

        function formBackButtonClickHandler() {
            scrollToTop();
            hideFirstStep();
            hideSecondStep();
            showThirdStep();
            hideFourthStep();
        }

        // Utility function for generating the payload

        function getPayload() {
            return {
                "email": 'info@pinestateasphalt.com',
                "customerEmail": sessionStorage.getItem('email'),
                "fullName": sessionStorage.getItem('fullName'),
                "phone": sessionStorage.getItem('phone'),
                "zipCode": sessionStorage.getItem('zipCode'),
                "size": sessionStorage.getItem('size') || 'No Preference',
                "numberOfCourts": sessionStorage.getItem('numberOfCourts') || 'No Preference',
                "turfType": sessionStorage.getItem('turfType') || 'No Preference',
                "color": {
                    "court": sessionStorage.getItem('court') || 'No Preference',
                },
                "courtType": sessionStorage.getItem('type') || 'No Preference',
                "isResurfaced": sessionStorage.getItem('isResurfacedCourt') || 'NO',
            };
        }
        // Function to post data to the server
        function postToServer(payload) {
            document.getElementById('padel-submit').classList.add("disabled");
            document.getElementById("padel-user-information-back").classList.add("disabled");
            fetch('https://ls3lz9m1jk.execute-api.us-east-1.amazonaws.com/master/court', {
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

                    document.getElementById('error-message').style.display = 'none';
                    document.getElementById('success-message').style.display = 'flex';
                })
                .catch(error => {

                    document.getElementById('error-message').style.display = 'flex';
                    document.getElementById('success-message').style.display = 'none';
                }).finally(() => {
                    //redirect user to home page after 3000 second
                    sessionStorage.clear();
                    setTimeout(() => {
                        window.location.href = "http://pinestatecourts.com/";
                    }, 3000);
                });
        }

        // Show/hide step functions
        function hideFirstStep() {
            const padelCourtDiv = document.getElementById("padel-court-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "none";
            }
        }

        function showFirstStep() {
            const padelCourtDiv = document.getElementById("padel-court-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "flex";
            }
        }

        function hideSecondStep() {
            const padelCourtDiv = document.getElementById("padel-court-type-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "none";
            }
        }

        function showSecondStep() {
            const padelCourtDiv = document.getElementById("padel-court-type-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "flex";
            }
        }

        function hideThirdStep() {
            const padelCourtDiv = document.getElementById("padel-court-selection-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "none";
            }
        }

        function showThirdStep() {
            const padelCourtDiv = document.getElementById("padel-court-selection-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "flex";
            }
        }

        function hideFourthStep() {
            const padelCourtDiv = document.getElementById("padel-court-contact-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "none";
            }
        }

        function showFourthStep() {
            const padelCourtDiv = document.getElementById("padel-court-contact-section");
            if (padelCourtDiv) {
                padelCourtDiv.style.display = "flex";
            }
        }

        function scrollToTop(step) {
            if (window) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
</script>
