import * as gracely from "gracely"
import * as model from "persistly-model"
import * as http from "cloud-http"

export class Command<T extends model.Document> {
	constructor(
		readonly connection: http.Client<Command<T extends model.Document ? T : gracely.Error>>,
		readonly name?: string
	) {}
	async create(request: T | T[]): Promise<T | T[] | gracely.Error> {
		const result = await this.connection.post<model.Command.Create<T> | gracely.Error>("", {
			command: "create",
			name: this.name,
			request,
		})
		return (
			(gracely.Error.is(result)
				? result
				: Array.isArray(result) && model.Command.Create.is<T>(result[0]) && "response" in result[0]
				? result[0].response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async delete(request: model.Filter<T>): Promise<T | T[] | gracely.Error> {
		const result = await this.connection.post<model.Command.Delete<T> | gracely.Error>("", {
			command: "delete",
			name: this.name,
			request,
		})
		return (
			(gracely.Error.is(result)
				? result
				: Array.isArray(result) && model.Command.Delete.is<T>(result[0]) && "response" in result[0]
				? result[0].response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async get(request: model.Filter<T>): Promise<T | gracely.Error> {
		const result = await this.connection.post<model.Command.Get<T> | gracely.Error>("", [
			{
				command: "get",
				name: this.name,
				request,
			},
		])
		return (
			(gracely.Error.is(result)
				? result
				: Array.isArray(result) && model.Command.Get.is<T>(result[0]) && "response" in result[0]
				? result[0].response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async list(request?: model.Filter<T>): Promise<T[] | gracely.Error> {
		const result = await this.connection.post<model.Command.List<T> | gracely.Error>("", [
			{
				command: "list",
				name: this.name,
				request,
			},
		])
		return (
			(gracely.Error.is(result)
				? result
				: Array.isArray(result) && model.Command.List.is<T>(result[0]) && "response" in result[0]
				? result[0].response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async update(
		request: (model.Filter<T> & model.Update<T> & model.Options) | (model.Filter<T> & model.Update<T> & model.Options)[]
	): Promise<number | T | (number | T)[] | gracely.Error> {
		const result = await this.connection.post<model.Command.Update<T> | gracely.Error>("", {
			command: "update",
			name: this.name,
			request,
		})
		return (
			(gracely.Error.is(result)
				? result
				: Array.isArray(result) && model.Command.Update.is<T>(result[0]) && "response" in result[0]
				? result[0].response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	static open<T>(url: string, key: string, name: string): Command<T extends model.Document ? T : never>
	static open<T>(url?: string, key?: string, name?: string): Command<T extends model.Document ? T : never> | undefined
	static open<T>(url?: string, key?: string, name?: string): Command<T extends model.Document ? T : never> | undefined {
		const connection = new http.Client<Command<T extends model.Document ? T : never>>(url, key)
		return connection && new Command<T extends model.Document ? T : never>(connection, name)
	}
}
