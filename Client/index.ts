import * as gracely from "gracely"
import * as model from "persistly-model"
import * as http from "cloud-http"
import { Command } from "./Command"

export class Client<T extends model.Document> {
	command = new Command(this.connection, this.key)
	private constructor(
		readonly connection: http.Client<Command<T extends model.Document ? T : gracely.Error>>,
		readonly key: {
			jwt: string
			configuration: {
				name: string
				shard: string
				idLength?: 4 | 8 | 12 | 16 | undefined
				cache: string
			}
		}
	) {}

	static open<T extends model.Document>(
		url: string,
		key: {
			jwt: string
			configuration: {
				name: string
				shard: string
				idLength?: 4 | 8 | 12 | 16 | undefined
				cache: string
			}
		}
	): Client<T extends model.Document ? T : never>
	static open<T extends model.Document>(
		url?: string,
		key?: {
			jwt: string
			configuration: {
				name: string
				shard: string
				idLength?: 4 | 8 | 12 | 16 | undefined
				cache: string
			}
		}
	): Client<T extends model.Document ? T : never> | undefined
	static open<T extends model.Document>(
		url?: string,
		key?: {
			jwt: string
			configuration: {
				name: string
				shard: string
				idLength?: 4 | 8 | 12 | 16 | undefined
				cache: string
			}
		}
	): Client<T extends model.Document ? T : never> | undefined {
		const connection = new http.Client<Command<T extends model.Document ? T : never>>(url, key?.jwt)
		return connection && key && new Client<T extends model.Document ? T : never>(connection, key)
	}
}
