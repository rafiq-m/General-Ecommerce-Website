using System.Collections.Generic;
using System.Threading.Tasks;
using Application.UsersOrders;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersOrderController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateOrder(UsersOrder order){
            return Ok(await Mediator.Send(new CreateUOrder.Command {order = order}));
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<List<UsersOrder>>> GetUOrders(string email)
        {
            return await Mediator.Send(new ListUOrderByEmail.Query{Email = email});
        }
    }
}