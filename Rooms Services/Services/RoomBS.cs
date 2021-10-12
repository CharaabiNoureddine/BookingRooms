using Rooms_Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rooms_Services.Services
{
    public class RoomBS : IRoomBS
    {
        public IEnumerable<string> GetAllRooms()
        {   
              return Constantes.Rooms;
        }
    }
}
