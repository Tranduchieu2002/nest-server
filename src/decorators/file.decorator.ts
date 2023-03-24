import { UseInterceptors, applyDecorators, Type } from "@nestjs/common";
import { PARAMTYPES_METADATA, ROUTE_ARGS_METADATA } from "@nestjs/common/constants";
import { FilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { getSchemaPath, ApiBody, ApiConsumes, ApiExtraModels } from "@nestjs/swagger";
import { SchemaObject, ReferenceObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import _ from "lodash";
import { reverseObjectKeys } from '@nestjs/swagger/dist/utils/reverse-object-keys.util';
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';

export interface IFile {
  encoding: string;
  buffer: Buffer;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface IApiFile {
  name: string;
  isArray?: boolean;
}


function explore(instance: Object, propertyKey: string | symbol) {
  const types: Array<Type<unknown>> = Reflect.getMetadata(
    PARAMTYPES_METADATA,
    instance,
    propertyKey,
  );
  const routeArgsMetadata =
    Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      instance.constructor,
      propertyKey,
    ) || {};

  const parametersWithType = _.mapValues(
    reverseObjectKeys(routeArgsMetadata),
    (param) => ({
      type: types[param.index],
      name: param.data,
      required: true,
    }),
  );

  for (const [key, value] of Object.entries(parametersWithType)) {
    const keyPair = key.split(':');

    if (Number(keyPair[0]) === RouteParamtypes.BODY) {
      return value.type;
    }
  }
}

function RegisterModels(): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const body = explore(target, propertyKey);

    return body && ApiExtraModels(body)(target, propertyKey, descriptor);
  };
}



function ApiFileDecorator(
  files: IApiFile[] = [],
  options: Partial<{ isRequired: boolean }> = {},
): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const { isRequired = false } = options;
    const fileSchema: SchemaObject = {
      type: 'string',
      format: 'binary',
    };
    const properties: Record<string, SchemaObject | ReferenceObject> = {};

    for (const file of files) {
      if (file.isArray) {
        properties[file.name] = {
          type: 'array',
          items: fileSchema,
        };
      } else {
        properties[file.name] = fileSchema;
      }
    }

    let schema: SchemaObject = {
      properties,
      type: 'object',
    };
    const body = explore(target, propertyKey);

    if (body) {
      schema = {
        allOf: [
          {
            $ref: getSchemaPath(body),
          },
          { properties, type: 'object' },
        ],
      };
    }

    return ApiBody({
      schema,
      required: isRequired,
    })(target, propertyKey, descriptor);
  };
}

/*
  This function is a decorator factory that returns a method decorator.
  It takes two parameters:
  - "files" parameter: An array of objects that contain information about the file(s) to be uploaded. 
    It has types from lodash library, which can accept single or array of values that would be casted(as array).
  - "options" parameter: an optional object that contains configuration options for the decorator.
*/

export function ApiFile(
  files: _.Many<IApiFile>,  // The files parameter
  options: Partial<{ isRequired: boolean }> = {}, // The options parameter with an empty default value.
): MethodDecorator {
  /* 
    Casts the given "files" parameter to an array type using the Lodash function castArray(), 
    if it's not already an array. Assigns the result to constant "filesArray".  
   */
  const filesArray = _.castArray(files);

  /*
    This maps through each "file" within "filesArray"(using JavaScript map() method), 
    and transforms them into instance of FilesInterceptor or FileInterceptor. 
    UseInterceptors() function is called by passing its corresponding argument depending on the isArray property of each file. 
    The resulting `apiFileInterceptors` is an array of interceptor instances that will run before the main function is called.
  */
  const apiFileInterceptors = filesArray.map((file) =>
    file.isArray
      ? UseInterceptors(FilesInterceptor(file.name))
      : UseInterceptors(FileInterceptor(file.name)),
  );

  /*
    Finally, this function returns a set of method decorators (using applyDecorators()) to register the created interceptor instances and other relevant settings such as ApiConsumes and RegisterModels.
   */
  return applyDecorators(
    RegisterModels(),
    ApiConsumes('multipart/form-data'),
    ApiFileDecorator(filesArray, options),
    ...apiFileInterceptors,
  );
}