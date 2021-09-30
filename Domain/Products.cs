using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Domain
{
    public class Products
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Category Categories { get; set; }
        public int Price { get; set; }
        public int stockQuantity { get; set; }
        public Guid CategoriesId { get; set; }
        public string ImagePath { get; set; }
    }
}