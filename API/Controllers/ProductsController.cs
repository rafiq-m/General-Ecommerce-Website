using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Product;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        //[AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<getListDTO>>> GetProducts() 
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
        //[AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateProduct(Products product){
            return Ok(await Mediator.Send(new Create.Command {product = product}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(Guid id, Products product){
            product.Id = id;
            return Ok(await Mediator.Send(new Edit.Command {product = product}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id){
            return Ok(await Mediator.Send(new Delete.Command {Id = id}));
        }
        [HttpPost("updateStock")]
        public async Task<IActionResult> UpdateStock(List<stockUpdateDTO> products){
            //product.Id = id;
            return Ok(await Mediator.Send(new UpdateQuantity.Command {product = products}));
        }
    }
}