using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Rooms_Services.Models;

namespace Rooms_Services.Services
{
    public class ReservationBS : IReservationBS
    {
        //private readonly IMemoryCache _cache;
        public IList<string> CreateReservation(Reservation reservation, IMemoryCache _cache)
        {
            IList<Reservation> cacheEntry = null;
            IList<string> propositions = new List<string>();

            // Look for cache key.
            if (!_cache.TryGetValue(Constantes.KeyReservation, out cacheEntry))
            {
                if (cacheEntry == null)
                {
                    cacheEntry = new List<Reservation>();
                }
            }
            // Key not in cache, so get data.
            // Conflit réservation
            int count = cacheEntry.Where(x => x.Room == reservation.Room && x.Date == reservation.Date && x.StartTime == reservation.StartTime).Count();

                if (count != 0)
                {
                    int i = 0;
                    while (i < 24)
                    {
                        Reservation currentReservation = cacheEntry.Where(x => x.Room == reservation.Room && x.Date == reservation.Date && x.StartTime == FormatStartEndTime(i)).FirstOrDefault();
                        if (currentReservation == null)
                        {
                            propositions.Add(FormatStartEndTime(i));
                        }
                        i++;
                    }
                } else
                {
                    propositions.Add("OK");
                    reservation.Id = cacheEntry.Count() + 1;
                    cacheEntry.Add(reservation);
                }
                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(6000));

                // Save data in cache.
                _cache.Set(Constantes.KeyReservation, cacheEntry, cacheEntryOptions);
            

            return propositions;
        }

        public void DeleteReservation(string id, IMemoryCache _cache)
        {
            IList<Reservation> cacheEntry = null;

            // Look for cache key.
            if (!_cache.TryGetValue(Constantes.KeyReservation, out cacheEntry))
            {
                if (cacheEntry == null)
                {
                    cacheEntry = new List<Reservation>();
                }
            }
            // Key not in cache, so get data.
            cacheEntry.Remove(cacheEntry.Where(x => x.Id == Int32.Parse(id)).FirstOrDefault());

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(6000));

                // Save data in cache.
                _cache.Set(Constantes.KeyReservation, cacheEntry, cacheEntryOptions);
            }

        public IList<Reservation> GetReservations(IMemoryCache _cache)
        {
            IList<Reservation> cacheEntry = null;

            // Look for cache key.
            if (!_cache.TryGetValue(Constantes.KeyReservation, out cacheEntry))
            {
                if (cacheEntry == null)
                {
                    cacheEntry = new List<Reservation>();
                }
                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromSeconds(6000));

                // Save data in cache.
                _cache.Set(Constantes.KeyReservation, cacheEntry, cacheEntryOptions);
            }

            return cacheEntry;
        }

        public string FormatStartEndTime(int i)
        {
            string formattedTime = "";
            if (i < 10)
            {
                formattedTime += "0" + i.ToString();
            } else
            {
                formattedTime = i.ToString();
            }

            return formattedTime;
        }
    }
}
