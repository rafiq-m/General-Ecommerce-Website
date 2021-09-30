using System;

namespace Domain
{
    public class Order
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public Guid CustomerId { get; set; }
    }
}