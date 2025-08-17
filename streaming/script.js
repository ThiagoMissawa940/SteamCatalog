// TMDB API Configuration
const API_KEY = 'SUA_CHAVE_API_AQUI'; // Substitua pela sua chave da API do TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

// Global Variables
let currentPage = 1;
let currentFilter = 'popular';
let currentGenre = '';
let currentYear = '';
let isLoading = false;
let genres = [];

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const genreSelect = document.getElementById('genreSelect');
const yearSelect = document.getElementById('yearSelect');
const movieModal = document.getElementById('movieModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const recentGrid = document.getElementById('recentGrid');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Check if API key is set
    if (API_KEY === 'SUA_CHAVE_API_AQUI') {
        showApiKeyMessage();
        return;
    }
    
    initializeApp();
});

function showApiKeyMessage() {
    moviesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <h3 style="color: #e50914; margin-bottom: 1rem;">🔑 Configuração Necessária</h3>
            <p style="margin-bottom: 1rem;">Para usar este site, você precisa de uma chave da API do TMDB.</p>
            <p style="margin-bottom: 1rem;">Siga estes passos:</p>
            <ol style="text-align: left; max-width: 500px; margin: 0 auto;">
                <li>Acesse <a href="https://www.themoviedb.org/" target="_blank" style="color: #e50914;">themoviedb.org</a></li>
                <li>Crie uma conta gratuita</li>
                <li>Vá em Configurações > API</li>
                <li>Solicite uma chave de API</li>
                <li>Substitua 'SUA_CHAVE_API_AQUI' no arquivo script.js pela sua chave</li>
            </ol>
        </div>
    `;
    loading.style.display = 'none';
}

async function initializeApp() {
    try {
        await loadGenres();
        populateYearSelect();
        await loadMovies();
        await loadRecentReleases();
        setupEventListeners();
    } catch (error) {
        console.error('Erro ao inicializar app:', error);
        showError('Erro ao carregar dados. Verifique sua conexão com a internet.');
    }
}

function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            resetAndLoadMovies();
        });
    });
    
    // Genre and year selects
    genreSelect.addEventListener('change', function() {
        currentGenre = this.value;
        resetAndLoadMovies();
    });
    
    yearSelect.addEventListener('change', function() {
        currentYear = this.value;
        resetAndLoadMovies();
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreMovies);
    
    // Modal functionality
    closeModal.addEventListener('click', closeMovieModal);
    window.addEventListener('click', function(e) {
        if (e.target === movieModal) {
            closeMovieModal();
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

async function loadGenres() {
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`);
        const data = await response.json();
        genres = data.genres;
        
        genreSelect.innerHTML = '<option value="">Todos os Gêneros</option>';
        genres.forEach(genre => {
            genreSelect.innerHTML += `<option value="${genre.id}">${genre.name}</option>`;
        });
    } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
    }
}

function populateYearSelect() {
    const currentYear = new Date().getFullYear();
    yearSelect.innerHTML = '<option value="">Todos os Anos</option>';
    
    for (let year = currentYear; year >= 1970; year--) {
        yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
    }
}

async function loadMovies(page = 1) {
    if (isLoading) return;
    
    isLoading = true;
    if (page === 1) {
        loading.style.display = 'block';
        moviesGrid.innerHTML = '';
    }
    
    try {
        let url;
        
        if (searchInput.value.trim()) {
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&page=${page}&query=${encodeURIComponent(searchInput.value.trim())}`;
        } else {
            url = `${BASE_URL}/movie/${currentFilter}?api_key=${API_KEY}&language=pt-BR&page=${page}`;
            
            if (currentGenre) {
                url += `&with_genres=${currentGenre}`;
            }
            if (currentYear) {
                url += `&year=${currentYear}`;
            }
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayMovies(data.results, page > 1);
            
            if (data.page < data.total_pages) {
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
            }
        } else {
            if (page === 1) {
                showNoResults();
            }
            loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
        showError('Erro ao carregar filmes. Tente novamente.');
    } finally {
        isLoading = false;
        loading.style.display = 'none';
    }
}

function displayMovies(movies, append = false) {
    if (!append) {
        moviesGrid.innerHTML = '';
    }
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesGrid.appendChild(movieCard);
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card fade-in';
    movieCard.onclick = () => openMovieModal(movie.id);
    
    const posterUrl = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}` 
        : 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"><rect width="300" height="450" fill="%23333"/><text x="150" y="225" text-anchor="middle" fill="%23666" font-size="20">Sem Imagem</text></svg>';
    
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    movieCard.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title}" class="movie-poster" loading="lazy">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-year">${releaseYear}</p>
            <div class="movie-rating">
                <i class="fas fa-star"></i>
                <span>${rating}</span>
            </div>
            <p class="movie-overview">${movie.overview || 'Sinopse não disponível.'}</p>
        </div>
    `;
    
    return movieCard;
}

async function loadRecentReleases() {
    try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            displayRecentReleases(data.results.slice(0, 8));
        }
    } catch (error) {
        console.error('Erro ao carregar lançamentos recentes:', error);
    }
}

function displayRecentReleases(movies) {
    recentGrid.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieCard.classList.add('slide-up');
        recentGrid.appendChild(movieCard);
    });
}

async function openMovieModal(movieId) {
    try {
        const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
            fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`),
            fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=pt-BR`),
            fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=pt-BR`)
        ]);
        
        const movie = await movieResponse.json();
        const credits = await creditsResponse.json();
        const videos = await videosResponse.json();
        
        displayMovieModal(movie, credits, videos);
        movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Erro ao carregar detalhes do filme:', error);
        alert('Erro ao carregar detalhes do filme.');
    }
}

function displayMovieModal(movie, credits, videos) {
    const backdropUrl = movie.backdrop_path 
        ? `${BACKDROP_BASE_URL}${movie.backdrop_path}` 
        : '';
    
    const posterUrl = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}` 
        : '';
    
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A';
    
    const director = credits.crew ? credits.crew.find(person => person.job === 'Director') : null;
    const cast = credits.cast ? credits.cast.slice(0, 5).map(actor => actor.name).join(', ') : 'N/A';
    
    const trailer = videos.results ? videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube') : null;
    
    modalBody.innerHTML = `
        <div style="position: relative; margin-bottom: 2rem;">
            ${backdropUrl ? `<img src="${backdropUrl}" alt="${movie.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px;">` : ''}
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 2rem; border-radius: 0 0 10px 10px;">
                <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: #ffffff;">${movie.title}</h2>
                <p style="font-size: 1.2rem; opacity: 0.9;">${movie.tagline || ''}</p>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 200px 1fr; gap: 2rem; margin-bottom: 2rem;">
            ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}" style="width: 100%; border-radius: 10px;">` : '<div style="width: 200px; height: 300px; background: #333; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #666;">Sem Poster</div>'}
            
            <div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                    <div>
                        <strong style="color: #e50914;">Ano:</strong><br>
                        ${releaseYear}
                    </div>
                    <div>
                        <strong style="color: #e50914;">Duração:</strong><br>
                        ${runtime}
                    </div>
                    <div>
                        <strong style="color: #e50914;">Avaliação:</strong><br>
                        <i class="fas fa-star" style="color: #ffd700;"></i> ${rating}
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <strong style="color: #e50914;">Gêneros:</strong><br>
                    ${genres}
                </div>
                
                ${director ? `
                <div style="margin-bottom: 1.5rem;">
                    <strong style="color: #e50914;">Diretor:</strong><br>
                    ${director.name}
                </div>
                ` : ''}
                
                <div style="margin-bottom: 1.5rem;">
                    <strong style="color: #e50914;">Elenco Principal:</strong><br>
                    ${cast}
                </div>
                
                ${trailer ? `
                <div style="margin-bottom: 1.5rem;">
                    <a href="https://www.youtube.com/watch?v=${trailer.key}" target="_blank" style="background: #e50914; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block;">
                        <i class="fas fa-play"></i> Assistir Trailer
                    </a>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div>
            <strong style="color: #e50914; font-size: 1.2rem;">Sinopse:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">${movie.overview || 'Sinopse não disponível.'}</p>
        </div>
    `;
}

function closeMovieModal() {
    movieModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        resetAndLoadMovies();
    }
}

function resetAndLoadMovies() {
    currentPage = 1;
    loadMovies(1);
}

function loadMoreMovies() {
    currentPage++;
    loadMovies(currentPage);
}

function showNoResults() {
    moviesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <i class="fas fa-search" style="font-size: 3rem; color: #e50914; margin-bottom: 1rem;"></i>
            <h3 style="color: #e50914; margin-bottom: 1rem;">Nenhum resultado encontrado</h3>
            <p>Tente ajustar os filtros ou usar termos de busca diferentes.</p>
        </div>
    `;
}

function showError(message) {
    moviesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e50914; margin-bottom: 1rem;"></i>
            <h3 style="color: #e50914; margin-bottom: 1rem;">Erro</h3>
            <p>${message}</p>
        </div>
    `;
    loading.style.display = 'none';
}

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.className = 'scroll-to-top';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #e50914;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
            `;
            
            scrollBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            scrollBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            scrollBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    // This will be used for future lazy loading implementation
    window.imageObserver = imageObserver;
}