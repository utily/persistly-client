import * as gracely from "gracely"
import * as model from "./index"

jest.setTimeout(50000)
describe("Client", () => {
	it("client fetch check", async () => {
		type DocumentLike = {
			id: string
			type: string
		}
		const client = model.Client.open<DocumentLike>("http://localhost", "string", "name")
		const response = await client.command.get({ id: "", type: "" })
		expect(gracely.server.BackendFailure.is(response)).toBeTruthy()
	})
	it.skip("client fetch never check", async () => {
		/*
		type DocumentUnlike = {
			type: string
		}
		// As expected a compiler error as open function doesn't accept DocumentUnlike as a type
		const client = model.Client.open<DocumentUnlike>("", {
			jwt: "string",
			configuration: {
				name: "string",
				shard: "string",
				idLength: 4,
				cache: "string",
			},
		})
		const response = await client.command.get({ id: "", type: "" })
		*/
		expect(true).toBeTruthy()
	})
})
