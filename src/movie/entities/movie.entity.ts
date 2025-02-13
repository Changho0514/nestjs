import { Exclude, Expose, Transform } from "class-transformer";


export class Movie {
  id : number;    
  title: string;

  // @Exclude()
  @Transform(({ value }) => value.toUpperCase())
  genre: string;
}
