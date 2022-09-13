
import { Sequelize, Model, DataTypes, ModelAttributes, ModelCtor, Optional } from 'sequelize';

export default class databaseHandler {
	private sequelize: Sequelize

	constructor() {
		this.sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE!, process.env.SEQUELIZE_USERNAME!, process.env.SEQUELIZE_PASSWORD!, {
			host: process.env.SEQUELIZE_HOST,
			port: parseFloat(process.env.SEQUELIZE_PORT!),
			dialect: 'mariadb'
		})
	}

	public async ready() {
		try {
			await this.sequelize.authenticate();
			console.log('Connection has been established successfully.');
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	}

	public createType(modelTitle: string, attributes: ModelAttributes<Model<any, any>>): ModelCtor<Model<any, any>> {
		const model = this.sequelize.define(modelTitle, attributes)
		model.sync(); // use { force: true } for a blank slate each time - good for testing
		return model;
	}

	public async addData(modelType: ModelCtor<Model<any, any>>, modelData: Optional<any, string>): Promise<string | undefined> {
		if (typeof modelType == 'undefined') return undefined;

		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const obj = await modelType.create(modelData);
			return `Tag ${obj.get('name')} added.`;
		}
		catch (error: any) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return 'That tag already exists.';
			}

			return 'Something went wrong with adding a tag.';
		}
	}
	
}