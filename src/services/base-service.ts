import { Model, Document, Connection, Schema } from 'mongoose';
import { cloneDeep } from 'lodash';

export abstract class BaseService<TModel> {
    public model: Model<TModel & Document>;

    constructor(public readonly connection: Connection, protected readonly schema: Schema, protected readonly collectionName: string) {
        this.model = this.connection.model<TModel & Document>(this.collectionName, this.schema);
    }

    public async create(document: TModel): Promise<TModel> {
        const clonedDocument: any = cloneDeep(document);
        return await this.model.create(clonedDocument);
    }

    public async find(options?: any): Promise<Array<TModel>> {
        return await this.model.find(options).lean();
    }

    public async findOne(query: any): Promise<TModel> {
        return await this.model.findOne(query).lean();
    }

    public async update(query: any, document: TModel) {
        const clonedQuery = cloneDeep(query);
        const clonedDocument = cloneDeep(document);
        return await this.model.updateOne(clonedQuery, clonedDocument).lean();
    }

    public async upsert(query: any, document: TModel, options: any = { upsert: true }) {
        return await this.model.updateOne(query, document, options).lean();
    }

    public async deleteOne(query: any, options?: any) {
        return await this.model.deleteOne(query, options).lean();
    }
}