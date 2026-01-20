namespace GestorDeCobranza.Model
{
    public class Operador
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string StatusText { get; set; } = string.Empty;
        public int Campaigns { get; set; } = 0;
        public int ContactsToday { get; set; } = 0;
        public int SuccessRate { get; set; } = 0;
        public string AvatarColor { get; set; } = string.Empty;
    }
}
