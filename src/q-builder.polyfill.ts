import {
  PageMetaDto,
  PageOptionsDto,
  Pagination,
} from './modules/base/paginate';

import { SelectQueryBuilder } from 'typeorm';

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    // AddDateRange(this: SelectQueryBuilder<Entity>, START_DATE, END_DATE): SelectQueryBuilder<Entity>
    // IN(this: SelectQueryBuilder<Entity>, columnName, values): SelectQueryBuilder<Entity>
    // IsActive(this: SelectQueryBuilder<Entity>, Active): SelectQueryBuilder<Entity>
    // CustomInnerJoinAndSelect(this: SelectQueryBuilder<Entity>, ALIAS, RELATIONS: string[]): SelectQueryBuilder<Entity>
    paginate(pageOptions: PageOptionsDto): Promise<Pagination<Entity>>;
  }
}
SelectQueryBuilder.prototype.paginate = async function <Entity>(
  pageOptions: PageOptionsDto,
) {
  this.skip(pageOptions.skip).take(pageOptions.take);

  const total = await this.getCount();
  const { entities } = await this.getRawAndEntities();

  const pageMetaDto = new PageMetaDto({ total, pageOptions });

  return new Pagination<Entity>(entities, pageMetaDto);
};
