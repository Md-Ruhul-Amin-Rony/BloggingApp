using CodePulse.API.Models.Domain;

namespace CodePulse.API.Reposotiries.Interface
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
        Task<IEnumerable<Category>>GetAllAsync(string? query);

        //Task<Category?>GetById(Guid id);
        Task<Category?> GetById(Guid id);

        Task<Category?>UpdateAsync(Category category);
        Task<Category?> DeleteAsync(Guid id);
    }
}
