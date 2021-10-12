using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rooms_Services.Services
{
    public interface IRoomBS
    {
        IEnumerable<string> GetAllRooms();
    }
}
