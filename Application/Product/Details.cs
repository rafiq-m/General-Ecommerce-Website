using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Product
{
    public class Details
    {
        public class Query : IRequest<Products>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Products>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Products> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.products.FindAsync(request.Id);
            }
        }

    }
}