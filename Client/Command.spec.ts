import * as gracely from "gracely"
import * as model from "./index"

jest.setTimeout(50000)
describe("Client", () => {
	it("client fetch check", async () => {
		type DocumentLike = {
			id: string
			type: string
		}
		const client = model.Client.open<DocumentLike>("https://api.payfunc.com", {
			jwt: "string",
			configuration: {
				name: "string",
				shard: "string",
				idLength: 4,
				cache: "string",
			},
		})
		const response = await client.command.get({ id: "", type: "" })
		expect(gracely.client.Unauthorized.is(response)).toBeTruthy()
	})
	it("client fetch never check", async () => {
		type DocumentUnlike = {
			type: string
		}
		const client = model.Client.open<DocumentUnlike>("https://api.payfunc.com", {
			jwt: "string",
			configuration: {
				name: "string",
				shard: "string",
				idLength: 4,
				cache: "string",
			},
		})
		//const response = await client.command.get({ id: "", type: "" })
		expect(client).toBeTruthy()
		// Defined but, doesn't accept DocumentUnlike as a type
	})
})
