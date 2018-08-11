const blue = '#514AF2';
const green = '#7EFFAB';
const red = '#FF7E7E';
const yellow = '#FFD27E'

const face = document.querySelectorAll('.face');
const numOfFaces = face.length;
const heroInterval = 5000;
let currentFace = 0;

setInterval(function(){
	changeFace();
	changeHeroText();
},heroInterval); // Interval between slides

function changeFace() {
	
	// Move current face in
	currentFace = (currentFace + 1) % face.length;
	face[currentFace].style.transform = 'translateY(0)';
	setTimeout(function(){ // Wait 2s and bring face to bottom
		face[currentFace].style.zIndex = '0';
	},2000)

	// Wait 1s and slide previous slide back down
	setTimeout(function(){
		face.forEach( thisFace => {
			if( thisFace != face[currentFace] ) {
				thisFace.style.transform = 'translateY(100%)'
				setTimeout(function(){ // Wait 1s and bring face to top
					thisFace.style.zIndex = '1';
				},1000)
			}
		})
	},1000)
}

const name = document.querySelector('.halfCol.content h4');
const line = document.querySelector('.halfCol.content hr');
const subjects = [...document.querySelectorAll('.halfCol.content .subject')];
const colors = [green, red, yellow];
let currentColor = 0;
let currentSubject = 0;

name.style.color = green;
line.style.borderColor = green;

subjects[0].style.opacity = '1'; // Make the first subject visible
subjects[0].style.transform = 'translateX(0)';


function changeHeroText() {

	// Change name and line color
	currentColor = (currentColor + 1) % colors.length;
	name.style.color = colors[currentColor];
	line.style.borderColor = colors[currentColor];

	// Change subject in focus

	subjects.forEach( subject => {
		subject.style.opacity = '0';
		subject.style.transform = 'translateY(50px)';
	})

	currentSubject = (currentSubject + 1) % subjects.length;
	subjects[currentSubject].style.opacity = '1';
	subjects[currentSubject].style.transform = 'translateY(0)';

	setTimeout( function() {

	}, heroInterval)

}

const projects = [...document.querySelectorAll('.project')];
const singleProjectWrap = document.querySelector('#singleProjectWrap');
const projectWrap = $('.projectWrap');
const body = document.body;
const closeBtn = document.querySelector('#singleProject .closeBtn');

projects.forEach( project => project.addEventListener('click', function(e) {
	let projectName = project.dataset.project
	console.log(projectName);

	projects.forEach( project => project.classList.remove('projectActive'));
	body.classList.add('projectActive');
	singleProjectWrap.style.display = 'block';
	setTimeout( function(){
		singleProjectWrap.style.opacity = '1';
	}, 1)

	loadProject(projectName);

}))

closeBtn.addEventListener('click', function() {
	body.classList.remove('projectActive');
	singleProjectWrap.style.opacity= '0';
	setTimeout( function(){
		singleProjectWrap.scrollTop = 0;
		projectWrap.html('');
		singleProjectWrap.style.display = 'none';
	}, 500)

})



function loadProject(projectName) {
	projectWrap.load( `${projectName}.html` );
}


