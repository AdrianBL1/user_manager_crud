import {Respuesta} from './Respuesta.js'

class Servicios {
	async CONFIGURACION() {
		try { return (await DB).query("CALL CONFIGURACION()")}
		catch (error) { throw error }
	}

	async CONSTANTES() {
		try { return (await DB).query("CALL CONSTANTES()")}
		catch (error) { throw error }
	}

	async EXISTE(datos) {
		try { return (await DB).query(`CALL ${datos.servicio}('${datos.login}', '${datos.pwd}')`)}
		catch (error) { throw error }
	}

	async CONSULTAS(datos) {
		try { return (await DB).query(`CALL ${datos.servicio}(${datos.pagina})`, datos)}
		catch (error) { throw error }
	}

	async CONSULTAS_ID(datos) {
		try { return (await DB).query(`CALL ${datos.servicio}('${datos.id}')`)}
		catch (error) { throw error }
	}

	async CONSULTAS_ACCESO(datos) {
		const consulta = `CALL ${datos.servicio}('${datos.id}', ${datos.pagina}, '${datos.modo}')`

		datos.filtro = JSON.stringify({id: datos.id, modo: datos.modo})
		try { return (await DB).query(consulta, datos)}
		catch (error) { throw error }
	}

	async CONSULTAS_CATALOGO(datos) {
		try { return (await DB).query(`CALL ${datos.servicio}('${datos.catalogo}')`)}
		catch (error) { throw error }
	}

	async CONSULTAS_EDAD(datos) {
		const consulta = `CALL ${datos.servicio}(${datos.pagina}, '${datos.operador}', ${datos.edad})`

		datos.filtro = JSON.stringify({operador: datos.operador, edad: datos.edad})
		try { return (await DB).query(consulta, datos)}
		catch (error) { throw error }
	}

	async CONSULTAS_EDADENRANGO(datos) {
		const consulta = `CALL ${datos.servicio}(${datos.pagina}, ${datos.inicio}, ${datos.fin})`

		datos.filtro = JSON.stringify({inicio: datos.inicio, fin: datos.fin})
		try { return (await DB).query(consulta, datos)}
		catch (error) { throw error }
	}

	async CONSULTAS_NOMBRE(datos) {
		datos.filtro = datos.nombre
		try { return (await DB).query(`CALL ${datos.servicio}(${datos.pagina}, '${datos.nombre}')`, datos)}
		catch (error) { throw error }
	}

	async ALTAS(datos) {
		this.camposParse(datos)
		const consulta = `CALL ${datos.servicio}('${datos.nombre}', '${datos.pApellido}', '${datos.sApellido}', '${datos.nacimiento}', ${datos.genero}, '${datos.login}', '${datos.pwd}', '${datos.foto}')`

		try { return (await DB).query(consulta)}
		catch (error) { throw error }
	}

	async BAJAS(datos) {
		try { return (await DB).query(`CALL ${datos.servicio}('${datos.id}')`)}
		catch (error) { throw error }
	}

	async CAMBIOS(datos) {
		this.camposParse(datos)
		const consulta = `CALL ${datos.servicio}('${datos.id}', '${datos.nombre}', '${datos.pApellido}', '${datos.sApellido}', '${datos.nacimiento}', ${datos.genero}, '${datos.login}', '${datos.pwd}', '${datos.foto}')`

		try { return (await DB).query(consulta)}
		catch (error) { throw error }
	}

	camposParse(campos){
		for(const campo in DB.configuracion) {
			switch(campo) {
				case "id":
				case "nombre":
				case "pApellido":
				case "sApellido":
				case "nacimiento":
				case "login":
				case "pwd":
				case "foto":
					if(!DB.configuracion[campo]) campos[campo] = NO_DEFINIDO;
					break;
				case "genero":
					if(!DB.configuracion[campo]) campos[campo] = INDEFINIDO;
			}
		}
		return campos;
	}
}
export {Servicios}