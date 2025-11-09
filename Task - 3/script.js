// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabs();
    initCarousel();
    initQuiz();
    initAPI();
});

// Tab Management
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Image Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Ensure index is within bounds
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        // Add active class to current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Start automatic sliding
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop automatic sliding
    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopSlideShow);
    carousel.addEventListener('mouseleave', startSlideShow);

    // Start the slideshow
    startSlideShow();
}

// Quiz functionality
function initQuiz() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const restartButton = document.getElementById('restart');

    const quizQuestions = [
        {
            question: "Which of the following is NOT a JavaScript data type?",
            answers: {
                a: "String",
                b: "Boolean",
                c: "Float",
                d: "Number"
            },
            correctAnswer: "c"
        },
        {
            question: "What does the '===' operator do in JavaScript?",
            answers: {
                a: "Assigns a value",
                b: "Compares value and type",
                c: "Compares value only",
                d: "Checks for null"
            },
            correctAnswer: "b"
        },
        {
            question: "Which method is used to add an element to the end of an array?",
            answers: {
                a: "push()",
                b: "pop()",
                c: "shift()",
                d: "unshift()"
            },
            correctAnswer: "a"
        },
        {
            question: "What does 'DOM' stand for in JavaScript?",
            answers: {
                a: "Document Object Model",
                b: "Data Object Model",
                c: "Digital Output Model",
                d: "Document Orientation Method"
            },
            correctAnswer: "a"
        }
    ];

    function buildQuiz() {
        const output = [];
        
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            
            for(let letter in currentQuestion.answers) {
                answers.push(
                    `<label class="answer">
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            
            output.push(
                `<div class="question">
                    <h3>${currentQuestion.question}</h3>
                    <div class="answers">${answers.join('')}</div>
                </div>`
            );
        });
        
        quizContainer.innerHTML = output.join('');
        
        // Add event listeners to answers
        const answerElements = document.querySelectorAll('.answer');
        answerElements.forEach(answer => {
            answer.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Remove selected class from all answers in this question
                const question = this.closest('.question');
                const allAnswers = question.querySelectorAll('.answer');
                allAnswers.forEach(a => a.classList.remove('selected'));
                
                // Add selected class to clicked answer
                this.classList.add('selected');
            });
        });
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;
        
        quizQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            if(userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainer.style.color = 'green';
            } else {
                answerContainer.style.color = 'red';
            }
        });
        
        const percentage = Math.round((numCorrect / quizQuestions.length) * 100);
        let message = '';
        
        if (percentage === 100) {
            message = `🎉 Perfect! You got ${numCorrect} out of ${quizQuestions.length} correct! 🎉`;
        } else if (percentage >= 70) {
            message = `Great job! You got ${numCorrect} out of ${quizQuestions.length} correct!`;
        } else {
            message = `You got ${numCorrect} out of ${quizQuestions.length} correct. Keep practicing!`;
        }
        
        resultsContainer.innerHTML = message;
        resultsContainer.style.display = 'block';
        resultsContainer.className = percentage >= 70 ? 'correct' : 'incorrect';
        
        submitButton.style.display = 'none';
        restartButton.style.display = 'block';
    }

    function restartQuiz() {
        resultsContainer.style.display = 'none';
        submitButton.style.display = 'block';
        restartButton.style.display = 'none';
        
        const answerContainers = quizContainer.querySelectorAll('.answers');
        answerContainers.forEach(container => {
            container.style.color = '';
        });
        
        const selectedAnswers = document.querySelectorAll('.answer.selected');
        selectedAnswers.forEach(answer => {
            answer.classList.remove('selected');
        });
        
        const radioInputs = document.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(input => {
            input.checked = false;
        });
    }

    // Build the quiz when page loads
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);
    restartButton.addEventListener('click', restartQuiz);
}

// API functionality
function initAPI() {
    const fetchJokeBtn = document.getElementById('fetchJoke');
    const fetchUserBtn = document.getElementById('fetchUser');
    const fetchCatFactBtn = document.getElementById('fetchCatFact');
    const dataContainer = document.getElementById('dataContainer');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    // Function to show loading state
    function showLoading() {
        loadingElement.classList.remove('hidden');
        dataContainer.innerHTML = '';
        errorElement.classList.add('hidden');
    }

    // Function to hide loading state
    function hideLoading() {
        loadingElement.classList.add('hidden');
    }

    // Function to display data
    function displayData(data, type) {
        hideLoading();
        
        let html = '';
        
        switch(type) {
            case 'joke':
                html = `<div class="joke">${data.joke || data.setup + ' ' + data.delivery}</div>`;
                break;
                
            case 'user':
                html = `
                    <div class="user-card">
                        <img src="${data.picture.large}" alt="User" class="user-avatar">
                        <div class="user-info">
                            <h3>${data.name.first} ${data.name.last}</h3>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Location:</strong> ${data.location.city}, ${data.location.country}</p>
                            <p><strong>Phone:</strong> ${data.phone}</p>
                        </div>
                    </div>
                `;
                break;
                
            case 'catFact':
                html = `<div class="cat-fact">${data.fact}</div>`;
                break;
        }
        
        dataContainer.innerHTML = html;
    }

    // Function to handle errors
    function handleError(error) {
        hideLoading();
        console.error('Error:', error);
        errorElement.classList.remove('hidden');
    }

    // Fetch random joke
    async function fetchJoke() {
        showLoading();
        
        try {
            // Try the first API
            const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
            
            if (!response.ok) {
                throw new Error('Failed to fetch joke');
            }
            
            const data = await response.json();
            displayData(data, 'joke');
        } catch (error) {
            try {
                // Fallback API
                const response = await fetch('https://official-joke-api.appspot.com/random_joke');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch joke from fallback API');
                }
                
                const data = await response.json();
                displayData(data, 'joke');
            } catch (fallbackError) {
                handleError(fallbackError);
            }
        }
    }

    // Fetch random user
    async function fetchUser() {
        showLoading();
        
        try {
            const response = await fetch('https://randomuser.me/api/');
            
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            
            const data = await response.json();
            displayData(data.results[0], 'user');
        } catch (error) {
            handleError(error);
        }
    }

    // Fetch cat fact
    async function fetchCatFact() {
        showLoading();
        
        try {
            const response = await fetch('https://catfact.ninja/fact');
            
            if (!response.ok) {
                throw new Error('Failed to fetch cat fact');
            }
            
            const data = await response.json();
            displayData(data, 'catFact');
        } catch (error) {
            handleError(error);
        }
    }

    // Event listeners
    fetchJokeBtn.addEventListener('click', fetchJoke);
    fetchUserBtn.addEventListener('click', fetchUser);
    fetchCatFactBtn.addEventListener('click', fetchCatFact);

    // Initialize with a joke
    fetchJoke();
}