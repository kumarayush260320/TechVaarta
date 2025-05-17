using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);//Creates new category object


        Task<IEnumerable<Category>> GetAllAsync(string? query=null,
            string? sortBy=null,
            string? sortDirection=null,
            int? pageNymber=1,
            int? pageSize=100);//list of categories are returned


        Task<Category?> GetById(Guid id);//get category by id
        Task<Category?> UpdateAsync(Category category);// update a category by id and , if not found so we put ?
        Task<Category?> DeleteAsync(Guid id);

        Task<int> GetCount();
    }
}
