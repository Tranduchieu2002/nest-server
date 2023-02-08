import { Order } from '@server/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { NumberOptionalField, StringOptionalField } from '../../decorators/api-field.decorator';
import { ApiEnumProperty } from '../../decorators/properties.decorator';

interface IPageMetaDtoParameters {
  pageOptions: PageOptionsDto;
  total: number;
}

export class PageOptionsDto {
  @IsOptional()
  @ApiEnumProperty({
    enum: Order,
    default: Order.ASC,
  })
  readonly order: Order = Order.ASC;

  @NumberOptionalField({
    minimum: 1,
    default: 1,
    int: true,
  })
  readonly page: number = 1;

  @NumberOptionalField({
    minimum: 1,
    maximum: 50,
    default: 10,
    int: true,
  })
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @StringOptionalField({ swagger: true })
  readonly q?: string;
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptions, total }: IPageMetaDtoParameters) {
    this.page = pageOptions.page;
    this.take = pageOptions.take;
    this.total = total;
    this.pageCount = Math.ceil(this.total / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

export class Pagination<PaginationEntity> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: PaginationEntity[];
  public total: number;
  readonly meta: PageMetaDto;

  constructor(paginationResults: PaginationEntity[], meta: PageMetaDto) {
    (this.data = paginationResults), (this.meta = meta);
  }
}
