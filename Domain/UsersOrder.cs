using System;

namespace Domain
{
    public class UsersOrder
    {
        public int Id { get; set; }
        public Guid PId { get; set; }
        public int Quantity { get; set; }
        public string Email { get; set; }
    }
}