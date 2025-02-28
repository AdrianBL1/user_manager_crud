class Respuesta {
	constructor(resultado, ok = 1) {
		resultado = Array.isArray(resultado) && resultado.length == 1 ? resultado[0] : resultado
		this.ok = resultado instanceof Object && resultado.hasOwnProperty("ok") ? resultado.ok : ok
		this.resultado = resultado
	}
}
export {Respuesta}