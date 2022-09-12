import { Sequelize, Model, DataTypes } from 'sequelize';


export default class databaseHandler {
	private sequelize

	constructor() {
		this.sequelize = new Sequelize(process.env.SEQUELIZE_DATABASE!, process.env.SEQUELIZE_USERNAME!, process.env.SEQUELIZE_PASSWORD!, {
			host: process.env.SEQUELIZE_HOST,
			port: parseFloat(process.env.SEQUELIZE_PORT!),
			dialect: 'mariadb'
		})
	}

	
	public get getSequelize(): Sequelize {
		return this.sequelize;
	}
	
}