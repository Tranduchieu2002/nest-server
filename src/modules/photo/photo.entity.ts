import { UseDto } from "../../decorators";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, IAbstractEntity, IBaseEntity } from "../base/base.entity";
import { PhotoDto } from "./photo.dto";
import { UserEntity } from "../user/user.entity";

export interface IPhotoEntity extends IBaseEntity<PhotoEntity> {
  url: string;
  original_filename: string;
  width: number;
  height: number;
  public_id: string;
  format: string;
  asset_id: string;

}

interface PhotoDtoOptions {

}


@Entity({
  name: "photos",
})
@UseDto(PhotoDto)
export class PhotoEntity extends BaseEntity<PhotoDto, PhotoDtoOptions> implements IPhotoEntity {
  @Column({ })
  url: string;

  @Column({ })
  original_filename: string;

  @Column({ })
  width: number;
  @Column({ })
  height: number;

  @Column({ })
  public_id: string;

  @Column({ })
  format: string;

  @Column({})
  asset_id: string;
  
}