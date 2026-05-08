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
        const turfColorMap = {
            'straight': {
                '#166434': {
                    's1-c0': '#1B3A27',
                    's1-c1': '#19482B',
                    's1-c2': '#166434',
                    's2-c0': '#1B3A27',
                    's2-c1': '#184F2D',
                    's2-c2': '#166434',
                    's3-c0': '#1A4129',
                    's3-c1': '#184F2D',
                    's3-c2': '#166434',
                    's4-c0': '#166434',
                    's4-c1': '#184F2D',
                    's4-c2': '#166434',
                    'base-c0': '#1F1F1F',
                },
                '#3C82F5': {
                    's1-c0': '#2D508A',
                    's1-c1': '#305A9F',
                    's1-c2': '#3364B4',
                    's2-c0': '#2D508A',
                    's2-c1': '#366ECA',
                    's2-c2': '#3C82F5',
                    's3-c0': '#2D508A',
                    's3-c1': '#3364B4',
                    's3-c2': '#3C82F5',
                    's4-c0': '#3C82F5',
                    's4-c1': '#3364B4',
                    's4-c2': '#2882F5',
                    'base-c0': '#1F1F1F',
                },
                '#F97315': {
                    's1-c0': '#76401A',
                    's1-c1': '#A15119',
                    's1-c2': '#CD6217',
                    's2-c0': '#76401A',
                    's2-c1': '#F97315',
                    's2-c2': '#F97315',
                    's3-c0': '#76401A',
                    's3-c1': '#A15119',
                    's3-c2': '#F97315',
                    's4-c0': '#F97315',
                    's4-c1': '#B75A18',
                    's4-c2': '#F97315',
                    'base-c0': '#1F1F1F',
                }
            },
            'curled': {
                '#166434': {
                    's1-c0': '#1B3A27',
                    's1-c1': '#19482B',
                    's1-c2': '#185630',
                    's2-c0': '#1B3A27',
                    's2-c1': '#19482B',
                    's2-c2': '#166434',
                    's3-c0': '#1B3A27',
                    's3-c1': '#184F2D',
                    's3-c2': '#166434',
                    's4-c0': '#184F2D',
                    's4-c1': '#185630',
                    's4-c2': '#166434',
                    'base-c0': '#1F1F1F',
                },
                '#3C82F5': {
                    's1-c0': '#2D508A',
                    's1-c1': '#3364B4',
                    's1-c2': '#305A9F',
                    's2-c0': '#2D508A',
                    's2-c1': '#3364B4',
                    's2-c2': '#3C82F5',
                    's3-c0': '#2D508A',
                    's3-c1': '#366ECA',
                    's3-c2': '#3C82F5',
                    's4-c0': '#305A9F',
                    's4-c1': '#366ECA',
                    's4-c2': '#3C82F5',
                    'base-c0': '#1F1F1F',
                },
                '#F97315': {
                    's1-c0': '#76401A',
                    's1-c1': '#A15119',
                    's1-c2': '#B75A18',
                    's2-c0': '#76401A',
                    's2-c1': '#B75A18',
                    's2-c2': '#F97315',
                    's3-c0': '#8C491A',
                    's3-c1': '#B75A18',
                    's3-c2': '#F97315',
                    's4-c0': '#8C491A',
                    's4-c1': '#B75A18',
                    's4-c2': '#F97315',
                    'base-c0': '#1F1F1F',
                },
                '#EF4345': {
                    's1-c0': '#722D2E',
                    's1-c1': '#9B3435',
                    's1-c2': '#B03839',
                    's2-c0': '#722D2E',
                    's2-c1': '#B03839',
                    's2-c2': '#EF4345',
                    's3-c0': '#722D2E',
                    's3-c1': '#B03839',
                    's3-c2': '#EF4345',
                    's4-c0': '#C53C3D',
                    's4-c1': '#B03839',
                    's4-c2': '#EF4345',
                    'base-c0': '#1F1F1F',
                },
                '#8A5CF5': {
                    's1-c0': '#493774',
                    's1-c1': '#543D8A',
                    's1-c2': '#6A49B4',
                    's2-c0': '#493774',
                    's2-c1': '#6A49B4',
                    's2-c2': '#8A5CF5',
                    's3-c0': '#493774',
                    's3-c1': '#6A49B4',
                    's3-c2': '#8A5CF5',
                    's4-c0': '#543D8A',
                    's4-c1': '#6A49B4',
                    's4-c2': '#8A5CF5',
                    'base-c0': '#1F1F1F',
                },
                '#91400D': {
                    's1-c0': '#4C2C17',
                    's1-c1': '#582F16',
                    's1-c2': '#4C2C17',
                    's2-c0': '#4C2C17',
                    's2-c1': '#6F3612',
                    's2-c2': '#91400D',
                    's3-c0': '#4C2C17',
                    's3-c1': '#6F3612',
                    's3-c2': '#91400D',
                    's4-c0': '#582F16',
                    's4-c1': '#6F3612',
                    's4-c2': '#91400D',
                    'base-c0': '#1F1F1F',
                },
                '#EC4799': {
                    's1-c0': '#702E4F',
                    's1-c1': '#9A3768',
                    's1-c2': '#AE3B74',
                    's2-c0': '#702E4F',
                    's2-c1': '#AE3B74',
                    's2-c2': '#EC4799',
                    's3-c0': '#702E4F',
                    's3-c1': '#AE3B74',
                    's3-c2': '#EC4799',
                    's4-c0': '#9A3768',
                    's4-c1': '#C33F80',
                    's4-c2': '#EC4799',
                    'base-c0': '#1F1F1F',
                },
                '#000000': {
                    's1-c1': '#121212',
                    's1-c2': '#1F1F1F',
                    's2-c0': '#0D0D0D',
                    's2-c1': '#171717',
                    's2-c2': '#1F1F1F',
                    's3-c0': '#1E1E1E',
                    's3-c1': '#171717',
                    's3-c2': '#1F1F1F',
                    's4-c0': '#171717',
                    's4-c1': '#1A1A1A',
                    's4-c2': '#1F1F1F',
                    'base-c0': '#1F1F1F',
                }

            }
        }

        // Initialize page when loaded
        initializePage();
        registerEventListeners();
        // Initialize page state (disable buttons, hide steps, clear sessionStorage)
        function initializePage() {
            // Update court fill color
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

            // Update stop color for turf SVG
            function updateStopColors(map, rootSelector) {
                const root = document.querySelector(rootSelector);
                if (!root) return;

                for (const [className, color] of Object.entries(map)) {
                    root.querySelectorAll(`.${className}`).forEach((el) => {
                        el.style.stopColor = color;
                    });
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
                            updateStopColors(turfColorMap[turfType][color], getTurfRootSelector(turfType));
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

        function getTurfRootSelector(turfType) {
            switch (turfType) {
                case 'straight':
                    return '#padel-straight-turf-image';
                case 'curled':
                    return '#padel-curled-turf-image';
            }
        }
    });
</script>
