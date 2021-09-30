using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.UsersOrders
{
    public class CreateUOrder
    {
        public class Command : IRequest
        {
            public UsersOrder order { get; set; }
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
                _context.usersOrders.Add(request.order);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}