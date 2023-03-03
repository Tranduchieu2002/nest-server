import {
  PageMetaDto,
  PageOptionsDto,
  Pagination,
} from './modules/base/paginate';

import { Brackets, Driver, QueryBuilder, SelectQueryBuilder } from 'typeorm';
import { BaseEntity } from './modules/base/base.entity';
export const VIRTUAL_COLUMN_KEY = Symbol('VIRTUAL_COLUMN_KEY');
import { DriverUtils } from 'typeorm/driver/DriverUtils';
import { Alias } from 'typeorm/query-builder/Alias';
import { BaseDto } from './modules/base/base.dto';
import { compact, map } from 'lodash';


function groupRows<T>(
  rawResults: T[],
  alias: Alias,
  driver: Driver,
): Map<string, T[]> {
  const raws = new Map();
  const keys: string[] = [];

  if (alias.metadata.tableType === 'view') {
    keys.push(
      ...alias.metadata.columns.map((column) =>
        DriverUtils.buildAlias(driver, alias.name, column.databaseName),
      ),
    );
  } else {
    keys.push(
      ...alias.metadata.primaryColumns.map((column) =>
        DriverUtils.buildAlias(driver, alias.name, column.databaseName),
      ),
    );
  }

  for (const rawResult of rawResults) {
    const id = keys
      .map((key) => {
        const keyValue = rawResult[key];

        if (Buffer.isBuffer(keyValue)) {
          return keyValue.toString('hex');
        }

        if (typeof keyValue === 'object') {
          return JSON.stringify(keyValue);
        }

        return keyValue;
      })
      .join('_'); // todo: check partial

    const items = raws.get(id);

    if (!items) {
      raws.set(id, [rawResult]);
    } else {
      items.push(rawResult);
    }
  }

  return raws;
}

declare global {

  interface Array<T> {
    toDtos<Dto extends BaseDto>(this: T[], options?: unknown): Dto[];

    toPageDto<Dto extends BaseDto>(
      this: T[],
      pageMetaDto: PageMetaDto,
      // FIXME make option type visible from entity
      options?: unknown,
    ): Pagination<T>;
  }
}


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
    ): Promise<[Entity[], PageMetaDto]>;
  }
}

Array.prototype.toDtos = function <
  Entity extends BaseEntity<Dto>,
  Dto extends BaseDto,
>(options?: unknown): Dto[] {
  return compact(
    map<Entity, Dto>(this as Entity[], (item) => item.toDto(options as never)),
  );
};

Array.prototype.toPageDto = function (
  pageMetaDto: PageMetaDto,
  options?: unknown,
) {
  return new Pagination(this.toDtos(options), pageMetaDto);
};


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
  const pageMetaDto = new PageMetaDto({ total, pageOptions });
  
  const { entities, raw } : { entities : Entity[], raw: any} = await this.getRawAndEntities();

  const alias = this.expressionMap.mainAlias!;
  const group = groupRows(raw, alias, this.connection.driver);

  const keys = alias.metadata.primaryColumns.map((column) =>
    DriverUtils.buildAlias(
      this.connection.driver,
      alias.name,
      column.databaseName,
    ),
  );
  for (const rawValue of raw) {
    const id = keys
      .map((key) => {
        const keyValue = rawValue[key];

        if (Buffer.isBuffer(keyValue)) {
          return keyValue.toString('hex');
        }

        if (typeof keyValue === 'object') {
          return JSON.stringify(keyValue);
        }

        return keyValue;
      })
      .join('_');

    const entity= entities.find((item: any) => item.id === id) as BaseEntity;
    const metaInfo: Record<string, string> =
      Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};

    for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
      const items = group.get(id);

      if (items) {
        for (const item of items) {
          entity[propertyKey] ??= item?.[name] as string;
        }
      }
    }
  }
  return [entities, pageMetaDto];
};
