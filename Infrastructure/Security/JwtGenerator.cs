using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
  public class JwtGenerator : IJwtGenerator
  {
    public string CreateToken(AppUser user)
    {
      // buildup list of claims
      var claims = new List<Claim>
      {
        new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
      };

      // generate signing credentials
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("A Very Secret Key"));
      var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      // describe details about the token
      var tokenDescriptor = new SecurityTokenDescriptor 
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddDays(7),
        SigningCredentials = credentials
      };

      // token handler
      var tokenHandler = new JwtSecurityTokenHandler();

      // create token
      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}