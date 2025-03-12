import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';


@Injectable()
export class MovieService {
  
    private movies: Movie[] = [];

    constructor() {
      const movie1 = new Movie();

      movie1.id = 1;
      movie1.title = '해리포터';
      movie1.genre = '판타지';

      const movie2 = new Movie();
      movie2.id = 2;
      movie2.title = '반지의 제왕';
      movie2.genre = '판타지';

      this.movies.push(movie1, movie2);
    }
  
    private idCounter = 3;
    
    getManyMovies(title?: string){
      if(!title){
        return this.movies;
      }
      return this.movies.filter((m) => m.title.includes(title));
    }
  
    getMovieById(id: number){
      const movie = this.movies.find((m) => m.id === + id);
  
      if (!movie){
        throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
      }
  
      return movie;
    }
  
    createMovie(createMovieDto: CreateMovieDto){
      const movie: Movie= {
        id: this.idCounter,
        ...createMovieDto,
        createdAt: new Date(), 
        updatedAt: new Date(),
        version: 1
      }
      this.movies.push(movie);

      return movie;
    }
  
    updateMovie(id: number, updateMovieDto: UpdateMovieDto){
      const movie = this.movies.find((m) => m.id === +id);
  
      if (!movie){
        throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
      }
      // 스프레드 연산자 사용
      const updatedMovie = {
        ...movie,
        ...updateMovieDto
      };
      
      // movies 배열의 해당 영화 정보 업데이트
      const movieIndex = this.movies.findIndex((m) => m.id === +id);
      this.movies[movieIndex] = updatedMovie;

      return updatedMovie;
    }

    deleteMovie(id: number){
      const movieIndex = this.movies.findIndex((m) => m.id === +id);
  
      if (movieIndex === -1){
        throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
      }
      
      this.movies.splice(movieIndex, 1)
  
      return
  
    }
}
