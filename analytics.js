// Funcion de stack overflow que me genera el hash, para evitar utilizar librerías de terceros.
function generateHash(string) {
    var hash = 0;
    if (string.length == 0)
        return hash;
    for (let i = 0; i < string.length; i++) {
        var charCode = string.charCodeAt(i);
        hash = ((hash << 7) - hash) + charCode;
        hash = hash & hash;
    }
    return hash.toString();
}

const verificarUserAgentConocido = () => {
    
    // Obtengo el user agent.
    const userAgentActual = window.navigator.userAgent;
    
    const hash = generateHash(userAgentActual);

    // Obtengo la lista de ingresos que fueron hechos desde los distintos navegadores.
    // window.localStorage.getItem('listaIngresos') va a ser null la primera vez que se ejecute el código en el nuevo navegador.
    // Si dicha lista no existe (es decir,si es null), almaceno una lista vacía en la variable (con el operador or).
    const listaDeIngresos = JSON.parse(window.localStorage.getItem('listaIngresos')) || [];

    // Me fijo si ya existe el ingreso desde el navegador en el cual estoy (de acuerdo al hash generado según el user agent).
    // La función filter siempre devuelve un subconjunto de elementos, que varía según el criterio de búsqueda (hashIteracion === hash).
    // Para la primera vez que se ejecute el código o se inicie desde un navegador nuevo,
    // la variable ingresoEncontrado va a ser una lista vacía.
    const ingresoEncontrado = listaDeIngresos.filter((hashIteracion) => hashIteracion === hash);

    // Si se trata de un arreglo o lista, length nos devuelve la cantidad de elementos que tiene.
    if (ingresoEncontrado.length === 0) {
        // Si la lista tiene cero elementos, entonces el ingreso es nuevo.
        // Avisa y agrega el ingreso a la lista de ingresos del local storage.
        alert('El usuario es nuevo');
        listaDeIngresos.push(hash);
        window.localStorage.setItem('listaIngresos', JSON.stringify(listaDeIngresos));
    } else {
        alert('Es un usuario conocido');
    }
};

verificarUserAgentConocido();

// Avisa si el usuario es conocido o desconocido. SI es desconocido, entonces lo agrego a la lista de usuarios.

// Este script debe hacer una petición a una url de ejemplo
// (no tiene que existir, lo importante es la implementación en JavaScript) por POST,

// y debe pasarle en el body del request el User Agent,
// si se accedió con el navegador en modo incógnito, el referer y su fingerprint.

// Estos parámetros tienen que ser obtenidos con JavaScript antes de hacer la petición.
// Para el caso del fingerprint, la idea es que cada usuario que ingrese a la page obtenga un
// hash único para identificarlo, y se mantenga en sus siguientes visitas. Usar cualquier fuente
// de almacenamiento disponible desde el navegador para persistir el mismo. El script con su funcionalidad,
// debe estar en un archivo js aparte, y debe inicializarse desde el HTML separado del resto de la lógica
// JS como si se tratara de un servicio externo de un proveedor de analytics.

//-------------------------------------------------------------------------
// Esta en modo incognito?

// No -> tenemos que pasar el user agent.
// Si -> tenemos que pasar el user agent, el referer y su fingerprint
