using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Product
{
    public class List
    {
        public class Query : IRequest<List<getListDTO>>
        {

        }

        public class Handler : IRequestHandler<Query, List<getListDTO>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<getListDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                //return await _context.products.Select(x => new getListDTO() {Id = x.Id.ToString(), Name = x.Name, Price = x.Price}).ToListAsync();

                return await _context.products.Include(x => x.Categories).Select(x => new getListDTO() {Id = x.Id.ToString(), Name = x.Name, Price = x.Price, categoryId = x.Categories.Id.ToString(),
                categoryName = x.Categories.Name, Description = x.Categories.Description, quantity = x.stockQuantity, image = x.ImagePath}).ToListAsync();
            }
        }
    }
}