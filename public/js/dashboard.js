document.addEventListener('DOMContentLoaded', function () {
    const profilePictureContainer = document.querySelector('.profile-picture-container');
    const editIconOverlay = document.querySelector('.edit-icon-overlay');
    const profileImageInput = document.getElementById('profileImageInput');
    const imagePreview = document.getElementById('imagePreview');
    const currentProfileImage = document.getElementById('currentProfileImage');
    const profileImageForm = document.getElementById('profileImageForm');

    // Image preview in modal
    profileImageInput.addEventListener('change', function (event) {
        const [file] = event.target.files;
        if (file) {
            imagePreview.src = URL.createObjectURL(file);
            imagePreview.style.display = 'block';
        } else {
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
        }
    });

    // Clear preview when modal is hidden
    const profileImageUploadModal = document.getElementById('profileImageUploadModal');
    profileImageUploadModal.addEventListener('hidden.bs.modal', () => {
        profileImageInput.value = '';
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
    });

    // Optional: Update profile image instantly after successful upload via AJAX
    profileImageForm.addEventListener('submit', function (event) {
        // Uncomment && customize if you switch to AJAX-based upload
        // event.preventDefault();
        // const formData = new FormData(profileImageForm);
        // fetch('/profile/post', { method: 'POST', body: formData })
        //   .then(res => res.json())
        //   .then(data => {
        //     currentProfileImage.src = data.newImageUrl; // Backend should return this
        //     const bsModal = bootstrap.Modal.getInstance(profileImageUploadModal);
        //     bsModal.hide();
        //   });
    });
});
