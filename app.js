const titular = "Ander Chans";       // Nombre del titular
let saldoInicial = 1000.00;          // Saldo inicial
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