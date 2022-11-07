﻿using Booking_Movie.Data.Configurations;
using Booking_Movie.Data.EF;
using Booking_Movie.Data.Entities;
using Booking_Movie.Data.Infrastructure;
using Booking_Movie.Data.Models;
using Booking_Movie.Utilities.Exceptions;
using Booking_Movie.ViewModel.Catalog.ActorVM;
using Booking_Movie.ViewModel.Catalog.MovieVM;
using Booking_Movie.ViewModel.Catalog.ScreeningVM;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Linq.Expressions;

namespace Booking_Movie.Data.Repositories
{
    public interface IMovieRepository : IRepository<Movie>
    {
        Task<IQueryable<MovieDetailsVM>> GetMovieDetails(params Expression<Func<MovieDetailsVM, bool>>[] expressions);
        Task<IQueryable<ScreeningViewModel>> GetScreeningByMovieId(int Id);
        Task<string> GetMovieCast(int Id);
        Task<Movie?> UpdateImageVideo(int Id, string? preview, string? background, string? video);
        
    }
    public class MovieRepository : RepositoryBase<Movie>, IMovieRepository
    {
        public MovieRepository(BookingMovieContext movieContext, IDbFactory dbFactory) : base(movieContext, dbFactory)
        {
        }

        public async Task<IQueryable<MovieDetailsVM>> GetMovieDetails(params Expression<Func<MovieDetailsVM, bool>>[] expressions)
        {
            var query = from m in this.MovieContext.Movies
                        join p in this.MovieContext.Producers on m.ProducerId equals p.ID
                        join n in this.MovieContext.Nationalities on m.NationalityId equals n.Id
                        select new MovieDetailsVM()
                        {
                            directors = (from md in this.MovieContext.MovieDirectors
                                         join d in this.MovieContext.Directors on md.DirectorId equals d.ID
                                         where md.MovieId == m.Id
                                         select d.Name).ToArray(),
                            movie = m,
                            actors = (from c in this.MovieContext.Casts
                                      join a in this.MovieContext.Actors on c.ActorId equals a.ID
                                      where c.MovieId == m.Id
                                      select a.Name).ToArray(),
                            nationality = n.Name,
                            categories = (from mc in this.MovieContext.MovieCategories
                                          join ct in this.MovieContext.Categories on mc.CategoryId equals ct.Id
                                          where mc.MovieId == m.Id
                                          select ct.Name).ToArray()
                        };

            foreach (var expression in expressions)
            {
                query = query.Where(expression);
            }
            ;

            return await Task.FromResult(query);
        }

        public async Task<string> GetMovieCast(int Id)
        {
            var query = await  (from m in MovieContext.Movies
                        join c in MovieContext.Casts on m.Id equals c.MovieId
                        join a in MovieContext.Actors on c.ActorId equals a.ID
                        where m.Id == Id
                        select new { a }).ToListAsync();

            var cast = query.Select(x => String.Join(", ", x.a.Name)).ToString();
            return await Task.Run(() => cast!);
        }

        public async Task<Movie?> UpdateImageVideo(int Id, string? preview, string? background, string? video )
        {
            var movie = await this.MovieContext.Movies.FindAsync(Id);

            if(movie == null) throw new BookingMovieException("cannt find a movie with id: " + Id);
            this.MovieContext.Movies.Attach(movie);

            if (preview != null)
            {
                movie.ImagePreview = preview;
                this.MovieContext.Entry(movie).Property(x=>x.ImagePreview).IsModified = true;
               
            } 
            if (background != null)
            {
                movie.ImageBackground = background;
                this.MovieContext.Entry(movie).Property(x=>x.ImageBackground).IsModified = true;
               
            }
            if(video != null)
            {
                movie.VideoTrailer = video;
                this.MovieContext.Entry(movie).Property(x=>x.VideoTrailer).IsModified = true;
               
            }
            return movie;
        }
        
        public async Task<Movie?> UpdateVideoTrailer(int Id, string video )
        {
            var movie = await this.MovieContext.Movies.FindAsync(Id);

            if(movie == null) throw new BookingMovieException("cannt find a movie with id: " + Id);
            if(video != null)
            {
                movie.VideoTrailer = video;
                this.MovieContext.Movies.Attach(movie);
                this.MovieContext.Entry(movie).Property(x=>x.VideoTrailer).IsModified = true;
                return movie;
            }
            return null;
        }

        public async Task<IQueryable<ScreeningViewModel>> GetScreeningByMovieId(int Id)
        {
            var query =
                       //from m in this.MovieContext.Movies
                       //        join sc in this.MovieContext.Screenings on m.Id equals sc.MovieId
                       //        join st in this.MovieContext.ScreeningTypes on sc.MovieTypeId equals st.Id
                       //        join au in this.MovieContext.Auditoriums on sc.AuditoriumId equals au.Id
                       (from c in this.MovieContext.Cinemas
                        select new ScreeningViewModel()
                        {
                            CinameName = c.Name,
                            ScreeningTypeName = (from m in this.MovieContext.Movies
                                                 join sc in this.MovieContext.Screenings on m.Id equals sc.MovieId
                                                 join st in this.MovieContext.ScreeningTypes on sc.MovieTypeId equals st.Id
                                                 join au in this.MovieContext.Auditoriums on sc.AuditoriumId equals au.Id
                                                 where m.Id == Id && au.CinemaId == c.Id
                                                 select st.Name).FirstOrDefault()!,
                            ShowTime = (from scr in this.MovieContext.Screenings
                                        join au in this.MovieContext.Auditoriums on scr.AuditoriumId equals au.Id
                                        where scr.MovieId == Id && au.CinemaId == c.Id
                                        select scr.ShowTime).ToArray()
                        }).Where(x=>x.ScreeningTypeName != null && x.ShowTime.Length > 0);


            return await Task.FromResult(query);
        }
    }
}