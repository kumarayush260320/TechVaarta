using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {


        Task<BlogPost> CreateAsync(BlogPost blogPost);
        Task<IEnumerable<BlogPost>> GetAllAsync();//list will be genrated so IEnureable
        
        Task<BlogPost?>GetByIdAsync(Guid id);//get a blog post by id
        Task<BlogPost?> GetByUrlHandleAsync(string urlHandle);//get a blog post by url handle

        Task<BlogPost?> UpdateAsync(BlogPost blogPost);

        Task<BlogPost?> DeleteAsync(Guid id);

    }

}
