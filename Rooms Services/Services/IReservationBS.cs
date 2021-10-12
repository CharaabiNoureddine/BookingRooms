using Microsoft.Extensions.Caching.Memory;
using Rooms_Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rooms_Services.Services
{
    public interface IReservationBS
    {
        IList<string> CreateReservation(Reservation reservation, IMemoryCache _cache);
        IList<Reservation> GetReservations(IMemoryCache _cache);

        void DeleteReservation(string id, IMemoryCache _cache);
    }
}
