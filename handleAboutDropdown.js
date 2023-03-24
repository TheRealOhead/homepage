let aboutButton = document.getElementById('about-button');
let aboutToggle = false;
let triangleSpan = document.getElementById('about-triangle');
let aboutText = document.getElementById('about-text');


aboutButton.addEventListener('click',()=>{
	aboutToggle = !aboutToggle;

	if (aboutToggle) {
		triangleSpan.innerHTML = '▼';
		aboutText.style.display = 'inherit';
	} else {
		triangleSpan.innerHTML = '▶';
		aboutText.style.display = 'none';
	}
})