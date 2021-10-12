using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rooms_Services.Models;
using Rooms_Services.Services;
using System.Net.Http;
using System.Net;
using Microsoft.Extensions.Caching.Memory;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookingRooms.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        // Injection de dépendance
        private IRoomBS _RoomBS;
        private IReservationBS _ReservationBS;
        private IMemoryCache _cache;

        public ReservationController(IRoomBS roomsBs, IReservationBS reservationBS, IMemoryCache memoryCache)
        {
            _RoomBS = roomsBs;
            _ReservationBS = reservationBS;
            _cache = memoryCache;
        }


        [HttpGet]
        [Route("GetRooms")]
        public IEnumerable<string> GetRooms()
        {
            return _RoomBS.GetAllRooms();
        }

        [HttpGet]
        [Route("GetReservations")]
        public IEnumerable<Reservation> GetReservations()
        {
            return _ReservationBS.GetReservations(_cache);
        }

        //// GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public string PostReservation(int id)
        //{
        //    return "value";
        //}

        // POST api/<ValuesController>
        [HttpPost]
        [Route("MakeReservation")]
        public IList<string> MakeReservation([FromBody] Reservation reservation)
        {
            return _ReservationBS.CreateReservation(reservation, _cache);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _ReservationBS.DeleteReservation(id, _cache);
        }
    }
}
