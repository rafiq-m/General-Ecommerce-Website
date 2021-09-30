using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Orders;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Product
{
    public class UpdateQuantity
    {
        public class Command : IRequest
        {
            public List<stockUpdateDTO> product { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
           // private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
               // _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                foreach(var prod in request.product){
                    var productUpdate = await _context.products.FindAsync(prod.Id);
                    //Condition aegi
                    productUpdate.stockQuantity = productUpdate.stockQuantity - prod.stockQuantity;
                }
                //Orders create hoga yahan 
                //return Ok(await Mediator.Send(new Create.Command {product = product}));
             /*   await Mediator.Send(new CreateOrder.Command {order = new Order {
                    Date = DateTime.Now,
                    CustomerId = Guid.Parse("1da6a65b-e313-4387-a1b8-fc900b802379")
                }});
*/
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
 
    }
}