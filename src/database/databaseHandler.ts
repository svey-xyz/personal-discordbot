const Keyv = require('keyv');
const KeyvRedis = require('@keyvhq/redis')

export default class databaseHandler {
	private stores: Map<string, typeof Keyv>
	private guildNamespace: string

	constructor() {
		this.stores = new Map;
		this.guildNamespace = ''
	}

	public async ready() {
	}

	public async hasData(namespace: string, k: string) {
		const store = this.getStore(namespace);
		return await store.has(k)
	}

	public async setData(namespace: string, k: string, v: string) {
		const store = this.getStore(namespace);
		return await store.set(k, v);
	}

	public async getData(namespace: string, k: string) {
		const store = this.getStore(namespace);
		return await store.get(k);
	}

	public async setArrayData(namespace: string, k: string, v: Array<any>) {
		const store = this.getStore(namespace);
		return await store.set(k, JSON.stringify(v));
	}

	public async getArrayData(namespace: string, k: string): Promise<Array<string>> {
		const store = this.getStore(namespace);
		const storedData = await store.get(k)
		return storedData ? JSON.parse(storedData) : [];
	}

	private createStore(namespace: string): typeof Keyv {
		if (typeof this.stores == 'undefined') throw new Error('Stores are not defined!');
		if (typeof this.stores.get(namespace) !== 'undefined') return this.stores.get(namespace)!;
		
		const store: typeof Keyv = process.env.NODE_ENV === 'production' ? 
			new Keyv({ namespace: namespace, store: new KeyvRedis(`redis://${process.env.DATABASE_HOST}`)}) :
			new Keyv({ namespace: namespace })

		this.stores.set(namespace, store)
		return store;
	}

	private getStore(namespace: string): typeof Keyv {
		let store: typeof Keyv = (typeof this.stores.get(namespace) !== 'undefined') ? this.stores.get(namespace) : this.createStore(namespace);
		return store;
	}
	
}