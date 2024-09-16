using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Reposotiries.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Reposotiries.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext _context;
        public BlogPostRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<BlogPost> CreateAsyc(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();
            return blogPost;
            
        }

        public async Task<BlogPost> DeleteAsync(Guid id)
        {
           var exisitingBlogPost = await _context.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);
            if (exisitingBlogPost!=null)
            {
                 _context.BlogPosts.Remove(exisitingBlogPost);
                await _context.SaveChangesAsync();
                return exisitingBlogPost;

            }
            return null;
        }

        public async Task<IEnumerable<BlogPost>> GetAllAync()
        {
                        
            return await _context.BlogPosts.Include(x=>x.Categories).ToListAsync();
        }

        public async Task<BlogPost> GetById([FromRoute] Guid id)
        {
         return await _context.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<BlogPost> UpdateAsync(BlogPost blogPost)
        {
            var existingBlogPost = await _context.BlogPosts.Include(x => x.Categories)
                 .FirstOrDefaultAsync(x => x.Id == blogPost.Id);

            if (existingBlogPost != null) 
            { 
               _context.Entry(existingBlogPost).CurrentValues.SetValues(blogPost);
                existingBlogPost.Categories=blogPost.Categories;
                await _context.SaveChangesAsync();
                return blogPost;
            }
            return null;
        }

       
    }
}
