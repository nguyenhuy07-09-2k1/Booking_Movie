using Booking_Movie.Data.Abstract;

namespace Booking_Movie.Data.Entities
{
    public class BookingTicket : Switchable
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        public int TicketId { get; set; }
        public int BookingId { get; set; }
        public Ticket Ticket { get; set; } = null!;
        public Booking Booking { get; set; } = null!;
    }
}