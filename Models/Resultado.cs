namespace EncuestaTIC.Models;

public class Resultado
{
    public string Lenguaje { get; set; }
    public double Peso { get; set; }

    public Resultado(string lenguaje, double peso)
    {
        Lenguaje = lenguaje;
        Peso = peso;
    }
}
