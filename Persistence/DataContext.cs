using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Products> products { get; set; }

        public DbSet<Category> categories { get; set; }

        public DbSet<Order> orders { get; set; }

        public DbSet<OrderDetails> orderDetails { get; set; }

        public DbSet<UsersOrder> usersOrders { get; set; }
    }
}