const form = document.querySelector('#wordToPdfForm');
const wordFileInput = document.querySelector('#wordFile');
const convertBtn = document.querySelector('#convertBtn');
const loader = document.querySelector('#loader');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', e => {
	e.preventDefault();
	if (wordFileInput.files.length === 0) {
		alert('Please select a Word file to convert.');
		return;
	}
	loader.style.display = 'block';
	convertBtn.disabled = true;

	const formData = new FormData();
	formData.append('file', wordFileInput.files[0]);

	axios.post('https://api.yourpdfapi.com/convert/word-to-pdf', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	.then(response => {
		const pdfUrl = response.data.url;
		resultDiv.innerHTML = `<a href="${pdfUrl}" target="_blank">Download PDF</a>`;
	})
	.catch(error => {
		resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
	})
	.finally(() => {
		loader.style.display = 'none';
		convertBtn.disabled = false;
	});
});
