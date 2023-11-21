using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using EncuestaTIC.Models;

namespace EncuestaTIC.Controllers;

public class HomeController : Controller
{

    private static readonly string LLAVE_ENCUESTADOS = "REGISTRO_ENCUESTADOS";
    private static readonly string LLAVE_RESULTADOS = "REGISTRO_RESULTADOS";

    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [HttpPost]
    [Route("encuesta")]
    public List<Resultado> PostNuevaEncuesta([FromBody] Encuesta encuesta)
    {
        if (encuesta != null)
        {
            if (HttpContext.Session != null)
            {
                List<Resultado>? resultados = HttpContext.Session.Get<List<Resultado>>(LLAVE_RESULTADOS) ?? ObtenerListaResultadosDefault();
                int indiceLenguajePrimario = resultados.FindIndex(elemento => elemento.Lenguaje.Equals(encuesta.LenguajePrimario));
                int indiceLenguajeSecundario = resultados.FindIndex(elemento => elemento.Lenguaje.Equals(encuesta.LenguajeSecundario));

                if (indiceLenguajePrimario != -1 && indiceLenguajeSecundario != -1)
                {
                    resultados.ElementAt(indiceLenguajePrimario).Peso++;
                    resultados.ElementAt(indiceLenguajeSecundario).Peso += 0.5;
                    HttpContext.Session.Set(LLAVE_RESULTADOS, resultados);

                    List<Encuesta>? encuestados = HttpContext.Session.Get<List<Encuesta>>(LLAVE_ENCUESTADOS) ?? new List<Encuesta>();
                    encuestados.Add(encuesta);
                    HttpContext.Session.Set(LLAVE_ENCUESTADOS, encuestados);
                }
                else
                {
                    throw new ArgumentException("Se ha provisto un lenguaje de programacion invalido para el sistema");
                }

                return resultados;
            }
            else
            {
                throw new InvalidOperationException("No existe una sesion configurada para el contexto del solicitud HTTP");
            }
        }
        else
        {
            throw new ArgumentNullException(nameof(encuesta), "El cuerpo de la solicitud es invalido");
        }
    }

    private List<Resultado> ObtenerListaResultadosDefault()
    {
        return new List<Resultado>
        {
            new("C", 0),
            new("C#", 0),
            new("C++",0),
            new("CSS",0),
            new("Go",0),
            new("Java",0),
            new("Javascript",0),
            new("Kotlin",0),
            new("Objective-C",0),
            new("PHP",0),
            new("Perl",0),
            new("PowerShell",0),
            new("Python",0),
            new("R",0),
            new("Ruby",0),
            new("Rust",0),
            new("Scala",0),
            new("Shell",0),
            new("Swift",0),
            new("TypeScript",0)
        };
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
