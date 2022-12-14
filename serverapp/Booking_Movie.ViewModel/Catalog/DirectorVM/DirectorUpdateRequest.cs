using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Booking_Movie.ViewModel.Catalog.DirectorVM
{
    public class DirectorUpdateRequest
    {
        public string Name { get; set; } = null!;
        public string NationalityId { get; set; } = null!;
        public float Height { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public IFormFile? Image { get; set; }
    }
}
