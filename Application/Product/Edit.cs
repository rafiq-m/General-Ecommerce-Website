using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Product
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Products product { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var productUpdate = await _context.products.FindAsync(request.product.Id);

                _mapper.Map(request.product, productUpdate);
                
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}