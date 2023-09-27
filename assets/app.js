// Definiendo mi arreglo de películas
let films = [
	{
        file: '../assets/img/posters/paris-texas.png',
        title: 'Paris, Texas', 
        director: 'Wim Wenders',
        year: '1984',
        rating: '4'
    },
    {
        file: '../assets/img/posters/the-handmaiden.png',
        title: 'The Handmaiden', 
        director: 'Park Chan-wook',
        year: '2016',
        rating: '5'
    },
    {
        file: '../assets/img/posters/fallen-angels.png',
        title: 'Fallen Angels', 
        director: 'Kar-Wai Wong',
        year: '1995',
        rating: '5'
    },
    {
        file: '../assets/img/posters/spirited-away.png',
        title: 'Spirited Away', 
        director: 'Hayao Miyazaki',
        year: '2001',
        rating: '5'
    }
];

// MOSTRAR mis películas en la página
function showFilms() {
    const filmsData = document.querySelector('#trackerList');
    filmsData.innerHTML = '';

    films.forEach((film, index) => {
        
        const newCard = document.createElement('div');
        newCard.className = 'col-12 col-sm-6 col-md-4';
        newCard.innerHTML = `
			<div class="card mb-4">

			<div class="btns-container">
			    
				
				<button type="button" class="btn btn-danger delete-button" data-index="${index}">
					<i class="fa-solid fa-circle-xmark"></i>
				</button>

				
				<button type="button" id="editBtn" class="btn btn-secondary edit-button" data-index="${index}" data-bs-toggle="modal" data-bs-target="#addMovieModal">
					<i class="fa-solid fa-pen-to-square"></i>
				</button>

			</div>

			<img src="${film.file}" class="card-img-top custom-card-img" alt="${film.title}">
			<div class="card-body">
				<h5 class="card-title">${film.title}</h5>
				<p class="card-text custom-info">
					<span class="director">${film.director}</span>,
					<span class="year">${film.year}</span>
				</p>
				<p class="card-text">${getStarsFromRating(film.rating)}</p>
			</div>
		</div>
        `;

        filmsData.appendChild(newCard);
    });
}

// CONVERTIR calificación de la pelicula en estrellas
function getStarsFromRating(rating) {
    const totalStars = 5;
    const filledStars = parseInt(rating.charAt(0));
    const emptyStars = totalStars - filledStars;

    const starIcon = '★';
    const emptyStarIcon = '☆';

    const stars = starIcon.repeat(filledStars) + emptyStarIcon.repeat(emptyStars);

    return stars;
}

// Funcion para AGREGAR una PELICULA al ARREGLO
function addFilm(file, title, director, year, rating, editingIndex) {
    if (editingIndex !== null) {
        films[editingIndex] = { file, title, director, year, rating };
    } else {
        films.push({ file, title, director, year, rating });
    }
    showFilms();
}

// FUNCION DE ELIMINAR la PELÍCULA del arreglo
function deleteFilm(index) {
    if (index >= 0 && index < films.length) {
        films.splice(index, 1);
        showFilms();
    }
}

// EVENTO de formulario para AGREGAR una NUEVA película
const addMovieForm = document.querySelector('#movieForm');
addMovieForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = document.querySelector('#inputFile').value;
    const title = document.querySelector('#inputTitle').value;
    const director = document.querySelector('#inputDirector').value;
    const year = document.querySelector('#inputYear').value;
    const rating = document.querySelector('#starsRating').value;


	addFilm(file, title, director, year, rating);

	addMovieForm.reset();

});

// EVENTO para ELIMINAR película
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.getAttribute('data-index');
        deleteFilm(index);
    }
});

// EVENTO de click para abrir modal de edición con los datos de la pelicula a editar
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
        const index = event.target.getAttribute('data-index');
        if (index >= 0 && index < films.length) {
            // Aqui se llenan los campos del form en el modal con datos de la película
            const filmData = films[index];
            
            document.querySelector('#inputFile').value = filmData.file;
            document.querySelector('#inputTitle').value = filmData.title;
            document.querySelector('#inputDirector').value = filmData.director;
            document.querySelector('#inputYear').value = filmData.year;
            document.querySelector('#starsRating').value = filmData.rating;
            
			document.querySelector('.modal-title').textContent = "Editar pelicula";
            document.querySelector('#submitBtnForm').textContent = 'Guardar Cambios';

            // Agrega un atributo personalizado al botón de envío para indicar que se está editando
            document.querySelector('#submitBtnForm').setAttribute('data-editing-index', index);
        }
    }
});

// EVENTO de click para guardar los cambios en el formulario de edición
document.querySelector('#submitBtnForm').addEventListener('click', () => {
    const editingIndex = document.querySelector('#submitBtnForm').getAttribute('data-editing-index');
    
    // Obtengo los valores del formulario
    const file = document.querySelector('#inputFile').value;
    const title = document.querySelector('#inputTitle').value;
    const director = document.querySelector('#inputDirector').value;
    const year = document.querySelector('#inputYear').value;
    const rating = document.querySelector('#starsRating').value;

    // Agrego la película al arreglo o edita la película existente
    addFilm(file, title, director, year, rating, editingIndex);

    // Limpio el formulario y restablece el botón "Guardar" a su estado original
    document.querySelector('#movieForm').reset();
    document.querySelector('#submitBtnForm').textContent = 'Agregar';

    // Vuelvo a mostrar las películas actualizadas
    showFilms();

    // Limpio el atributo personalizado para futuras ediciones
    document.querySelector('#submitBtnForm').removeAttribute('data-editing-index');
});


showFilms();
