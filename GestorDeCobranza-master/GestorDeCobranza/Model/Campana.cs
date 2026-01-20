namespace GestorDeCobranza.Model
{
    public class Campana
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; } = DateTime.Now;
        public DateTime FechaFin { get; set; } = DateTime.Now.AddMonths(1);
        public string Estado { get; set; } = "activa"; // activa, pausada, finalizada
        public string EstadoText { get; set; } = "Activa";
        public decimal Meta { get; set; }
        public int Progreso { get; set; } // Porcentaje 0-100
        public int OperadoresAsignados { get; set; }
    }

}
