import * as gracely from "gracely"
import * as model from "persistly-model"
import * as http from "cloudly-http"
import { Command } from "./Command"

export class Client<T extends model.Document> {
	command = new Command(this.connection, this.name)
	private constructor(
		readonly connection: http.Client<Command<T extends model.Document ? T : gracely.Error>>,
		readonly name?: string
	) {}

	static open<T extends model.Document>(
		url: string,
		key: string,
		name: string
	): Client<T extends model.Document ? T : never>
	static open<T extends model.Document>(
		url?: string,
		key?: string,
		name?: string
	): Client<T extends model.Document ? T : never> | undefined
	static open<T extends model.Document>(
		url?: string,
		key?: string,
		name?: string
	): Client<T extends model.Document ? T : never> | undefined {
		const connection = new http.Client<Command<T extends model.Document ? T : never>>(url, key)
		return connection && new Client<T extends model.Document ? T : never>(connection, name)
	}
}
