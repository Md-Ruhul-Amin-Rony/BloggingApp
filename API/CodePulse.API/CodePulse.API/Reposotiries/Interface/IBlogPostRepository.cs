using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;

namespace CodePulse.API.Reposotiries.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> CreateAsyc(BlogPost blogPost);
        Task<IEnumerable<BlogPost>> GetAllAync();
        Task<BlogPost?> GetById(Guid id);
        Task<BlogPost?>UpdateAsync(BlogPost blogPost);
        Task<BlogPost?> DeleteAsync(Guid id);
    }
}
