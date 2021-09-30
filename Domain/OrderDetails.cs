using System;

namespace Domain
{
    public class OrderDetails
    {
        public Guid Id { get; set; }

        public int OrderId { get; set; }

        public Guid ProductId { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public Order Order { get; set; }

        public Products Product { get; set; }
    }
}