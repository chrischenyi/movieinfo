$(document).ready(() => {
   $('#searchForm').on('submit',(e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
   });
});

function getMovies(searchText) {
   axios.get('https://api.themoviedb.org/3/search/movie?api_key=97c793cade9db48d1cdcaef0e181ee87&language=en-US&query=' + searchText + '&page=1&include_adult=false')
   .then ((response) => {
     console.log(response)
     let movies = response.data.results;
     let output = '';
     $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                <h6>${movie.title}</h5>
                <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          `;
        });
     $('#movies').html(output);

     })
   .catch ((err) => {
        console.log(err);
   });
}
function movieSelected(id){
     sessionStorage.setItem('id', id);
     console.log(id);
     window.location = 'movie.html';         // set the current location to redirected page
     return false;
}

function getMovie(){
     let movieId = sessionStorage.getItem('id');
     axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=97c793cade9db48d1cdcaef0e181ee87&language=en-US')
     .then ((response) => {
          console.log(response)
          let movie = response.data;

          let output = `
               <div class="row">
                    <div class="col-md-4">
                         <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="thumbnail">                    
                    </div>

                    <div class="col-md-8">
                         <h2>${movie.title}</h2>
                         <ul class="list-group">
                              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}</li>
                              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                              <li class="list-group-item"><strong>Vote Count:</strong> ${movie.vote_count}</li>
                         </ul>
                    </div>
               </div>

               <div class="row">
                    <div class="well">
                         <h3>plot</h3>
                         ${movie.overview}
                    </div> 
                    <a href="https://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back To Search</a>
               </div> 
               <hr>
          `;
          $('#movie').html(output); // Under a selected movie
     })
     .catch ((err) => {
          console.log(err);
     });
  }
