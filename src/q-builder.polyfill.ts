import {
  PageMetaDto,
  PageOptionsDto,
  Pagination,
} from './modules/base/paginate';

import { Brackets, QueryBuilder, SelectQueryBuilder } from 'typeorm';

declare module 'typeorm' {

  interface QueryBuilder<Entity> {
    searchByString(q: string, columnNames: string[]): this;
    
  }
  interface SelectQueryBuilder<Entity> {
    // AddDateRange(this: SelectQueryBuilder<Entity>, START_DATE, END_DATE): SelectQueryBuilder<Entity>
    // IN(this: SelectQueryBuilder<Entity>, columnName, values): SelectQueryBuilder<Entity>
    // IsActive(this: SelectQueryBuilder<Entity>, Active): SelectQueryBuilder<Entity>
    // CustomInnerJoinAndSelect(this: SelectQueryBuilder<Entity>, ALIAS, RELATIONS: string[]): SelectQueryBuilder<Entity>
    paginate(
      pageOptions: PageOptionsDto,
      options?: Partial<{ takeAll: boolean }>,
    ): Promise<Pagination<Entity>>;
  }
}

QueryBuilder.prototype.searchByString = function (q, columnNames) {
  if (!q) {
    return this;
  }

  this.andWhere(
    new Brackets((qb) => {
      for (const item of columnNames) {
        qb.orWhere(`${item} ILIKE :q`);
      }
    }),
  );

  this.setParameter('q', `%${q}%`);

  return this;
};

SelectQueryBuilder.prototype.paginate = async function <Entity>(
  pageOptions: PageOptionsDto,
  options?: Partial<{ takeAll: boolean }>,
) {
  if(!options?.takeAll) {
    this.skip(pageOptions.skip).take(pageOptions.take);
  }
  const total = await this.getCount();
  const { entities } = await this.getRawAndEntities();

  const pageMetaDto = new PageMetaDto({ total, pageOptions });

  return new Pagination<Entity>(entities, pageMetaDto);
};
