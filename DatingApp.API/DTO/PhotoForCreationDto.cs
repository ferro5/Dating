using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.DTO
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime? PhotoAdded { get; set; }
        public string PublicID { get; set; }

        public PhotoForCreationDto()
        {
            PhotoAdded = DateTime.Now;
        }
    }
}
