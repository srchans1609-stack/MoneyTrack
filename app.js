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