using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DatingApp.API.Helpers
{
    public class AutoMapProfile : Profile
    {
        public AutoMapProfile()
        {
            CreateMap<ApplicationUser, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                   {
                       opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                   })
                   .ForMember(dest=>dest.Age , opt=> {
                       opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                   });
                
            CreateMap<ApplicationUser, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                });
            CreateMap<Photo, PhotoForDetailedDto>();
        }
    }
}
