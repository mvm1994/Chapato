using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Uploads
{
    public class UploadedFile : BaseEntity
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
    }
}
