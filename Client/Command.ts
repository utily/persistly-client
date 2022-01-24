import * as gracely from "gracely"
import * as model from "persistly-model"
import * as http from "cloud-http"

export class Command<T extends model.Document> {
	constructor(
		readonly connection: http.Client<Command<T extends model.Document ? T : gracely.Error>>,
		readonly url: string,
		readonly name?: string
	) {}
	async create(request: T | T[]): Promise<T | T[] | gracely.Error> {
		const result = await this.connection.post<model.Command.Create<T> | gracely.Error>(this.url, {
			command: "create",
			name: this.name,
			request,
		})
		return (
			(gracely.Error.is(result)
				? result
				: model.Command.Create.is<T>(result) && "response" in result
				? result.response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async delete(request: model.Filter<T>): Promise<T | T[] | gracely.Error> {
		const result = await this.connection.post<model.Command.Delete<T> | gracely.Error>(this.url, {
			command: "delete",
			name: this.name,
			request,
		})
		return (
			(gracely.Error.is(result)
				? result
				: model.Command.Delete.is<T>(result) && "response" in result
				? result.response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async get(request: model.Filter<T>): Promise<T | gracely.Error> {
		const result = await this.connection.post<model.Command.Get<T> | gracely.Error>(this.url, [
			{
				command: "get",
				name: this.name,
				request,
			},
		])
		return (
			(gracely.Error.is(result)
				? result
				: model.Command.Get.is<T>(result) && "response" in result
				? result.response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async list(request?: model.Filter<T>): Promise<T | T[] | gracely.Error> {
		const result = await this.connection.post<model.Command.List<T> | gracely.Error>(this.url, [
			{
				command: "list",
				name: this.name,
				request,
			},
		])
		return (
			(gracely.Error.is(result)
				? result
				: model.Command.List.is<T>(result) && "response" in result
				? result.response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	async update(
		request: (model.Filter<T> & model.Update<T> & model.Options) | (model.Filter<T> & model.Update<T> & model.Options)[]
	): Promise<number | T | (number | T)[] | gracely.Error> {
		const result = await this.connection.post<model.Command.Update<T> | gracely.Error>(this.url, {
			command: "update",
			name: this.name,
			request,
		})
		return (
			(gracely.Error.is(result)
				? result
				: model.Command.Update.is<T>(result) && "response" in result
				? result.response
				: undefined) ?? gracely.server.backendFailure("Failed to return a response.")
		)
	}
	static open<T>(url: string, key: string, name: string): Command<T extends model.Document ? T : never>
	static open<T>(url?: string, key?: string, name?: string): Command<T extends model.Document ? T : never> | undefined
	static open<T>(url?: string, key?: string, name?: string): Command<T extends model.Document ? T : never> | undefined {
		const connection = new http.Client<Command<T extends model.Document ? T : never>>(url, key)
		return connection && new Command<T extends model.Document ? T : never>(connection, url ?? "", name)
	}
}
