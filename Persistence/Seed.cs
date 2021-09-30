using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager){
            if(!userManager.Users.Any()){
                var users = new List<AppUser>{
                    new AppUser
                    {
                        Name = "Rafiq",
                        Address = "UBIT",
                        Email = "rafiq@test.com",
                        UserName = "Rafiq"
                    },
                    new AppUser
                    {
                        Name = "Okasha",
                        Address = "UBIT",
                        Email = "okasha@test.com",
                        UserName = "Okasha"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if(context.products.Any()) return;

            var listOfCategories = new List<Category>
            {
                new Category 
                { 
                    Name = "HP Spectre x360",
                    Description = "HP Spectre family is some of the finest laptops you can find in the market. They are powerful, yet designed to be lightweight and stylish. HP Spectre x360 offers four operation modes with its 360 degree hinge. With Windows Ink, you can write, draw, sketch, mark and capture anything on the screen with your digital pen",
                },
                new Category 
                { 
                    Name = "HP OMEN",
                    Description = "Take on the competition anytime, anywhere with the high-performance HP Omen Notebook. Dominate your opponents with stunning graphics, lightning-fast processing, immersive sound, and customizable features, Blow away even the most demanding games with the power of an Intel® Quad Core i7™ processor.",
                },
                new Category 
                { 
                    Name = "HP Probook",
                    Description = "The Probook is a series of Hewlett Packard, or HP, laptop computers primarily designed for business users as an inexpensive alternative to the higher powered HP Elitebook series. The Probook was first introduced in 2009."
                }
            };

            await context.categories.AddRangeAsync(listOfCategories);

            var listOfProducts = new List<Products>
            {
                new Products
                {
                    Name = "HP SPECTRE X360 CONVERTIBLE LAPTOP - 15T-EB100 TOUCH",
                    Categories = listOfCategories[0],
                    Price = 10500,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgL3Duin1E8HZ8OXk9PmAKT2XP4N6lWqCwg&usqp=CAU"
                },
                new Products
                {
                    Name = "HP ProBook x360 435 G8 Notebook PC",
                    Categories = listOfCategories[2],
                    Price = 6500,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTbooMq6_OR9QLK5qHcbfhvGBYB8clt8Rg_Q&usqp=CAU"
                },
                new Products
                {
                    Name = "HP SPECTRE X360 CONVERTIBLE LAPTOP - 13T-AW200 TOUCH",
                    Categories = listOfCategories[0],
                    Price = 7800,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTpamTo28KR4ITYMoKCBtNJgDBGNfQc0I3Ww&usqp=CAU"
                },
                new Products
                {
                    Name = "OMEN Laptop - 16t-b000",
                    Categories = listOfCategories[1],
                    Price = 15000,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ0ijTCsVdExx0cQY3Qx3rwK25zNxmddcNcA&usqp=CAU"
                },
                new Products
                {
                    Name = "HP SPECTRE X360 CONVERTIBLE LAPTOP - 13T TOUCH",
                    Categories = listOfCategories[0],
                    Price = 9500,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnoeI1UgiT3bTTzw6G-BCYfZ9QLR8ppUH9g&usqp=CAU"
                },
                new Products
                {
                    Name = "OMEN Laptop 15z-en100",
                    Categories = listOfCategories[1],
                    Price = 13500,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIaB345xUIQmOTnwTAqRGZkyJIqqgtNO2K7g&usqp=CAU"
                },
                new Products
                {
                    Name = "HP ProBook x360 11 G7 Education Edition",
                    Categories = listOfCategories[2],
                    Price = 13000,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Es9RiuWpfA-Y1AGTq7Cr9cs273Mjmd-zEg&usqp=CAU"
                },
                new Products
                {
                    Name = "OMEN Laptop 17t-ck000",
                    Categories = listOfCategories[1],
                    Price = 15000,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxhKGMJB6pIoU1N2WfEnkS58zCNDzJ7wfyoQ&usqp=CAU"
                },
                new Products
                {
                    Name = "HP ProBook 455 G8 Notebook PC - Customizable",
                    Categories = listOfCategories[2],
                    Price = 20000,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqfzLmC4Rg0UE_nfCHAW3plVHctLmNjKLhtA&usqp=CAU"
                },
                new Products
                {
                    Name = "HP ProBook x360 11 G6 EE Notebook PC - Customizable",
                    Categories = listOfCategories[2],
                    Price = 18000,
                    stockQuantity = 20,
                    ImagePath = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFQWfPGmBPrNYuJt6146MXjAj1B2DtOLozqg&usqp=CAU"
                },       
            };

            await context.products.AddRangeAsync(listOfProducts);
            await context.SaveChangesAsync();
        }
    }
}