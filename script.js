function extractThumbnail() {
    const videoUrl = document.getElementById("videoUrl").value.trim();
    const thumbnailContainer = document.getElementById("thumbnail-container");
    const loadingSpinner = document.getElementById("loading-spinner");
    const errorMessage = document.getElementById("error-message");

    // Clear previous thumbnails and messages
    thumbnailContainer.innerHTML = "";
    errorMessage.style.display = "none";

    function addThumbnail(thumbnailUrl) {
        const thumbnailDiv = document.createElement("div");
        thumbnailDiv.className = "thumbnail";
        thumbnailDiv.innerHTML = `
            <img src="${thumbnailUrl}" alt="Thumbnail">
            <br>
            <button class="download-button" onclick="downloadThumbnail('${thumbnailUrl}')">Download</button>
        `;
        thumbnailContainer.appendChild(thumbnailDiv);
    }

    function extractThumbnailUrl(videoUrl) {
        const videoIdMatch = videoUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        if (!videoIdMatch) {
            showError("Invalid YouTube video URL");
            return null;
        }

        const videoId = videoIdMatch[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        return thumbnailUrl;
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    }

    loadingSpinner.style.display = "block";

    const thumbnailUrl = extractThumbnailUrl(videoUrl);
    if (thumbnailUrl) {
        loadingSpinner.style.display = "none";
        addThumbnail(thumbnailUrl);
    }
}

function downloadThumbnail(thumbnailUrl) {
    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = thumbnailUrl;
    downloadLink.target = "_blank";
    downloadLink.download = "thumbnail.jpg";
    downloadLink.click();
}

const extractButton = document.getElementById("extractButton");
extractButton.addEventListener("click", extractThumbnail);
