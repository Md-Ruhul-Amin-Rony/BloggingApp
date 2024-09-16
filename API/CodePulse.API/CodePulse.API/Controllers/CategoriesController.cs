using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Reposotiries.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoriesController(ICategoryRepository categoryRepository)
        {

            _categoryRepository = categoryRepository;

        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {
            //Map DTO  to domain model

            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };

            await _categoryRepository.CreateAsync(category);

            //Domain model to dto

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);

        }
        //GET:/api/categories
        [HttpGet]
        public async Task<IActionResult> GetAllCategories([FromQuery] string? query)
        {
            var categories = await _categoryRepository.GetAllAsync(query);

            var response = new List<CategoryDto>();
            foreach (var category in categories)
            {
                response.Add(new CategoryDto {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }
            return Ok(response);
        }
        //GET: https://localhost:7226/api/categories/{id}
        //[HttpGet]
        //[Route("{id:Guid}")]
        //public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        //{
        //    var existingCategory = await _categoryRepository.GetById(id);
        //    if (existingCategory is null)
        //    {
        //        return NotFound();
        //    }
        //    var response = new CategoryDto
        //    {
        //        Id = existingCategory.Id,
        //        Name = existingCategory.Name,
        //        UrlHandle = existingCategory.UrlHandle,

        //    };
        //    return Ok(response);
        //} 
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var exisitingCategory = await _categoryRepository.GetById(id);
            if (exisitingCategory == null) {
                return NotFound();
            }
            var response = new CategoryDto
            {
                Id = exisitingCategory.Id,
                Name = exisitingCategory.Name,
                UrlHandle = exisitingCategory.UrlHandle

            };
            return Ok(response);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> EditCategory([FromRoute]Guid id, UpdateCategoryRequestDto request)
        {
            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };
            category = await _categoryRepository.UpdateAsync(category);
            if (category == null)
            {
                return NotFound();
            }
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };
            return Ok(response);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteCategory([FromRoute]Guid id)
        {
           var category= await _categoryRepository.DeleteAsync(id);
            if (category == null) {  return NotFound(); }

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }
    }
}

