// Funcion de stack overflow que me genera el hash, para evitar utilizar librerías de terceros.
function generateHash(string) {
  var hash = 0;
  if (string.length == 0) return hash;
  for (let i = 0; i < string.length; i++) {
    var charCode = string.charCodeAt(i);
    hash = (hash << 7) - hash + charCode;
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
  const listaDeIngresos = JSON.parse(window.localStorage.getItem("listaIngresos")) || [];

  // Me fijo si ya existe el ingreso desde el navegador en el cual estoy (de acuerdo al hash generado según el user agent).
  // La función filter siempre devuelve un subconjunto de elementos, que varía según el criterio de búsqueda (hashIteracion === hash).
  // Para la primera vez que se ejecute el código o se inicie desde un navegador nuevo,
  // la variable ingresoEncontrado va a ser una lista vacía.
  const ingresoEncontrado = listaDeIngresos.filter((hashIteracion) => hashIteracion === hash);

  // Si se trata de un arreglo o lista, length nos devuelve la cantidad de elementos que tiene.
  if (ingresoEncontrado.length === 0) {
    // Si la lista tiene cero elementos, entonces el ingreso es nuevo.
    // Avisa y agrega el ingreso a la lista de ingresos del local storage.
    alert("El usuario es nuevo");
    listaDeIngresos.push(hash);
    window.localStorage.setItem("listaIngresos", JSON.stringify(listaDeIngresos));
  } else {
    alert("Es un usuario conocido");
  }

  // Almacenamos en una variable la url a la cual haremos la solicitud (primer parámetro del fetch).
  const urlDestino = "http://frontend1:8080/trabajo-practico";
  
  // Objeto que contendrá la información que viajará hacia el servidor (lo usamos dentro del objeto de configuración a continuación).
  const objetoData = {
    userAgent: userAgentActual,
  };
  
  // Objeto que usamos para configurar algunas cosas de la solicitud (segundo parámetro del fetch si es por post, put o delete).
  const objetoParaConfiguracionDeFetch = {
    method: "POST",
    body: JSON.stringify(objetoData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Usamos fetch para hacer la solicitud hacia el servidor.
  fetch(urlDestino, objetoParaConfiguracionDeFetch)
    .then((res) => {      
      if (!res.ok) {
        // Si la solicitud estuvo correcta, pero la respuesta tuvo algún código de error, entonces lanzamos un error.
        return Promise.reject("Error");
      }
      // Si llegamos hasta acá, entonces no hubo ningún error y la ejecución sigue en el próximo then.
      res.json();
    })
    .catch((error) => {
      // Si la solicitud tuvo algún error, la ejecución continúa en el próximo catch.
      return Promise.reject("Error");
    })
    .then((response) => {
      // En caso de que todo haya salido bien.
      alert("Información enviada correctamente");
    })
    .catch((error) => {
      // En caso de que haya algún error.
      console.error("Error:", error);
      alert("Error al procesar la solcitud");
    });
};

verificarUserAgentConocido();