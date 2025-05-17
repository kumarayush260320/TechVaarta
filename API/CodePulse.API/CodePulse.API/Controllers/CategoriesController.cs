using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    /// <summary>
    /// https://localhost:xxxx/api/categories
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;
        public CategoriesController(ICategoryRepository categoryRepository)
        {
            //we will use repository instead of dbcontext
            this.categoryRepository = categoryRepository;
        }


        [HttpPost]
       // [Authorize(Roles = "Writer")]//even if we have a valid token we cant see categories as only writer can view this
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDTO request)
        {
            //Map DTO to domain model
            var category = new Category
            {
                Name = request.Name,
                UrlHandlen = request.UrlHandlen
            };
            await categoryRepository.CreateAsync(category);//implementation fn of repository

            //domain model to dto
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandlen = category.UrlHandlen
            };
            return Ok(response);
        }


        //we are adding this FromQuery for filtering the page purpose
        //GET : https://localhost:7203/api/categories/query=html&sortBy
        [HttpGet]
        public async Task<IActionResult> GetAllCategories(
            [FromQuery] string? query,
            [FromQuery] string? sortBy,
            [FromQuery] string? sortDirection,
            [FromQuery] int? pageNumber,
            [FromQuery] int? pageSize)
        {
            var categories = await categoryRepository.
                GetAllAsync(query,sortBy,sortDirection,pageNumber,pageSize);
            //map domain model to dto
            var response = new List<CategoryDto>();
            foreach (var category in categories)
            {
                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandlen = category.UrlHandlen
                });
            }
            return Ok(response);
        }

        //GET : https://localhost:7203/api/categories/count
        [HttpGet]
        [Route("count")]
        // [Authorize(Roles = "Writer")]
        public async Task<IActionResult> GetCategoriesTotal()
        {
            var count = await categoryRepository.GetCount();
            return Ok(count);
        }



        //GET : https://localhost:7203/api/categories/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var existingCategory = await categoryRepository.GetById(id);
            if (existingCategory is null)
            {
                return NotFound();
            }
            var response = new CategoryDto
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandlen = existingCategory.UrlHandlen
            };
            return Ok(response);
        }




        //PUT:https://localhost:7203/api/categories/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> EditCategory([FromRoute] Guid id, UpdateCategoryRequestDto request)
        {
            //Convert DTO to domain model
            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandlen = request.UrlHandlen
            };
            category = await categoryRepository.UpdateAsync(category);
            if (category == null)
            {
                return NotFound();
            }
            //Convert domain model to DTO
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandlen = category.UrlHandlen

            };
            return Ok(response);
        }




        //DELETE: https://localhost:7203/api/categories/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            var category = await categoryRepository.DeleteAsync(id);
            if (category is null)
            {
                return NotFound();
            }
            //Convert Domain to DTO
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandlen = category.UrlHandlen
            };
            return Ok(response);
        }
    }
}
