using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using Microsoft.AspNetCore.Hosting;

namespace Application.Product
{
    public class Create
    {
        public class Command : IRequest
        {
            public Products product { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
              /*  var prod = request.product;
                if(prod.ImageFile == null){
                    return Unit.Value;
                }
                prod.ImageName = await SaveImage(prod.ImageFile);*/
                _context.products.Add(request.product);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
/*
            private async Task<string> SaveImage(IFormFile imageFile)
            {
                string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
                var imagePath = Path.Combine(@"C:\Users\Estray\Desktop\New folder\E-Commerce\API", "Images", imageName);
                using (var fileStream = new FileStream(imagePath,FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }
                return imageName;
            }*/
        }
    }
}