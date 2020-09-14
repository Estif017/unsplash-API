const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loading');

let count = 5;
const apiKey = 'iavWWGeecHHw5o5m3WGhipYMulHRhfQAX8DhA64ALHs';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let photoArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;

function setAttributes(element, attribute) {
	for (const key in attribute) {
		element.setAttribute(key, attribute[key]);
	}
}
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		count = 30;
	}
}
function displayPhoto() {
	imagesLoaded = 0;
	totalImages = photoArray.length;
	photoArray.forEach((photo) => {
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		item.appendChild(img);
		img.addEventListener('load', imageLoaded);
		imageContainer.appendChild(item);
	});
}
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photoArray = await response.json();
		displayPhoto();
	} catch (error) {
		console.log(error);
	}
}
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

getPhotos();
