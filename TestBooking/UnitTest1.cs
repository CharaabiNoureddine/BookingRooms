using Microsoft.Extensions.Caching.Memory;
using NUnit.Framework;
using Rooms_Services;

namespace TestBooking
{
    public class Tests
    {
        private IMemoryCache _cache;

        public Tests(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }


        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void Test1()
        {
            Rooms_Services.Services.ReservationBS reservationBS = new Rooms_Services.Services.ReservationBS();

            var reservations = reservationBS.GetReservations(this._cache);
            Assert.AreNotEqual(reservations, null);
        }
    }
}