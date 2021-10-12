using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rooms_Services.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string Personne { get; set; }
        public string Room { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Date { get; set; }

        public override int GetHashCode()
        {
            return Id;
        }
        public bool Equals(Reservation other)
        {
            if (other == null) return false;
            return this.Id == other.Id;
        }

    }
}
