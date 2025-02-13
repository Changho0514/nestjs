import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
@UseInterceptors(ClassSerializerInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getMovies(
    @Query('title') title?: string, 
  ) {
    return this.movieService.getManyMovies(title)
  }

  @Get(":id")
  getMovie(@Param('id') id: number){
    return this.movieService.getMovieById(id);
  }

  @Post()
  postMovie(
    @Body() createMovieDto: CreateMovieDto
  ){
    return this.movieService.createMovie(createMovieDto);
  }

  @Patch(":id")
  patchMovie(
    @Param('id') id : string,
    @Body() updateMovieDto: UpdateMovieDto
  ){
    return this.movieService.updateMovie(+id, updateMovieDto);
  }

  @Delete(":id")
  deleteMovie(
    @Param('id') id : string
  ){
    return this.movieService.deleteMovie(+id);
  }
}
