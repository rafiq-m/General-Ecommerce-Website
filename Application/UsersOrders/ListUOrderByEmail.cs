using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UsersOrders
{
    public class ListUOrderByEmail
    {
        public class Query : IRequest<List<UsersOrder>>
        {
            public string Email { get; set; }
        }
        public class Handler : IRequestHandler<Query, List<UsersOrder>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UsersOrder>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.usersOrders.Where(x => x.Email == request.Email).ToListAsync();
               //return _context.usersOrders.SingleOrDefault(x => x.Email == request.Email);
            }
        }
    }
}