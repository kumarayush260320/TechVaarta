
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImageRepository imageRepository;
        public ImagesController(IImageRepository imageRepository)
        {
            this.imageRepository=imageRepository;
        
        }
        //POST:{apibaseurl}/api/images
        [HttpPost]
        /* public async Task<IActionResult> UploadImage([FromForm] IFormFile file,
         [FromForm] string fileName,[FromForm] string title)
        // public async Task<IActionResult> UploadImage([FromForm] UploadImageRequest request)
         {
             ValidateFileUpload(file);

             if (ModelState.IsValid)
             {
                 //File UPoad
                 var blogImage = new BlogImage
                 {
                     FileExtension = Path.GetExtension(file.FileName).ToLower(),
                     FileName = fileName,
                     Title = title,
                     DateCreated = DateTime.Now

                 };
               blogImage = await imageRepository.Upload(file, blogImage);*/
        public async Task<IActionResult> UploadImage([FromForm] UploadImageRequest request)
        {
            ValidateFileUpload(request.File);

            if (ModelState.IsValid)
            {
                var blogImage = new BlogImage
                {
                    FileExtension = Path.GetExtension(request.File.FileName).ToLower(),
                    FileName = request.FileName,
                    Title = request.Title,
                    DateCreated = DateTime.Now
                };
              
                blogImage = await imageRepository.Upload(request.File, blogImage);
                //DOMAIN TO DTO
                var response = new BlogImageDto
                {
                    Id =blogImage.Id,
                     FileName = blogImage.FileName, 
                     Title =blogImage.Title,
                    FileExtension=blogImage.FileExtension,  
                    Url =blogImage.Url,
                    DateCreated = blogImage.DateCreated
        
    };
                return Ok(response);
            }


            return BadRequest(ModelState);
        }
        private void ValidateFileUpload(IFormFile file)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };
            if (!allowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format");
            }
            if (file.Length > 10485760)//10 mb
            {
                ModelState.AddModelError("file", "File size cannot be greater than 10MB");
            }
        }


        //GET:{apibaseurl/api/images
        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            //call image repository to get all images 
            var images = await imageRepository.GetAll();

            //convert Domain to DTO
            var response = new List<BlogImageDto>();
            foreach (var image in images)
            {
                response.Add(new BlogImageDto
                {
                    Id = image.Id,
                    FileName = image.FileName,
                    Title = image.Title,
                    FileExtension = image.FileExtension,
                    Url = image.Url,
                    DateCreated = image.DateCreated
                });
            }
            return Ok(response);
        }
    }
}
