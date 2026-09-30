const titular = "Ander Chans";       // Nombre del titular
let saldoInicial = 3.50;          // Saldo inicial
const simboloMoneda = "€";


// 2. Función para formatear cantidades a formato de moneda local
/**
 * Recibe un número y devuelve una cadena formateada con 2 decimales y el símbolo de moneda.
 * Ejemplo: 85.5 -> "85,50 €"
 */
function formatearDinero(cantidad) {
  // .toFixed(2) asegura dos decimales (ej: 85.50)
  // .replace(".", ",") cambia el punto decimal por la coma usada en España
  return cantidad.toFixed(2).replace(".", ",") + " " + simboloMoneda;
}

// Comprobaciones por consola (F12)
console.log("--- NIVEL 01 ---");
console.log("Titular de la cuenta:", titular);
console.log("Saldo Inicial sin formato:", saldoInicial);
console.log("Saldo Inicial formateado:", formatearDinero(saldoInicial));
console.log("Prueba de formateo (85.5):", formatearDinero(85.5));

// Array principal que almacenará todos los movimientos de la cuenta
let movimientos = [
  {
    id: 1,
    concepto: "Nómina trabajo",
    importe: 1200.00,        // Positivo = Ingreso
    categoria: "Trabajo",
    fecha: "2026-09-01"
  },
  {
    id: 2,
    concepto: "Compra en Mercadona",
    importe: -65.40,         // Negativo = Gasto
    categoria: "Comida",
    fecha: "2026-09-03"
  },
  {
    id: 3,
    concepto: "Cena con amigos",
    importe: -32.50,
    categoria: "Ocio",
    fecha: "2026-09-05"
  },
  {
    id: 4,
    concepto: "Factura de la Luz",
    importe: -85.00,
    categoria: "Servicios",
    fecha: "2026-09-10"
  },
  {
    id: 5,
    concepto: "Venta de teclado usado",
    importe: 45.00,
    categoria: "Otros",
    fecha: "2026-09-12"
  },
  {
    id: 6,
    concepto: "Suscripción Netflix",
    importe: -12.99,
    categoria: "Ocio",
    fecha: "2026-09-15"
  }
];

// Comprobación por consola (F12)
console.log("--- NIVEL 02 ---");
console.log("Lista de movimientos cargada:", movimientos);
console.log("Total de movimientos:", movimientos.length);


// 1. Recorre el array 'movimientos' con un bucle y suma solo los importes positivos (> 0).

function totalIngresos() {
  let suma = 0;
  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].importe > 0) {
      suma += movimientos[i].importe;
    }
  }
  return suma;
}


 //2. Recorre el array 'movimientos' y suma solo los importes negativos (< 0).
 
function totalGastos() {
  let suma = 0;
  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].importe < 0) {
      suma += movimientos[i].importe;
    }
  }
  return suma;
}


 // 3. Devuelve el saldo actual sumando el saldo inicial, los ingresos y los gastos.

function saldoActual() {
  return saldoInicial + totalIngresos() + totalGastos();
}

// 4. Muestra de resultados en la consola con la función formatearDinero
console.log("--- NIVEL 03 ---");
console.log("Total Ingresos:", formatearDinero(totalIngresos()));
console.log("Total Gastos:", formatearDinero(totalGastos()));
console.log("Saldo Actual:", formatearDinero(saldoActual()));


 // listaMovimientos Lista de objetos a pintar

function pintarTabla(listaMovimientos) {
  const tbody = document.getElementById("tabla-movimientos");
  tbody.innerHTML = ""; // Limpiamos la tabla antes de volver a pintar

  listaMovimientos.forEach(mov => {
    const tr = document.createElement("tr");

    // Decidimos la clase CSS según el tipo de importe
    const claseImporte = mov.importe >= 0 ? "ingreso" : "gasto";

    tr.innerHTML = `
      <td>${mov.id}</td>
      <td>${mov.concepto}</td>
      <td>${mov.categoria}</td>
      <td>${mov.fecha}</td>
      <td class="${claseImporte}">${formatearDinero(mov.importe)}</td>
    `;

    tbody.appendChild(tr);
  });
}

// Escuchador de eventos para el desplegable de filtro por categoría (.filter)
const selectFiltro = document.getElementById("filtro-categoria");

selectFiltro.addEventListener("change", (e) => {
  const categoriaSeleccionada = e.target.value;

  if (categoriaSeleccionada === "Todas") {
    pintarTabla(movimientos);
  } else {
    // Usamos el método filter para quedarnos solo con la categoría seleccionada
    const movimientosFiltrados = movimientos.filter(
      mov => mov.categoria === categoriaSeleccionada
    );
    pintarTabla(movimientosFiltrados);
  }
});

// Carga inicial al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  // Rellenamos el resumen inicial
  document.getElementById("titular-display").textContent = titular;
  document.getElementById("saldo-actual-display").textContent = formatearDinero(saldoActual());

  // Pintamos la tabla completa al cargar
  pintarTabla(movimientos);
});

 // Calcula el total gastado utilizando el método .reduce().

function totalGastosReduce() {
  return movimientos
    .filter(mov => mov.importe < 0)
    .reduce((acumulador, mov) => acumulador + mov.importe, 0);
}


// Agrupa los gastos por categoría en un objeto.

function gastoPorCategoria() {
  return movimientos
    .filter(mov => mov.importe < 0)
    .reduce((acumulador, mov) => {
      const cat = mov.categoria;
      if (!acumulador[cat]) {
        acumulador[cat] = 0;
      }
      acumulador[cat] += mov.importe;
      return acumulador;
    }, {});
}


// Identifica cuál es la categoría con mayor importe en gastos acumulados.

function categoriaMasGasto() {
  const gastosCat = gastoPorCategoria();
  let maxGasto = 0;
  let catMax = "Ninguna";

  for (const cat in gastosCat) {
    const gastoAbsoluto = Math.abs(gastosCat[cat]);
    if (gastoAbsoluto > maxGasto) {
      maxGasto = gastoAbsoluto;
      catMax = cat;
    }
  }

  return catMax === "Ninguna" ? "-" : `${catMax} (${formatearDinero(-maxGasto)})`;
}
// Carga inicial al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  // Rellenamos los datos del resumen
  document.getElementById("titular-display").textContent = titular;
  document.getElementById("saldo-actual-display").textContent = formatearDinero(saldoActual());
  
  //estas dos líneas insertan los valores de reduce
  document.getElementById("gastos-reduce-display").textContent = formatearDinero(totalGastosReduce());
  document.getElementById("top-categoria-display").textContent = categoriaMasGasto();

  // Pintamos la tabla
  pintarTabla(movimientos);
});