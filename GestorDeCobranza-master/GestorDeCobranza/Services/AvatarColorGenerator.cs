using System;
using System.Security.Cryptography;
using System.Text;

namespace GestorDeCobranza.Services
{
    public static class AvatarColorGenerator
    {
        private static readonly string[] Palette = new[]
        {
            "#ef4444", // rojo
            "#06b6d4", // cian
            "#3b82f6", // azul
            "#f59e0b", // naranja
            "#10b981", // verde
            "#8b5cf6", // morado
            "#f97316", // ámbar
            "#0ea5a4", // teal
            "#ef7ab2", // rosa
            "#60a5fa"  // azul claro
        };

        public static string GetColor(string firstName, string lastName)
        {
            var seed = $"{firstName ?? string.Empty}|{lastName ?? string.Empty}";

            if(string.IsNullOrWhiteSpace(seed.Trim('|')))
            {
                return Palette[2];
            }

            using var sha = SHA256.Create();
            var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(seed));

            var value = BitConverter.ToUInt32(hash, 0);
            var index = (int)(value % (uint)Palette.Length);

            return Palette[index];
        }
    }
}
