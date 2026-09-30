const titular = "Ander Chans";       // Nombre del titular
let saldoInicial = 3.50;          // Saldo inicial
const simboloMoneda = "€";


//  Función para formatear cantidades a formato de moneda local
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


//  Recorre el array 'movimientos' con un bucle y suma solo los importes positivos (> 0).

function totalIngresos() {
  let suma = 0;
  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].importe > 0) {
      suma += movimientos[i].importe;
    }
  }
  return suma;
}


 // Recorre el array 'movimientos' y suma solo los importes negativos (< 0).
 
function totalGastos() {
  let suma = 0;
  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].importe < 0) {
      suma += movimientos[i].importe;
    }
  }
  return suma;
}


 // Devuelve el saldo actual sumando el saldo inicial, los ingresos y los gastos.

function saldoActual() {
  return saldoInicial + totalIngresos() + totalGastos();
}

//  Muestra de resultados en la consola con la función formatearDinero
console.log("--- NIVEL 03 ---");
console.log("Total Ingresos:", formatearDinero(totalIngresos()));
console.log("Total Gastos:", formatearDinero(totalGastos()));
console.log("Saldo Actual:", formatearDinero(saldoActual()));


 // listaMovimientos Lista de objetos a pintar

function pintarTabla(listaMovimientos) {
  const tbody = document.getElementById("tabla-movimientos");
  tbody.innerHTML = "";

  listaMovimientos.forEach(mov => {
    const tr = document.createElement("tr");
    const claseImporte = mov.importe >= 0 ? "ingreso" : "gasto";

    // Incluimos un botón de borrar que llama a la función borrarMovimiento con el id correspondiente
    tr.innerHTML = `
      <td>${mov.id}</td>
      <td>${mov.concepto}</td>
      <td>${mov.categoria}</td>
      <td>${mov.fecha}</td>
      <td class="${claseImporte}">${formatearDinero(mov.importe)}</td>
      <td><button class="btn-borrar" onclick="borrarMovimiento(${mov.id})">Borrar</button></td>
    `;

    tbody.appendChild(tr);
  });
}

// Evento para el filtro desplegable
document.getElementById("filtro-categoria").addEventListener("change", () => {
  refrescar();
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
// 3. Identifica cuál es la categoría con mayor importe en gastos acumulados.
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


// Función central que vuelve a calcular todos los indicadores y actualiza la tabla.

function refrescar() {
  // Actualizar indicadores del DOM
  document.getElementById("titular-display").textContent = titular;
  document.getElementById("saldo-inicial-display").textContent = formatearDinero(saldoInicial);
  document.getElementById("ingresos-display").textContent = formatearDinero(totalIngresos());
  document.getElementById("gastos-reduce-display").textContent = formatearDinero(totalGastosReduce());
  document.getElementById("saldo-actual-display").textContent = formatearDinero(saldoActual());
  document.getElementById("top-categoria-display").textContent = categoriaMasGasto();

  // Filtrar según la opción activa del select
  const categoriaSeleccionada = document.getElementById("filtro-categoria").value;
  if (categoriaSeleccionada === "Todas") {
    pintarTabla(movimientos);
  } else {
    pintarTabla(movimientos.filter(m => m.categoria === categoriaSeleccionada));
  }
}

 //Elimina un movimiento por su ID utilizando .filter() y refresca la interfaz.

function borrarMovimiento(id) {
  movimientos = movimientos.filter(mov => mov.id !== id);
  refrescar();
}

// Escuchador del formulario para añadir nuevos movimientos
document.getElementById("form-movimiento").addEventListener("submit", (e) => {
  e.preventDefault();

  const conceptoInput = document.getElementById("concepto").value.trim();
  const importeInput = parseFloat(document.getElementById("importe").value);
  const categoriaInput = document.getElementById("categoria").value;

  // Validación básica
  if (!conceptoInput || isNaN(importeInput) || !categoriaInput) {
    alert("Por favor, rellena todos los campos correctamente.");
    return;
  }

  // Creación del nuevo objeto
  const nuevoMovimiento = {
    id: movimientos.length > 0 ? Math.max(...movimientos.map(m => m.id)) + 1 : 1,
    concepto: conceptoInput,
    importe: importeInput,
    categoria: categoriaInput,
    fecha: new Date().toISOString().split("T")[0]
  };

  movimientos.push(nuevoMovimiento);
  
  // Limpiar campos del formulario y refrescar la app
  e.target.reset();
  refrescar();
});

// Carga inicial
document.addEventListener("DOMContentLoaded", refrescar);