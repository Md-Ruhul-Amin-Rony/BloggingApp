using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Reposotiries.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Reposotiries.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
            
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
           return category;
        }

        public async Task<Category> DeleteAsync(Guid id)
        {
            var deleteCategory=await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if (deleteCategory  is null) {
                return null;
            }
            _context.Categories.Remove(deleteCategory);
            await _context.SaveChangesAsync();
            return deleteCategory;
        }

        public async Task<IEnumerable<Category>> GetAllAsync(string? query=null)
        {
            //Query
            var categories = _context.Categories.AsQueryable();
            //Filtering
            if (string.IsNullOrWhiteSpace(query)==false)
            {
                categories = categories.Where(x => x.Name.Contains(query));
            }


            //Sorting


            //Pagination

           return await categories.ToListAsync();
        }

        public async Task<Category> GetById(Guid id)
        {
           return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category> UpdateAsync(Category category)
        {
           var existingCategory = await _context.Categories.FirstOrDefaultAsync(e => e.Id == category.Id);
            if (existingCategory != null) { 

            _context.Entry(existingCategory).CurrentValues.SetValues(category);
                await _context.SaveChangesAsync();
                return category;
            }
            return null;
        }

        //public async Task<Category> GetById(Guid id)
        //{
        //   return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        //}
    }
}
