using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.OrderDetails
{
    public class CreateOrderDetails
    {
        public class Command : IRequest
        {
            public Domain.OrderDetails orderDetails { get; set; }
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
                _context.orderDetails.Add(request.orderDetails);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}