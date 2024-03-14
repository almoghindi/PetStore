using Microsoft.EntityFrameworkCore;
using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Data
{
    public class PetStoreContext : DbContext
    {
        public PetStoreContext(DbContextOptions<PetStoreContext> options) : base(options)
        {

        }

        public DbSet<Product>? Products { get; set; }

        public DbSet<Category>? Categories { get; set; }

        public DbSet<Comment>? Comments { get; set; }

        public DbSet<Order>? Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "Dogs" },
                new Category { CategoryId = 2, Name = "Cats" },
                new Category { CategoryId = 3, Name = "Fish" },
                new Category { CategoryId = 4, Name = "Reptiles" },
                new Category { CategoryId = 5, Name = "Rodents" },
                new Category { CategoryId = 6, Name = "Birds" }
            );

        }

    }
}
