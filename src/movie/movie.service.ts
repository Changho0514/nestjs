import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

export interface Movie {
  id : number;
  title: string;
  genre: string;
}

@Injectable()
export class MovieService {
  
    private movies: Movie[] = [
      {
        id : 1,
        title : '해리포터',
        genre : '판타지',
      },
      {
        id : 2,
        title : '반지의 제왕',
        genre : '판타지',
      }
    ];
  
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
