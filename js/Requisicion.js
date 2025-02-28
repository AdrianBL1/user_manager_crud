class Requisicion {
	constructor(requisicion) {
		this.ok = true

		if(requisicion && requisicion.hasOwnProperty("servicio"))
			for (const parametro in requisicion)
				this[parametro] = requisicion[parametro]

		if(!this.hasOwnProperty("servicio")) this.ok = false
		else this.ok = this.atributosOk(this.plantillas(this.servicio))
	}

	atributosOk(plantilla) {
		for (const atributo in plantilla)
			if(!this.hasOwnProperty(atributo) || (typeof this[atributo]) != plantilla[atributo])
				return false
		return true
	}
 
	plantillas(consulta) {
		switch(consulta) {
			case "CONFIGURACION":
			case "CONSTANTES": return {}
			case "ALTAS":
			case "CAMBIOS":	return this.camposSetup(consulta)
			case "BAJAS":
			case "CONSULTAS_ID": return {id: "string"}
			case "CONSULTAS": return {pagina: "number"}
			case "CONSULTAS_CATALOGO": return {catalogo: "string"}
			case "CONSULTAS_NOMBRE": return {pagina: "number", nombre: "string"}
			case "CONSULTAS_EDAD": return {pagina:"number", operador: "string", edad: "number"}
			case "CONSULTAS_EDAENRANGO": return {pagina:"number", inicio:"number", fin:"number"}
			case "CONSULTAS_ACCESO": return {id: "string", pagina: "number", modo: "string"}
			case "EXISTE": return {login: "string", pwd: "string"}
			default: return false
		}
	}

	camposSetup(consulta){
		let parametros = {}

		for(campo in DB.configuracion) {
			switch(campo){
				case "id":
					if(DB.configuracion[campo] == CAMPO_ACTIVO && consulta == "CAMBIOS")
						parametros[campo] = "string";
					break;
				case "nombre":
				case "pApellido":
				case "sApellido":
				case "nacimiento":
				case "login":
				case "pwd":
				case "foto":
					if(DB.configuracion[campo] == CAMPO_ACTIVO) parametros[campo] = "string";
					break;
				case "genero":
					if(DB.configuracion[campo] == CAMPO_ACTIVO) parametros[campo] = "integer";
			}
		}
		return parametros;
	}
}
export {Requisicion}