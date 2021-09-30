using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Orders
{
    public class CreateOrder
    {
        public class Command : IRequest
        {
            public Order order { get; set; }
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
                _context.orders.Add(request.order);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}