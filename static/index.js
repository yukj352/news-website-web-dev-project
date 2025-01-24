 
// // Get necessary DOM elements
// const inputButton = document.getElementById('inputButton');
// const searchButton = document.getElementById('searchButton');
// const searchResults = document.getElementById('searchResults');

// if (!inputButton || !searchButton || !searchResults) {
//     console.error('Essential elements are missing from the DOM.');
// }

// // API settings for News Search
// const apiKey = '01ba8fbbf29c41cfa66831687525620c'; // Replace with your valid API key
// const apiUrl = 'https://newsapi.org/v2/everything';
// let currentPage = 1;
// let currentSearchTerm = '';
// let currentSortBy = 'relevancy';

// // Fetch and display news articles
// function fetchNews(searchTerm, sortBy = 'relevancy', page = 1) {
//     if (!searchTerm) {
//         searchResults.innerHTML = '<p>Please enter a valid search term.</p>';
//         return;
//     }

//     const params = new URLSearchParams({
//         q: searchTerm,
//         apiKey: apiKey,
//         sortBy: sortBy,
//         page: page,
//         pageSize: 10, // Number of articles per page
//     });

//     searchResults.innerHTML = '<p>Loading...</p>'; // Show loading message

//     fetch(`${apiUrl}?${params}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (!data.articles || data.articles.length === 0) {
//                 searchResults.innerHTML = '<p>No articles found for your query.</p>';
//                 return;
//             }
//             displayResults(data.articles);
//             createPagination(data.totalResults, page);
//         })
//         .catch(error => {
//             console.error('Fetch error:', error);
//             searchResults.innerHTML = '<p>Unable to fetch data. Try again later.</p>';
//         });
// }

// // Display search results
// function displayResults(articles) {
//     searchResults.innerHTML = ''; // Clear previous results
//     articles.forEach(article => {
//         const card = document.createElement('div');
//         card.classList.add('card');

//         if (article.urlToImage) {
//             const image = document.createElement('img');
//             image.classList.add('card-img');
//             image.src = article.urlToImage;
//             image.alt = article.title || 'News image';
//             card.appendChild(image);
//         }

//         const title = document.createElement('h2');
//         title.classList.add('card-title');
//         title.textContent = article.title || 'No title available';
//         card.appendChild(title);

//         const description = document.createElement('p');
//         description.classList.add('card-description');
//         description.textContent = article.description || 'No description available';
//         card.appendChild(description);

//         if (article.url) {
//             const link = document.createElement('a');
//             link.classList.add('btn-primary');
//             link.href = article.url;
//             link.textContent = 'Read more';
//             link.target = '_blank';
//             card.appendChild(link);
//         }

//         searchResults.appendChild(card);
//     });
// }

// // Create pagination controls
// function createPagination(totalResults, currentPage) {
//     const pagination = document.createElement('div');
//     pagination.classList.add('pagination');
//     searchResults.appendChild(pagination);

//     const totalPages = Math.ceil(totalResults / 10);

//     if (currentPage > 1) {
//         const prevButton = document.createElement('button');
//         prevButton.textContent = 'Previous';
//         prevButton.onclick = () => {
//             fetchNews(currentSearchTerm, currentSortBy, currentPage - 1);
//         };
//         pagination.appendChild(prevButton);
//     }

//     if (currentPage < totalPages) {
//         const nextButton = document.createElement('button');
//         nextButton.textContent = 'Next';
//         nextButton.onclick = () => {
//             fetchNews(currentSearchTerm, currentSortBy, currentPage + 1);
//         };
//         pagination.appendChild(nextButton);
//     }
// }

// // Event listener for search button
// searchButton.addEventListener('click', () => {
//     const searchTerm = inputButton.value.trim();
//     currentSearchTerm = searchTerm;
//     fetchNews(searchTerm, currentSortBy, 1);
// });

// // Navbar link handlers
// document.querySelectorAll('.navbar_list_link a').forEach(link => {
//     link.addEventListener('click', event => {
//         const category = link.textContent.trim();

//         if (category === 'Home') {
//             searchResults.innerHTML = '';
//             inputButton.value = '';
//         } else if (category === 'About') {
//             window.location.href = 'about.html';
//         } else if (category !== 'Log in' && category !== 'Register') {
//             // Let the login and register links navigate naturally
//             inputButton.value = category;
//             currentSearchTerm = category;
//             fetchNews(category, currentSortBy, 1);
//         }
//     });
// });
// // // Handle sign-up form submission
// // const signupForm = document.getElementById("signupForm");
// // if (signupForm) {
// //     signupForm.addEventListener("submit", async (event) => {
// //         event.preventDefault();

// //         const formData = new FormData(signupForm);
// //         const response = await fetch('/signup', {
// //             method: 'POST',
// //             body: new URLSearchParams(formData),
// //         });

// //         const result = await response.text();
// //         const signupMessage = document.getElementById("signupMessage");

// //         if (result.includes("successful")) {
// //             signupMessage.innerText = result; // Display success message on sign-up page
// //             signupMessage.classList.add("success"); // Add success styling
// //             setTimeout(() => {
// //                 window.location.href = "index.html"; // Redirect to homepage after 2 seconds
// //             }, 2000);
// //         } else {
// //             signupMessage.innerText = result; // Display error message on sign-up page
// //             signupMessage.classList.add("error"); // Add error styling
// //         }
// //     });
// // }
// // // Add event listener to login form submission
// // document.getElementById("loginForm").addEventListener("submit", async function (event) {
// //     event.preventDefault(); // Prevent the default form submission

// //     // Collect the form data
// //     const formData = new FormData(this);

// //     // Send a POST request to the backend /login route
// //     const response = await fetch('/login', {
// //         method: 'POST',
// //         body: new URLSearchParams(formData),
// //     });

// //     // Get the result (response from server)
// //     const result = await response.text();

// //     // Display the response message (success or error)
// //     document.getElementById("loginMessage").innerText = result;

// //     // Optionally redirect to homepage if login is successful
// //     if (response.ok && result === "Login successful!") {
// //         setTimeout(() => {
// //             window.location.href = '/';  // Redirect to homepage (adjust if needed)
// //         }, 2000);  // Redirect after 2 seconds
// //     }
// // });
// document.addEventListener("DOMContentLoaded", () => {
//     // Select form elements
//     const registerForm = document.querySelector('form[action="/register"]');
//     const loginForm = document.querySelector('form[action="/login"]');
  
//     // Add event listeners for client-side validation
//     if (registerForm) {
//       registerForm.addEventListener("submit", (e) => {
//         if (!validateRegisterForm()) {
//           e.preventDefault(); // Prevent form submission if validation fails
//         }
//       });
//     }
  
//     if (loginForm) {
//       loginForm.addEventListener("submit", (e) => {
//         if (!validateLoginForm()) {
//           e.preventDefault(); // Prevent form submission if validation fails
//         }
//       });
//     }
  
//     // Validation for the Register Form
//     function validateRegisterForm() {
//       const name = document.getElementById("name");
//       const email = document.getElementById("email");
//       const password = document.getElementById("password");
  
//       let isValid = true;
  
//       if (name && name.value.trim() === "") {
//         showError(name, "Name is required.");
//         isValid = false;
//       } else {
//         clearError(name);
//       }
  
//       if (email && !validateEmail(email.value.trim())) {
//         showError(email, "Enter a valid email address.");
//         isValid = false;
//       } else {
//         clearError(email);
//       }
  
//       if (password && password.value.trim().length < 6) {
//         showError(password, "Password must be at least 6 characters.");
//         isValid = false;
//       } else {
//         clearError(password);
//       }
  
//       return isValid;
//     }
  
//     // Validation for the Login Form
//     function validateLoginForm() {
//       const email = document.getElementById("email");
//       const password = document.getElementById("password");
  
//       let isValid = true;
  
//       if (email && !validateEmail(email.value.trim())) {
//         showError(email, "Enter a valid email address.");
//         isValid = false;
//       } else {
//         clearError(email);
//       }
  
//       if (password && password.value.trim() === "") {
//         showError(password, "Password is required.");
//         isValid = false;
//       } else {
//         clearError(password);
//       }
  
//       return isValid;
//     }
  
//     // Helper Functions
//     function validateEmail(email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return emailRegex.test(email);
//     }
  
//     function showError(input, message) {
//       const parent = input.parentElement;
//       let error = parent.querySelector(".error-message");
  
//       if (!error) {
//         error = document.createElement("div");
//         error.className = "error-message text-danger";
//         parent.appendChild(error);
//       }
  
//       error.textContent = message;
//     }
  
//     function clearError(input) {
//       const parent = input.parentElement;
//       const error = parent.querySelector(".error-message");
  
//       if (error) {
//         parent.removeChild(error);
//       }
//     }
//   });
// Get necessary DOM elements
const inputButton = document.getElementById('inputButton');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

if (!inputButton || !searchButton || !searchResults) {
    console.error('Essential elements are missing from the DOM.');
}

// API settings for News Search
const apiKey = '01ba8fbbf29c41cfa66831687525620c'; // Replace with your valid API key
const apiUrl = 'https://newsapi.org/v2/everything';
let currentPage = 1;
let currentSearchTerm = '';
let currentSortBy = 'relevancy';

// Fetch and display news articles
function fetchNews(searchTerm, sortBy = 'relevancy', page = 1) {
    if (!searchTerm) {
        searchResults.innerHTML = '<p>Please enter a valid search term.</p>';
        return;
    }

    const params = new URLSearchParams({
        q: searchTerm,
        apiKey: apiKey,
        sortBy: sortBy,
        page: page,
        pageSize: 10, // Number of articles per page
    });

    searchResults.innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch(`${apiUrl}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.articles || data.articles.length === 0) {
                searchResults.innerHTML = '<p>No articles found for your query.</p>';
                return;
            }
            displayResults(data.articles);
            createPagination(data.totalResults, page);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            searchResults.innerHTML = '<p>Unable to fetch data. Try again later.</p>';
        });
}

// Display search results
function displayResults(articles) {
    searchResults.innerHTML = ''; // Clear previous results
    articles.forEach(article => {
        if (!article.title || !article.url) {
            console.warn('Skipped an article due to missing title or URL:', article);
            return; // Skip articles with missing title or URL
        }

        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.classList.add('card-img');
        image.src = article.urlToImage || 'placeholder.png'; // Placeholder image if urlToImage is missing
        image.alt = article.title || 'News image';
        card.appendChild(image);

        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = article.title || 'No title available';
        card.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('card-description');
        description.textContent = article.description || 'No description available';
        card.appendChild(description);

        const link = document.createElement('a');
        link.classList.add('btn-primary');
        link.href = article.url;
        link.textContent = 'Read more';
        link.target = '_blank';
        card.appendChild(link);

        searchResults.appendChild(card);
    });

    if (!articles.length) {
        searchResults.innerHTML = '<p>No articles available.</p>';
    }
}

// Create pagination controls
function createPagination(totalResults, currentPage) {
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');
    searchResults.appendChild(pagination);

    const totalPages = Math.ceil(totalResults / 10);

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.onclick = () => {
            fetchNews(currentSearchTerm, currentSortBy, currentPage - 1);
        };
        pagination.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.onclick = () => {
            fetchNews(currentSearchTerm, currentSortBy, currentPage + 1);
        };
        pagination.appendChild(nextButton);
    }

    if (totalResults === 0) {
        pagination.innerHTML = '<p>No more articles to display.</p>';
    }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const searchTerm = inputButton.value.trim();
    currentSearchTerm = searchTerm;
    fetchNews(searchTerm, currentSortBy, 1);
});

// Navbar link handlers
document.querySelectorAll('.navbar_list_link a').forEach(link => {
    link.addEventListener('click', event => {
        const category = link.textContent.trim();

        if (category === 'Home') {
            searchResults.innerHTML = '';
            inputButton.value = '';
        } else if (category === 'About') {
            window.location.href = '/about';
        } else if (category !== 'Log in' && category !== 'Register') {
            // Let the login and register links navigate naturally
            inputButton.value = category;
            currentSearchTerm = category;
            fetchNews(category, currentSortBy, 1);
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Select form elements
    const registerForm = document.querySelector('form[action="/register"]');
    const loginForm = document.querySelector('form[action="/login"]');
  
    // Add event listeners for client-side validation
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        if (!validateRegisterForm()) {
          e.preventDefault(); // Prevent form submission if validation fails
        }
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        if (!validateLoginForm()) {
          e.preventDefault(); // Prevent form submission if validation fails
        }
      });
    }
  
    // // Validation for the Register Form
    // function validateRegisterForm() {
    //   const name = document.getElementById("name");
    //   const email = document.getElementById("email");
    //   const password = document.getElementById("password");
  
    //   let isValid = true;
  
    //   if (name && name.value.trim() === "") {
    //     showError(name, "Name is required.");
    //     isValid = false;
    //   } else {
    //     clearError(name);
    //   }
  
    //   if (email && !validateEmail(email.value.trim())) {
    //     showError(email, "Enter a valid email address.");
    //     isValid = false;
    //   } else {
    //     clearError(email);
    //   }
  
    //   if (password && password.value.trim().length < 6) {
    //     showError(password, "Password must be at least 6 characters.");
    //     isValid = false;
    //   } else {
    //     clearError(password);
    //   }
  
    //   return isValid;
    // }
  
    // // Validation for the Login Form
    // function validateLoginForm() {
    //   const email = document.getElementById("email");
    //   const password = document.getElementById("password");
  
    //   let isValid = true;
  
    //   if (email && !validateEmail(email.value.trim())) {
    //     showError(email, "Enter a valid email address.");
    //     isValid = false;
    //   } else {
    //     clearError(email);
    //   }
  
    //   if (password && password.value.trim() === "") {
    //     showError(password, "Password is required.");
    //     isValid = false;
    //   } else {
    //     clearError(password);
    //   }
  
    //   return isValid;
    // }
  
    // // Helper Functions
    // function validateEmail(email) {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   return emailRegex.test(email);
    // }
  
    // function showError(input, message) {
    //   const parent = input.parentElement;
    //   let error = parent.querySelector(".error-message");
  
    //   if (!error) {
    //     error = document.createElement("div");
    //     error.className = "error-message text-danger";
    //     parent.appendChild(error);
    //   }
  
    //   error.textContent = message;
    // }
  
    // function clearError(input) {
    //   const parent = input.parentElement;
    //   const error = parent.querySelector(".error-message");
  
    //   if (error) {
    //     parent.removeChild(error);
    //   }
    // }
  });
