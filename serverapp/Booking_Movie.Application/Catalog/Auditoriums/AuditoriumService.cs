﻿using AutoMapper;
using Booking_Movie.Application.Common;
using Booking_Movie.Data.Infrastructure;
using Booking_Movie.Data.Repositories;
using Booking_Movie.ViewModel.Catalog.SeatVM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking_Movie.Application.Catalog.Auditoriums
{
    public class AuditoriumService : IAuditoriumService
    {
        private readonly AuditoriumRepository _auditoriumRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AuditoriumService(AuditoriumRepository auditoriumRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _auditoriumRepository = auditoriumRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<SeatViewModel>?> GetSeatByAuditoriumId(int id)
        {
            var query = await _auditoriumRepository.GetSeatsByAuditoriumId(id);

            try
            {
                if(query.Count() > 0)
                {
                    return await query.ToListAsync();
                }
                return null;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
