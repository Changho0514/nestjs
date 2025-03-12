import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class MovieService {

    constructor(
      @InjectRepository(Movie)
      private readonly movieRepository: Repository<Movie>
    ) {}
  
    private idCounter = 3;
    
    getManyMovies(title?: string){
      /// 나중에 title 필터 기능 추가하기
      return this.movieRepository.find();
    }
  
    async getMovieById(id: number){
      const movie = await this.movieRepository.findOne({
        where: {
          id,
        }
      });

      if (!movie){
        throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
      } 
      return movie;
    }
  
    async createMovie(createMovieDto: CreateMovieDto){
      const movie = await this.movieRepository.save(createMovieDto);

      return movie;
    }
  
    async updateMovie(id: number, updateMovieDto: UpdateMovieDto){
      const movie = this.movieRepository.findOne({
        where: {
          id,
        }
      })
  
      if (!movie){
        throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
      }
      
      const newMovie = await this.movieRepository.update(
        { id },
        updateMovieDto
      )

      return newMovie;
    }

    async deleteMovie(id: number){
      const movie = await this.movieRepository.findOne({
        where: {
          id,
        }
      });
  
      if (!movie){
        throw new NotFoundException('존재하지 않는 ID 값의 영화입니다.');
      }
      
      await this.movieRepository.delete({ id });
  
      return id;
  
    }
}
