import mysql2 from 'mysql2/promise'
import {Respuesta} from './Respuesta.js'

class BD {
	constructor(...catalogos) {
		this.conexion = mysql2.createConnection({user: "root", password: "", database:"usuarios"})

		// Las constantes siempre se cargarán como parte del objeto global
		this.CONSTANTES()

		// Ahora cargo los catálogos indicados
		for (const catalogo of catalogos)
			if(this[catalogo])
				this[catalogo]()
		this.mensaje = "Hola a todos"
	}

	// Ejecuta la consulta indicada y devuelve el resultado
	async query(consulta, paginacion) {
		(await this.conexion).connect()
		const r = new Respuesta((await (await this.conexion).query(consulta))[0][0])		

		// Si es necesario paginar, realizo la consulta
		if(paginacion)
			r.paginacion = await this.paginacion(paginacion.servicio, paginacion.pagina, paginacion.filtro)
		return r
	}

	// Recupera los valores de paginación para la consulta indicada
	async paginacion(consulta, pagina, filtro = "ND") {
		(await this.conexion).connect()
		const r = (await this.conexion).query(`CALL PAGINACION('${consulta}', ${pagina}, '${filtro}')`)
		return (await r)[0][0][0]
	}

	// Crea un atributo donde se guarda la configuración
	async CONFIGURACION() {
		try {
			(await this.conexion).connect()
			const r = (await this.conexion).query('CALL CONFIGURACION()')
			this.configuracion = (await r)[0][0][0]
		}
		catch (error) { throw error }
	}

	// Carga las constantes en el objeto global
	async CONSTANTES() {
		try {
			(await this.conexion).connect()
			const r = (await this.conexion).query('CALL CONSTANTES()')
			for (const item of (await r)[0][0])
				global[item.constante] = item.numerica ? parseInt(item.valor) : item.valor
		}
		catch (error) { throw error }
	}
}
export {BD}