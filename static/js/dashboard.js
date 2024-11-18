// document.addEventListener('DOMContentLoaded', () => {
//     const audioDropZone = document.getElementById('audio-drop-zone');
//     const videoDropZone = document.getElementById('video-drop-zone');
//     const ratingButtons = document.querySelectorAll('.rating-btn');
//     const sendReviewBtn = document.getElementById('send-review');
//     const downloadButton = document.getElementById('download-button');
//     const logoutButton = document.getElementById('logout');
//     const navLinks = document.querySelectorAll('.nav-link');

//     function handleDrop(e, type) {
//         e.preventDefault();
//         e.stopPropagation();
//         const file = e.dataTransfer.files[0];
//         if (file) {
//             console.log(`${type} file uploaded:`, file.name);
//             updatePreview(type, file);
//         }
//     }

//     function handleDragOver(e) {
//         e.preventDefault();
//         e.stopPropagation();
//     }

//     function updatePreview(type, file) {
//         const previewContent = document.querySelector('.preview-content');
//         previewContent.innerHTML = `<p>${type} file uploaded: ${file.name}</p>`;
        
//         // Enable buttons after file upload
//         editButton.disabled = false;
//         downloadButton.disabled = false;
//     }

//     [audioDropZone, videoDropZone].forEach(dropZone => {
//         dropZone.addEventListener('dragover', handleDragOver);
//         dropZone.addEventListener('drop', (e) => {
//             handleDrop(e, dropZone.id.includes('audio') ? 'Audio' : 'Video');
//         });
//         dropZone.addEventListener('click', () => {
//             const input = document.createElement('input');
//             input.type = 'file';
//             input.accept = dropZone.id.includes('audio') ? 'audio/*' : 'video/*';
//             input.onchange = (e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                     updatePreview(dropZone.id.includes('audio') ? 'Audio' : 'Video', file);
//                 }
//             };
//             input.click();
//         });
//     });

//     ratingButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             ratingButtons.forEach(btn => btn.classList.remove('active'));
//             button.classList.add('active');
//         });
//     });

//     sendReviewBtn.addEventListener('click', () => {
//         const selectedRating = document.querySelector('.rating-btn.active');
//         if (selectedRating) {
//             console.log('Review sent:', selectedRating.dataset.rating);
//             alert('Thank you for your feedback!');
//         } else {
//             alert('Please select a rating before sending the review.');
//         }
//     });

//     editButton.addEventListener('click', () => {
//         console.log('Edit button clicked');
//         alert('Edit functionality not implemented yet.');
//     });

//     downloadButton.addEventListener('click', () => {
//         console.log('Download button clicked');
//         alert('Download functionality not implemented yet.');
//     });

//     logoutButton.addEventListener('click', () => {
//         // Clear user session data or cookies
//         // Redirect to login page
//         window.location.href = 'login.html';
//     });

//     // Initially disable the buttons
//     editButton.disabled = true;
//     downloadButton.disabled = true;

//     // Handle navbar links
//     navLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             navLinks.forEach(l => l.classList.remove('active'));
//             link.classList.add('active');
            
//             const page = link.textContent.trim();
//             switch(page) {
//                 case 'Dashboard':
//                     window.location.href = 'dashboard.html';
//                     break;
//                 case 'Settings':
//                     window.location.href = 'setting.html';
//                     break;
//                 case 'Logout':
//                     // Already handled by logoutButton event listener
//                     break;
//             }
//         });
//     });
// });





document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const audioDropZone = document.getElementById('audio-drop-zone');
    const videoDropZone = document.getElementById('video-drop-zone');
    const audioUploadInput = document.getElementById('audio-upload');
    const videoUploadInput = document.getElementById('video-upload');
    const ratingButtons = document.querySelectorAll('.rating-btn');
    const sendReviewBtn = document.getElementById('send-review');
    const logoutButton = document.getElementById('logout');
    const navLinks = document.querySelectorAll('.nav-link');

    /**
     * Function to handle file upload and display the file name inside the drop zone
     * @param {HTMLInputElement} input - The file input element
     * @param {HTMLElement} dropZone - The drop zone element
     * @param {string} type - The type of file (Audio or Video)
     */
    const handleFileUpload = (input, dropZone, type) => {
        const file = input.files[0];
        if (file) {
            dropZone.innerHTML = `
                <p style="font-weight: bold;">${type} file uploaded: ${file.name}</p>
            `;
        }
    };

    /**
     * Function to handle file drop and trigger file upload handling
     * @param {DragEvent} event - The drag-and-drop event
     * @param {HTMLInputElement} input - The file input element
     * @param {HTMLElement} dropZone - The drop zone element
     * @param {string} type - The type of file (Audio or Video)
     */
    const handleDrop = (event, input, dropZone, type) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            input.files = event.dataTransfer.files;
            handleFileUpload(input, dropZone, type);
        }
    };

    /**
     * Function to prevent default behavior on dragover
     * @param {DragEvent} event - The dragover event
     */
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    /**
     * Function to set up drag-and-drop functionality for a drop zone
     * @param {HTMLElement} dropZone - The drop zone element
     * @param {HTMLInputElement} input - The input element
     */
    const handleFileDrop = (dropZone, input) => {
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', (event) => handleDrop(event, input, dropZone, input.getAttribute('id').includes('audio') ? 'Audio' : 'Video'));
        dropZone.addEventListener('click', () => input.click());
        input.addEventListener('change', () => handleFileUpload(input, dropZone, input.getAttribute('id').includes('audio') ? 'Audio' : 'Video'));
    };

    // Audio and Video drop zones
    handleFileDrop(audioDropZone, audioUploadInput);
    handleFileDrop(videoDropZone, videoUploadInput);

    // Handle rating button selection
    ratingButtons.forEach((button) => {
        button.addEventListener('click', () => {
            ratingButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Handle sending review
    if (sendReviewBtn) {
        sendReviewBtn.addEventListener('click', () => {
            const selectedRating = document.querySelector('.rating-btn.active');
            if (selectedRating) {
                alert(`Thank you for your feedback: ${selectedRating.dataset.rating}`);
            } else {
                alert('Please select a rating before sending the review.');
            }
        });
    }

    // Handle logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Clear user session data or cookies
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Handle navigation links
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');

            const page = link.textContent.trim();
            switch (page) {
                case 'Dashboard':
                    window.location.href = 'dashboard.html';
                    break;
                case 'Settings':
                    window.location.href = 'setting.html';
                    break;
                default:
                    break;
            }
        });
    });
});
