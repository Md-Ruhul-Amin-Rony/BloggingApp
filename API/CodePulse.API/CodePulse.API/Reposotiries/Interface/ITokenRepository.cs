using Microsoft.AspNetCore.Identity;

namespace CodePulse.API.Reposotiries.Interface
{
    public interface ITokenRepository
    {
        string CreateJwtToken(IdentityUser user, List<string> roles);
    }
}
