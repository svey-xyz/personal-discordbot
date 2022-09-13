
import { Sequelize, Model, DataTypes, ModelAttributes, ModelCtor, Optional } from 'sequelize';
const Keyv = require('keyv');

export default class databaseHandler {
	private stores: Map<string, typeof Keyv>

	constructor() {
		// this.sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE!, process.env.SEQUELIZE_USERNAME!, process.env.SEQUELIZE_PASSWORD!, {
		// 	host: process.env.SEQUELIZE_HOST,
		// 	port: parseFloat(process.env.SEQUELIZE_PORT!),
		// 	dialect: 'mariadb'
		// })
		this.stores = new Map;
	}

	public async ready() {
		// try {
		// 	await this.sequelize.authenticate();
		// 	console.log('Connection has been established successfully.');
		// } catch (error) {
		// 	console.error('Unable to connect to the database:', error);
		// }
	}

	// public createType(modelTitle: string, attributes: ModelAttributes<Model<any, any>>): ModelCtor<Model<any, any>> {
	// 	const model = this.sequelize.define(modelTitle, attributes)
	// 	model.sync(); // use { force: true } for a blank slate each time - good for testing
	// 	return model;
	// }

	// public async addData(modelType: ModelCtor<Model<any, any>>, modelData: Optional<any, string>): Promise<string | undefined> {
	// 	if (typeof modelType == 'undefined') return undefined;

	// 	try {
	// 		// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
	// 		const obj = await modelType.create(modelData);
	// 		return `Tag ${obj.get('name')} added.`;
	// 	}
	// 	catch (error: any) {
	// 		if (error.name === 'SequelizeUniqueConstraintError') {
	// 			return 'That tag already exists.';
	// 		}

	// 		return 'Something went wrong with adding a tag.';
	// 	}
	// }



	public async setData(namespace: string, k: string, v: string) {
		const store = this.getStore(namespace)
		return await store.set(k, v);
	}

	public async getData(namespace: string, k: any) {
		const store = this.getStore(namespace)
		return await store.get(k)
	}

	public async setArrayData(namespace: string, k: string, v: Array<any>) {
		const store = this.getStore(namespace);
		return await store.set(k, JSON.stringify(v));
	}

	public async getArrayData(namespace: string, k: string) {
		const store = this.getStore(namespace);
		return await JSON.parse(await store.get(k))
	}

	private createStore(namespace: string): typeof Keyv {
		if (typeof this.stores == 'undefined') throw new Error('Stores are not defined!');
		if (typeof this.stores.get(namespace) !== 'undefined') return this.stores.get(namespace)!;
		const store: typeof Keyv = new Keyv({ namespace: namespace })
		this.stores.set(namespace, store)
		return store;
	}

	private getStore(namespace: string): typeof Keyv {
		let store: typeof Keyv = (typeof this.stores.get(namespace) !== 'undefined') ? this.stores.get(namespace) : this.createStore(namespace);
		return store;
	}
	
}