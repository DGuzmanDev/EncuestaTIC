namespace EncuestaTIC.Models;

public class Encuesta
{
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public string Pais { get; set; }
    public string Rol { get; set; }
    public string LenguajePrimario { get; set; }
    public string LenguajeSecundario { get; set; }

    public Encuesta(string nombre, string apellido, string pais, string rol,
        string lenguajePrimario, string lenguajeSecundario)
    {
        Nombre = nombre;
        Apellido = apellido;
        Pais = pais;
        Rol = rol;
        LenguajePrimario = lenguajePrimario;
        LenguajeSecundario = lenguajeSecundario;
    }
}
