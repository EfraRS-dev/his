
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Triage
 * 
 */
export type Triage = $Result.DefaultSelection<Prisma.$TriagePayload>
/**
 * Model VitalSigns
 * 
 */
export type VitalSigns = $Result.DefaultSelection<Prisma.$VitalSignsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Triages
 * const triages = await prisma.triage.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Triages
   * const triages = await prisma.triage.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.triage`: Exposes CRUD operations for the **Triage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Triages
    * const triages = await prisma.triage.findMany()
    * ```
    */
  get triage(): Prisma.TriageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vitalSigns`: Exposes CRUD operations for the **VitalSigns** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VitalSigns
    * const vitalSigns = await prisma.vitalSigns.findMany()
    * ```
    */
  get vitalSigns(): Prisma.VitalSignsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Triage: 'Triage',
    VitalSigns: 'VitalSigns'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "triage" | "vitalSigns"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Triage: {
        payload: Prisma.$TriagePayload<ExtArgs>
        fields: Prisma.TriageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TriageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TriageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>
          }
          findFirst: {
            args: Prisma.TriageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TriageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>
          }
          findMany: {
            args: Prisma.TriageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>[]
          }
          create: {
            args: Prisma.TriageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>
          }
          createMany: {
            args: Prisma.TriageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TriageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>[]
          }
          delete: {
            args: Prisma.TriageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>
          }
          update: {
            args: Prisma.TriageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>
          }
          deleteMany: {
            args: Prisma.TriageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TriageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TriageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>[]
          }
          upsert: {
            args: Prisma.TriageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TriagePayload>
          }
          aggregate: {
            args: Prisma.TriageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTriage>
          }
          groupBy: {
            args: Prisma.TriageGroupByArgs<ExtArgs>
            result: $Utils.Optional<TriageGroupByOutputType>[]
          }
          count: {
            args: Prisma.TriageCountArgs<ExtArgs>
            result: $Utils.Optional<TriageCountAggregateOutputType> | number
          }
        }
      }
      VitalSigns: {
        payload: Prisma.$VitalSignsPayload<ExtArgs>
        fields: Prisma.VitalSignsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VitalSignsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VitalSignsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>
          }
          findFirst: {
            args: Prisma.VitalSignsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VitalSignsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>
          }
          findMany: {
            args: Prisma.VitalSignsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>[]
          }
          create: {
            args: Prisma.VitalSignsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>
          }
          createMany: {
            args: Prisma.VitalSignsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VitalSignsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>[]
          }
          delete: {
            args: Prisma.VitalSignsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>
          }
          update: {
            args: Prisma.VitalSignsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>
          }
          deleteMany: {
            args: Prisma.VitalSignsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VitalSignsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VitalSignsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>[]
          }
          upsert: {
            args: Prisma.VitalSignsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VitalSignsPayload>
          }
          aggregate: {
            args: Prisma.VitalSignsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVitalSigns>
          }
          groupBy: {
            args: Prisma.VitalSignsGroupByArgs<ExtArgs>
            result: $Utils.Optional<VitalSignsGroupByOutputType>[]
          }
          count: {
            args: Prisma.VitalSignsCountArgs<ExtArgs>
            result: $Utils.Optional<VitalSignsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    triage?: TriageOmit
    vitalSigns?: VitalSignsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TriageCountOutputType
   */

  export type TriageCountOutputType = {
    vitalSigns: number
  }

  export type TriageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vitalSigns?: boolean | TriageCountOutputTypeCountVitalSignsArgs
  }

  // Custom InputTypes
  /**
   * TriageCountOutputType without action
   */
  export type TriageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TriageCountOutputType
     */
    select?: TriageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TriageCountOutputType without action
   */
  export type TriageCountOutputTypeCountVitalSignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VitalSignsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Triage
   */

  export type AggregateTriage = {
    _count: TriageCountAggregateOutputType | null
    _avg: TriageAvgAggregateOutputType | null
    _sum: TriageSumAggregateOutputType | null
    _min: TriageMinAggregateOutputType | null
    _max: TriageMaxAggregateOutputType | null
  }

  export type TriageAvgAggregateOutputType = {
    id: number | null
    patientId: number | null
    nurseId: number | null
    urgencyLevel: number | null
  }

  export type TriageSumAggregateOutputType = {
    id: number | null
    patientId: number | null
    nurseId: number | null
    urgencyLevel: number | null
  }

  export type TriageMinAggregateOutputType = {
    id: number | null
    patientId: number | null
    nurseId: number | null
    isActive: boolean | null
    urgencyLevel: number | null
    initialObservations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TriageMaxAggregateOutputType = {
    id: number | null
    patientId: number | null
    nurseId: number | null
    isActive: boolean | null
    urgencyLevel: number | null
    initialObservations: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TriageCountAggregateOutputType = {
    id: number
    patientId: number
    nurseId: number
    isActive: number
    urgencyLevel: number
    initialObservations: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TriageAvgAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    urgencyLevel?: true
  }

  export type TriageSumAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    urgencyLevel?: true
  }

  export type TriageMinAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    isActive?: true
    urgencyLevel?: true
    initialObservations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TriageMaxAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    isActive?: true
    urgencyLevel?: true
    initialObservations?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TriageCountAggregateInputType = {
    id?: true
    patientId?: true
    nurseId?: true
    isActive?: true
    urgencyLevel?: true
    initialObservations?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TriageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Triage to aggregate.
     */
    where?: TriageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Triages to fetch.
     */
    orderBy?: TriageOrderByWithRelationInput | TriageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TriageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Triages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Triages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Triages
    **/
    _count?: true | TriageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TriageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TriageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TriageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TriageMaxAggregateInputType
  }

  export type GetTriageAggregateType<T extends TriageAggregateArgs> = {
        [P in keyof T & keyof AggregateTriage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTriage[P]>
      : GetScalarType<T[P], AggregateTriage[P]>
  }




  export type TriageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TriageWhereInput
    orderBy?: TriageOrderByWithAggregationInput | TriageOrderByWithAggregationInput[]
    by: TriageScalarFieldEnum[] | TriageScalarFieldEnum
    having?: TriageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TriageCountAggregateInputType | true
    _avg?: TriageAvgAggregateInputType
    _sum?: TriageSumAggregateInputType
    _min?: TriageMinAggregateInputType
    _max?: TriageMaxAggregateInputType
  }

  export type TriageGroupByOutputType = {
    id: number
    patientId: number
    nurseId: number
    isActive: boolean
    urgencyLevel: number
    initialObservations: string
    createdAt: Date
    updatedAt: Date
    _count: TriageCountAggregateOutputType | null
    _avg: TriageAvgAggregateOutputType | null
    _sum: TriageSumAggregateOutputType | null
    _min: TriageMinAggregateOutputType | null
    _max: TriageMaxAggregateOutputType | null
  }

  type GetTriageGroupByPayload<T extends TriageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TriageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TriageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TriageGroupByOutputType[P]>
            : GetScalarType<T[P], TriageGroupByOutputType[P]>
        }
      >
    >


  export type TriageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    isActive?: boolean
    urgencyLevel?: boolean
    initialObservations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vitalSigns?: boolean | Triage$vitalSignsArgs<ExtArgs>
    _count?: boolean | TriageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["triage"]>

  export type TriageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    isActive?: boolean
    urgencyLevel?: boolean
    initialObservations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["triage"]>

  export type TriageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    isActive?: boolean
    urgencyLevel?: boolean
    initialObservations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["triage"]>

  export type TriageSelectScalar = {
    id?: boolean
    patientId?: boolean
    nurseId?: boolean
    isActive?: boolean
    urgencyLevel?: boolean
    initialObservations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TriageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "nurseId" | "isActive" | "urgencyLevel" | "initialObservations" | "createdAt" | "updatedAt", ExtArgs["result"]["triage"]>
  export type TriageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vitalSigns?: boolean | Triage$vitalSignsArgs<ExtArgs>
    _count?: boolean | TriageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TriageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TriageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TriagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Triage"
    objects: {
      vitalSigns: Prisma.$VitalSignsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      patientId: number
      nurseId: number
      isActive: boolean
      urgencyLevel: number
      initialObservations: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["triage"]>
    composites: {}
  }

  type TriageGetPayload<S extends boolean | null | undefined | TriageDefaultArgs> = $Result.GetResult<Prisma.$TriagePayload, S>

  type TriageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TriageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TriageCountAggregateInputType | true
    }

  export interface TriageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Triage'], meta: { name: 'Triage' } }
    /**
     * Find zero or one Triage that matches the filter.
     * @param {TriageFindUniqueArgs} args - Arguments to find a Triage
     * @example
     * // Get one Triage
     * const triage = await prisma.triage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TriageFindUniqueArgs>(args: SelectSubset<T, TriageFindUniqueArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Triage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TriageFindUniqueOrThrowArgs} args - Arguments to find a Triage
     * @example
     * // Get one Triage
     * const triage = await prisma.triage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TriageFindUniqueOrThrowArgs>(args: SelectSubset<T, TriageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Triage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageFindFirstArgs} args - Arguments to find a Triage
     * @example
     * // Get one Triage
     * const triage = await prisma.triage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TriageFindFirstArgs>(args?: SelectSubset<T, TriageFindFirstArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Triage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageFindFirstOrThrowArgs} args - Arguments to find a Triage
     * @example
     * // Get one Triage
     * const triage = await prisma.triage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TriageFindFirstOrThrowArgs>(args?: SelectSubset<T, TriageFindFirstOrThrowArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Triages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Triages
     * const triages = await prisma.triage.findMany()
     * 
     * // Get first 10 Triages
     * const triages = await prisma.triage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const triageWithIdOnly = await prisma.triage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TriageFindManyArgs>(args?: SelectSubset<T, TriageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Triage.
     * @param {TriageCreateArgs} args - Arguments to create a Triage.
     * @example
     * // Create one Triage
     * const Triage = await prisma.triage.create({
     *   data: {
     *     // ... data to create a Triage
     *   }
     * })
     * 
     */
    create<T extends TriageCreateArgs>(args: SelectSubset<T, TriageCreateArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Triages.
     * @param {TriageCreateManyArgs} args - Arguments to create many Triages.
     * @example
     * // Create many Triages
     * const triage = await prisma.triage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TriageCreateManyArgs>(args?: SelectSubset<T, TriageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Triages and returns the data saved in the database.
     * @param {TriageCreateManyAndReturnArgs} args - Arguments to create many Triages.
     * @example
     * // Create many Triages
     * const triage = await prisma.triage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Triages and only return the `id`
     * const triageWithIdOnly = await prisma.triage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TriageCreateManyAndReturnArgs>(args?: SelectSubset<T, TriageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Triage.
     * @param {TriageDeleteArgs} args - Arguments to delete one Triage.
     * @example
     * // Delete one Triage
     * const Triage = await prisma.triage.delete({
     *   where: {
     *     // ... filter to delete one Triage
     *   }
     * })
     * 
     */
    delete<T extends TriageDeleteArgs>(args: SelectSubset<T, TriageDeleteArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Triage.
     * @param {TriageUpdateArgs} args - Arguments to update one Triage.
     * @example
     * // Update one Triage
     * const triage = await prisma.triage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TriageUpdateArgs>(args: SelectSubset<T, TriageUpdateArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Triages.
     * @param {TriageDeleteManyArgs} args - Arguments to filter Triages to delete.
     * @example
     * // Delete a few Triages
     * const { count } = await prisma.triage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TriageDeleteManyArgs>(args?: SelectSubset<T, TriageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Triages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Triages
     * const triage = await prisma.triage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TriageUpdateManyArgs>(args: SelectSubset<T, TriageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Triages and returns the data updated in the database.
     * @param {TriageUpdateManyAndReturnArgs} args - Arguments to update many Triages.
     * @example
     * // Update many Triages
     * const triage = await prisma.triage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Triages and only return the `id`
     * const triageWithIdOnly = await prisma.triage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TriageUpdateManyAndReturnArgs>(args: SelectSubset<T, TriageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Triage.
     * @param {TriageUpsertArgs} args - Arguments to update or create a Triage.
     * @example
     * // Update or create a Triage
     * const triage = await prisma.triage.upsert({
     *   create: {
     *     // ... data to create a Triage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Triage we want to update
     *   }
     * })
     */
    upsert<T extends TriageUpsertArgs>(args: SelectSubset<T, TriageUpsertArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Triages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageCountArgs} args - Arguments to filter Triages to count.
     * @example
     * // Count the number of Triages
     * const count = await prisma.triage.count({
     *   where: {
     *     // ... the filter for the Triages we want to count
     *   }
     * })
    **/
    count<T extends TriageCountArgs>(
      args?: Subset<T, TriageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TriageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Triage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TriageAggregateArgs>(args: Subset<T, TriageAggregateArgs>): Prisma.PrismaPromise<GetTriageAggregateType<T>>

    /**
     * Group by Triage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TriageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TriageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TriageGroupByArgs['orderBy'] }
        : { orderBy?: TriageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TriageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTriageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Triage model
   */
  readonly fields: TriageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Triage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TriageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vitalSigns<T extends Triage$vitalSignsArgs<ExtArgs> = {}>(args?: Subset<T, Triage$vitalSignsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Triage model
   */
  interface TriageFieldRefs {
    readonly id: FieldRef<"Triage", 'Int'>
    readonly patientId: FieldRef<"Triage", 'Int'>
    readonly nurseId: FieldRef<"Triage", 'Int'>
    readonly isActive: FieldRef<"Triage", 'Boolean'>
    readonly urgencyLevel: FieldRef<"Triage", 'Int'>
    readonly initialObservations: FieldRef<"Triage", 'String'>
    readonly createdAt: FieldRef<"Triage", 'DateTime'>
    readonly updatedAt: FieldRef<"Triage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Triage findUnique
   */
  export type TriageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * Filter, which Triage to fetch.
     */
    where: TriageWhereUniqueInput
  }

  /**
   * Triage findUniqueOrThrow
   */
  export type TriageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * Filter, which Triage to fetch.
     */
    where: TriageWhereUniqueInput
  }

  /**
   * Triage findFirst
   */
  export type TriageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * Filter, which Triage to fetch.
     */
    where?: TriageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Triages to fetch.
     */
    orderBy?: TriageOrderByWithRelationInput | TriageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Triages.
     */
    cursor?: TriageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Triages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Triages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Triages.
     */
    distinct?: TriageScalarFieldEnum | TriageScalarFieldEnum[]
  }

  /**
   * Triage findFirstOrThrow
   */
  export type TriageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * Filter, which Triage to fetch.
     */
    where?: TriageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Triages to fetch.
     */
    orderBy?: TriageOrderByWithRelationInput | TriageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Triages.
     */
    cursor?: TriageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Triages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Triages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Triages.
     */
    distinct?: TriageScalarFieldEnum | TriageScalarFieldEnum[]
  }

  /**
   * Triage findMany
   */
  export type TriageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * Filter, which Triages to fetch.
     */
    where?: TriageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Triages to fetch.
     */
    orderBy?: TriageOrderByWithRelationInput | TriageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Triages.
     */
    cursor?: TriageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Triages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Triages.
     */
    skip?: number
    distinct?: TriageScalarFieldEnum | TriageScalarFieldEnum[]
  }

  /**
   * Triage create
   */
  export type TriageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * The data needed to create a Triage.
     */
    data: XOR<TriageCreateInput, TriageUncheckedCreateInput>
  }

  /**
   * Triage createMany
   */
  export type TriageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Triages.
     */
    data: TriageCreateManyInput | TriageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Triage createManyAndReturn
   */
  export type TriageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * The data used to create many Triages.
     */
    data: TriageCreateManyInput | TriageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Triage update
   */
  export type TriageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * The data needed to update a Triage.
     */
    data: XOR<TriageUpdateInput, TriageUncheckedUpdateInput>
    /**
     * Choose, which Triage to update.
     */
    where: TriageWhereUniqueInput
  }

  /**
   * Triage updateMany
   */
  export type TriageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Triages.
     */
    data: XOR<TriageUpdateManyMutationInput, TriageUncheckedUpdateManyInput>
    /**
     * Filter which Triages to update
     */
    where?: TriageWhereInput
    /**
     * Limit how many Triages to update.
     */
    limit?: number
  }

  /**
   * Triage updateManyAndReturn
   */
  export type TriageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * The data used to update Triages.
     */
    data: XOR<TriageUpdateManyMutationInput, TriageUncheckedUpdateManyInput>
    /**
     * Filter which Triages to update
     */
    where?: TriageWhereInput
    /**
     * Limit how many Triages to update.
     */
    limit?: number
  }

  /**
   * Triage upsert
   */
  export type TriageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * The filter to search for the Triage to update in case it exists.
     */
    where: TriageWhereUniqueInput
    /**
     * In case the Triage found by the `where` argument doesn't exist, create a new Triage with this data.
     */
    create: XOR<TriageCreateInput, TriageUncheckedCreateInput>
    /**
     * In case the Triage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TriageUpdateInput, TriageUncheckedUpdateInput>
  }

  /**
   * Triage delete
   */
  export type TriageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
    /**
     * Filter which Triage to delete.
     */
    where: TriageWhereUniqueInput
  }

  /**
   * Triage deleteMany
   */
  export type TriageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Triages to delete
     */
    where?: TriageWhereInput
    /**
     * Limit how many Triages to delete.
     */
    limit?: number
  }

  /**
   * Triage.vitalSigns
   */
  export type Triage$vitalSignsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    where?: VitalSignsWhereInput
    orderBy?: VitalSignsOrderByWithRelationInput | VitalSignsOrderByWithRelationInput[]
    cursor?: VitalSignsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VitalSignsScalarFieldEnum | VitalSignsScalarFieldEnum[]
  }

  /**
   * Triage without action
   */
  export type TriageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Triage
     */
    select?: TriageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Triage
     */
    omit?: TriageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TriageInclude<ExtArgs> | null
  }


  /**
   * Model VitalSigns
   */

  export type AggregateVitalSigns = {
    _count: VitalSignsCountAggregateOutputType | null
    _avg: VitalSignsAvgAggregateOutputType | null
    _sum: VitalSignsSumAggregateOutputType | null
    _min: VitalSignsMinAggregateOutputType | null
    _max: VitalSignsMaxAggregateOutputType | null
  }

  export type VitalSignsAvgAggregateOutputType = {
    id: number | null
    triageId: number | null
    temperature: number | null
    heartRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
  }

  export type VitalSignsSumAggregateOutputType = {
    id: number | null
    triageId: number | null
    temperature: number | null
    heartRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
  }

  export type VitalSignsMinAggregateOutputType = {
    id: number | null
    triageId: number | null
    temperature: number | null
    bloodPressure: string | null
    heartRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
    additionalNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VitalSignsMaxAggregateOutputType = {
    id: number | null
    triageId: number | null
    temperature: number | null
    bloodPressure: string | null
    heartRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
    additionalNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VitalSignsCountAggregateOutputType = {
    id: number
    triageId: number
    temperature: number
    bloodPressure: number
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VitalSignsAvgAggregateInputType = {
    id?: true
    triageId?: true
    temperature?: true
    heartRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
  }

  export type VitalSignsSumAggregateInputType = {
    id?: true
    triageId?: true
    temperature?: true
    heartRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
  }

  export type VitalSignsMinAggregateInputType = {
    id?: true
    triageId?: true
    temperature?: true
    bloodPressure?: true
    heartRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    additionalNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VitalSignsMaxAggregateInputType = {
    id?: true
    triageId?: true
    temperature?: true
    bloodPressure?: true
    heartRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    additionalNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VitalSignsCountAggregateInputType = {
    id?: true
    triageId?: true
    temperature?: true
    bloodPressure?: true
    heartRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    additionalNotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VitalSignsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VitalSigns to aggregate.
     */
    where?: VitalSignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VitalSigns to fetch.
     */
    orderBy?: VitalSignsOrderByWithRelationInput | VitalSignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VitalSignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VitalSigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VitalSigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VitalSigns
    **/
    _count?: true | VitalSignsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VitalSignsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VitalSignsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VitalSignsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VitalSignsMaxAggregateInputType
  }

  export type GetVitalSignsAggregateType<T extends VitalSignsAggregateArgs> = {
        [P in keyof T & keyof AggregateVitalSigns]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVitalSigns[P]>
      : GetScalarType<T[P], AggregateVitalSigns[P]>
  }




  export type VitalSignsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VitalSignsWhereInput
    orderBy?: VitalSignsOrderByWithAggregationInput | VitalSignsOrderByWithAggregationInput[]
    by: VitalSignsScalarFieldEnum[] | VitalSignsScalarFieldEnum
    having?: VitalSignsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VitalSignsCountAggregateInputType | true
    _avg?: VitalSignsAvgAggregateInputType
    _sum?: VitalSignsSumAggregateInputType
    _min?: VitalSignsMinAggregateInputType
    _max?: VitalSignsMaxAggregateInputType
  }

  export type VitalSignsGroupByOutputType = {
    id: number
    triageId: number
    temperature: number
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: VitalSignsCountAggregateOutputType | null
    _avg: VitalSignsAvgAggregateOutputType | null
    _sum: VitalSignsSumAggregateOutputType | null
    _min: VitalSignsMinAggregateOutputType | null
    _max: VitalSignsMaxAggregateOutputType | null
  }

  type GetVitalSignsGroupByPayload<T extends VitalSignsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VitalSignsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VitalSignsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VitalSignsGroupByOutputType[P]>
            : GetScalarType<T[P], VitalSignsGroupByOutputType[P]>
        }
      >
    >


  export type VitalSignsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    triageId?: boolean
    temperature?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    additionalNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    triage?: boolean | TriageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vitalSigns"]>

  export type VitalSignsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    triageId?: boolean
    temperature?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    additionalNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    triage?: boolean | TriageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vitalSigns"]>

  export type VitalSignsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    triageId?: boolean
    temperature?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    additionalNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    triage?: boolean | TriageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vitalSigns"]>

  export type VitalSignsSelectScalar = {
    id?: boolean
    triageId?: boolean
    temperature?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    additionalNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VitalSignsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "triageId" | "temperature" | "bloodPressure" | "heartRate" | "respiratoryRate" | "oxygenSaturation" | "additionalNotes" | "createdAt" | "updatedAt", ExtArgs["result"]["vitalSigns"]>
  export type VitalSignsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    triage?: boolean | TriageDefaultArgs<ExtArgs>
  }
  export type VitalSignsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    triage?: boolean | TriageDefaultArgs<ExtArgs>
  }
  export type VitalSignsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    triage?: boolean | TriageDefaultArgs<ExtArgs>
  }

  export type $VitalSignsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VitalSigns"
    objects: {
      triage: Prisma.$TriagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      triageId: number
      temperature: number
      bloodPressure: string
      heartRate: number
      respiratoryRate: number
      oxygenSaturation: number
      additionalNotes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vitalSigns"]>
    composites: {}
  }

  type VitalSignsGetPayload<S extends boolean | null | undefined | VitalSignsDefaultArgs> = $Result.GetResult<Prisma.$VitalSignsPayload, S>

  type VitalSignsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VitalSignsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VitalSignsCountAggregateInputType | true
    }

  export interface VitalSignsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VitalSigns'], meta: { name: 'VitalSigns' } }
    /**
     * Find zero or one VitalSigns that matches the filter.
     * @param {VitalSignsFindUniqueArgs} args - Arguments to find a VitalSigns
     * @example
     * // Get one VitalSigns
     * const vitalSigns = await prisma.vitalSigns.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VitalSignsFindUniqueArgs>(args: SelectSubset<T, VitalSignsFindUniqueArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VitalSigns that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VitalSignsFindUniqueOrThrowArgs} args - Arguments to find a VitalSigns
     * @example
     * // Get one VitalSigns
     * const vitalSigns = await prisma.vitalSigns.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VitalSignsFindUniqueOrThrowArgs>(args: SelectSubset<T, VitalSignsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VitalSigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VitalSignsFindFirstArgs} args - Arguments to find a VitalSigns
     * @example
     * // Get one VitalSigns
     * const vitalSigns = await prisma.vitalSigns.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VitalSignsFindFirstArgs>(args?: SelectSubset<T, VitalSignsFindFirstArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VitalSigns that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VitalSignsFindFirstOrThrowArgs} args - Arguments to find a VitalSigns
     * @example
     * // Get one VitalSigns
     * const vitalSigns = await prisma.vitalSigns.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VitalSignsFindFirstOrThrowArgs>(args?: SelectSubset<T, VitalSignsFindFirstOrThrowArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VitalSigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VitalSignsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VitalSigns
     * const vitalSigns = await prisma.vitalSigns.findMany()
     * 
     * // Get first 10 VitalSigns
     * const vitalSigns = await prisma.vitalSigns.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vitalSignsWithIdOnly = await prisma.vitalSigns.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VitalSignsFindManyArgs>(args?: SelectSubset<T, VitalSignsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VitalSigns.
     * @param {VitalSignsCreateArgs} args - Arguments to create a VitalSigns.
     * @example
     * // Create one VitalSigns
     * const VitalSigns = await prisma.vitalSigns.create({
     *   data: {
     *     // ... data to create a VitalSigns
     *   }
     * })
     * 
     */
    create<T extends VitalSignsCreateArgs>(args: SelectSubset<T, VitalSignsCreateArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VitalSigns.
     * @param {VitalSignsCreateManyArgs} args - Arguments to create many VitalSigns.
     * @example
     * // Create many VitalSigns
     * const vitalSigns = await prisma.vitalSigns.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VitalSignsCreateManyArgs>(args?: SelectSubset<T, VitalSignsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VitalSigns and returns the data saved in the database.
     * @param {VitalSignsCreateManyAndReturnArgs} args - Arguments to create many VitalSigns.
     * @example
     * // Create many VitalSigns
     * const vitalSigns = await prisma.vitalSigns.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VitalSigns and only return the `id`
     * const vitalSignsWithIdOnly = await prisma.vitalSigns.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VitalSignsCreateManyAndReturnArgs>(args?: SelectSubset<T, VitalSignsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VitalSigns.
     * @param {VitalSignsDeleteArgs} args - Arguments to delete one VitalSigns.
     * @example
     * // Delete one VitalSigns
     * const VitalSigns = await prisma.vitalSigns.delete({
     *   where: {
     *     // ... filter to delete one VitalSigns
     *   }
     * })
     * 
     */
    delete<T extends VitalSignsDeleteArgs>(args: SelectSubset<T, VitalSignsDeleteArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VitalSigns.
     * @param {VitalSignsUpdateArgs} args - Arguments to update one VitalSigns.
     * @example
     * // Update one VitalSigns
     * const vitalSigns = await prisma.vitalSigns.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VitalSignsUpdateArgs>(args: SelectSubset<T, VitalSignsUpdateArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VitalSigns.
     * @param {VitalSignsDeleteManyArgs} args - Arguments to filter VitalSigns to delete.
     * @example
     * // Delete a few VitalSigns
     * const { count } = await prisma.vitalSigns.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VitalSignsDeleteManyArgs>(args?: SelectSubset<T, VitalSignsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VitalSigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VitalSignsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VitalSigns
     * const vitalSigns = await prisma.vitalSigns.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VitalSignsUpdateManyArgs>(args: SelectSubset<T, VitalSignsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VitalSigns and returns the data updated in the database.
     * @param {VitalSignsUpdateManyAndReturnArgs} args - Arguments to update many VitalSigns.
     * @example
     * // Update many VitalSigns
     * const vitalSigns = await prisma.vitalSigns.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VitalSigns and only return the `id`
     * const vitalSignsWithIdOnly = await prisma.vitalSigns.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VitalSignsUpdateManyAndReturnArgs>(args: SelectSubset<T, VitalSignsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VitalSigns.
     * @param {VitalSignsUpsertArgs} args - Arguments to update or create a VitalSigns.
     * @example
     * // Update or create a VitalSigns
     * const vitalSigns = await prisma.vitalSigns.upsert({
     *   create: {
     *     // ... data to create a VitalSigns
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VitalSigns we want to update
     *   }
     * })
     */
    upsert<T extends VitalSignsUpsertArgs>(args: SelectSubset<T, VitalSignsUpsertArgs<ExtArgs>>): Prisma__VitalSignsClient<$Result.GetResult<Prisma.$VitalSignsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VitalSigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VitalSignsCountArgs} args - Arguments to filter VitalSigns to count.
     * @example
     * // Count the number of VitalSigns
     * const count = await prisma.vitalSigns.count({
     *   where: {
     *     // ... the filter for the VitalSigns we want to count
     *   }
     * })
    **/
    count<T extends VitalSignsCountArgs>(
      args?: Subset<T, VitalSignsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VitalSignsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VitalSigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VitalSignsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VitalSignsAggregateArgs>(args: Subset<T, VitalSignsAggregateArgs>): Prisma.PrismaPromise<GetVitalSignsAggregateType<T>>

    /**
     * Group by VitalSigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VitalSignsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VitalSignsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VitalSignsGroupByArgs['orderBy'] }
        : { orderBy?: VitalSignsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VitalSignsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVitalSignsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VitalSigns model
   */
  readonly fields: VitalSignsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VitalSigns.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VitalSignsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    triage<T extends TriageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TriageDefaultArgs<ExtArgs>>): Prisma__TriageClient<$Result.GetResult<Prisma.$TriagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VitalSigns model
   */
  interface VitalSignsFieldRefs {
    readonly id: FieldRef<"VitalSigns", 'Int'>
    readonly triageId: FieldRef<"VitalSigns", 'Int'>
    readonly temperature: FieldRef<"VitalSigns", 'Float'>
    readonly bloodPressure: FieldRef<"VitalSigns", 'String'>
    readonly heartRate: FieldRef<"VitalSigns", 'Int'>
    readonly respiratoryRate: FieldRef<"VitalSigns", 'Int'>
    readonly oxygenSaturation: FieldRef<"VitalSigns", 'Int'>
    readonly additionalNotes: FieldRef<"VitalSigns", 'String'>
    readonly createdAt: FieldRef<"VitalSigns", 'DateTime'>
    readonly updatedAt: FieldRef<"VitalSigns", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VitalSigns findUnique
   */
  export type VitalSignsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * Filter, which VitalSigns to fetch.
     */
    where: VitalSignsWhereUniqueInput
  }

  /**
   * VitalSigns findUniqueOrThrow
   */
  export type VitalSignsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * Filter, which VitalSigns to fetch.
     */
    where: VitalSignsWhereUniqueInput
  }

  /**
   * VitalSigns findFirst
   */
  export type VitalSignsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * Filter, which VitalSigns to fetch.
     */
    where?: VitalSignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VitalSigns to fetch.
     */
    orderBy?: VitalSignsOrderByWithRelationInput | VitalSignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VitalSigns.
     */
    cursor?: VitalSignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VitalSigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VitalSigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VitalSigns.
     */
    distinct?: VitalSignsScalarFieldEnum | VitalSignsScalarFieldEnum[]
  }

  /**
   * VitalSigns findFirstOrThrow
   */
  export type VitalSignsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * Filter, which VitalSigns to fetch.
     */
    where?: VitalSignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VitalSigns to fetch.
     */
    orderBy?: VitalSignsOrderByWithRelationInput | VitalSignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VitalSigns.
     */
    cursor?: VitalSignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VitalSigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VitalSigns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VitalSigns.
     */
    distinct?: VitalSignsScalarFieldEnum | VitalSignsScalarFieldEnum[]
  }

  /**
   * VitalSigns findMany
   */
  export type VitalSignsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * Filter, which VitalSigns to fetch.
     */
    where?: VitalSignsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VitalSigns to fetch.
     */
    orderBy?: VitalSignsOrderByWithRelationInput | VitalSignsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VitalSigns.
     */
    cursor?: VitalSignsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VitalSigns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VitalSigns.
     */
    skip?: number
    distinct?: VitalSignsScalarFieldEnum | VitalSignsScalarFieldEnum[]
  }

  /**
   * VitalSigns create
   */
  export type VitalSignsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * The data needed to create a VitalSigns.
     */
    data: XOR<VitalSignsCreateInput, VitalSignsUncheckedCreateInput>
  }

  /**
   * VitalSigns createMany
   */
  export type VitalSignsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VitalSigns.
     */
    data: VitalSignsCreateManyInput | VitalSignsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VitalSigns createManyAndReturn
   */
  export type VitalSignsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * The data used to create many VitalSigns.
     */
    data: VitalSignsCreateManyInput | VitalSignsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VitalSigns update
   */
  export type VitalSignsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * The data needed to update a VitalSigns.
     */
    data: XOR<VitalSignsUpdateInput, VitalSignsUncheckedUpdateInput>
    /**
     * Choose, which VitalSigns to update.
     */
    where: VitalSignsWhereUniqueInput
  }

  /**
   * VitalSigns updateMany
   */
  export type VitalSignsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VitalSigns.
     */
    data: XOR<VitalSignsUpdateManyMutationInput, VitalSignsUncheckedUpdateManyInput>
    /**
     * Filter which VitalSigns to update
     */
    where?: VitalSignsWhereInput
    /**
     * Limit how many VitalSigns to update.
     */
    limit?: number
  }

  /**
   * VitalSigns updateManyAndReturn
   */
  export type VitalSignsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * The data used to update VitalSigns.
     */
    data: XOR<VitalSignsUpdateManyMutationInput, VitalSignsUncheckedUpdateManyInput>
    /**
     * Filter which VitalSigns to update
     */
    where?: VitalSignsWhereInput
    /**
     * Limit how many VitalSigns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VitalSigns upsert
   */
  export type VitalSignsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * The filter to search for the VitalSigns to update in case it exists.
     */
    where: VitalSignsWhereUniqueInput
    /**
     * In case the VitalSigns found by the `where` argument doesn't exist, create a new VitalSigns with this data.
     */
    create: XOR<VitalSignsCreateInput, VitalSignsUncheckedCreateInput>
    /**
     * In case the VitalSigns was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VitalSignsUpdateInput, VitalSignsUncheckedUpdateInput>
  }

  /**
   * VitalSigns delete
   */
  export type VitalSignsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
    /**
     * Filter which VitalSigns to delete.
     */
    where: VitalSignsWhereUniqueInput
  }

  /**
   * VitalSigns deleteMany
   */
  export type VitalSignsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VitalSigns to delete
     */
    where?: VitalSignsWhereInput
    /**
     * Limit how many VitalSigns to delete.
     */
    limit?: number
  }

  /**
   * VitalSigns without action
   */
  export type VitalSignsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VitalSigns
     */
    select?: VitalSignsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VitalSigns
     */
    omit?: VitalSignsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VitalSignsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TriageScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    nurseId: 'nurseId',
    isActive: 'isActive',
    urgencyLevel: 'urgencyLevel',
    initialObservations: 'initialObservations',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TriageScalarFieldEnum = (typeof TriageScalarFieldEnum)[keyof typeof TriageScalarFieldEnum]


  export const VitalSignsScalarFieldEnum: {
    id: 'id',
    triageId: 'triageId',
    temperature: 'temperature',
    bloodPressure: 'bloodPressure',
    heartRate: 'heartRate',
    respiratoryRate: 'respiratoryRate',
    oxygenSaturation: 'oxygenSaturation',
    additionalNotes: 'additionalNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VitalSignsScalarFieldEnum = (typeof VitalSignsScalarFieldEnum)[keyof typeof VitalSignsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TriageWhereInput = {
    AND?: TriageWhereInput | TriageWhereInput[]
    OR?: TriageWhereInput[]
    NOT?: TriageWhereInput | TriageWhereInput[]
    id?: IntFilter<"Triage"> | number
    patientId?: IntFilter<"Triage"> | number
    nurseId?: IntFilter<"Triage"> | number
    isActive?: BoolFilter<"Triage"> | boolean
    urgencyLevel?: IntFilter<"Triage"> | number
    initialObservations?: StringFilter<"Triage"> | string
    createdAt?: DateTimeFilter<"Triage"> | Date | string
    updatedAt?: DateTimeFilter<"Triage"> | Date | string
    vitalSigns?: VitalSignsListRelationFilter
  }

  export type TriageOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    isActive?: SortOrder
    urgencyLevel?: SortOrder
    initialObservations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vitalSigns?: VitalSignsOrderByRelationAggregateInput
  }

  export type TriageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TriageWhereInput | TriageWhereInput[]
    OR?: TriageWhereInput[]
    NOT?: TriageWhereInput | TriageWhereInput[]
    patientId?: IntFilter<"Triage"> | number
    nurseId?: IntFilter<"Triage"> | number
    isActive?: BoolFilter<"Triage"> | boolean
    urgencyLevel?: IntFilter<"Triage"> | number
    initialObservations?: StringFilter<"Triage"> | string
    createdAt?: DateTimeFilter<"Triage"> | Date | string
    updatedAt?: DateTimeFilter<"Triage"> | Date | string
    vitalSigns?: VitalSignsListRelationFilter
  }, "id">

  export type TriageOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    isActive?: SortOrder
    urgencyLevel?: SortOrder
    initialObservations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TriageCountOrderByAggregateInput
    _avg?: TriageAvgOrderByAggregateInput
    _max?: TriageMaxOrderByAggregateInput
    _min?: TriageMinOrderByAggregateInput
    _sum?: TriageSumOrderByAggregateInput
  }

  export type TriageScalarWhereWithAggregatesInput = {
    AND?: TriageScalarWhereWithAggregatesInput | TriageScalarWhereWithAggregatesInput[]
    OR?: TriageScalarWhereWithAggregatesInput[]
    NOT?: TriageScalarWhereWithAggregatesInput | TriageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Triage"> | number
    patientId?: IntWithAggregatesFilter<"Triage"> | number
    nurseId?: IntWithAggregatesFilter<"Triage"> | number
    isActive?: BoolWithAggregatesFilter<"Triage"> | boolean
    urgencyLevel?: IntWithAggregatesFilter<"Triage"> | number
    initialObservations?: StringWithAggregatesFilter<"Triage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Triage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Triage"> | Date | string
  }

  export type VitalSignsWhereInput = {
    AND?: VitalSignsWhereInput | VitalSignsWhereInput[]
    OR?: VitalSignsWhereInput[]
    NOT?: VitalSignsWhereInput | VitalSignsWhereInput[]
    id?: IntFilter<"VitalSigns"> | number
    triageId?: IntFilter<"VitalSigns"> | number
    temperature?: FloatFilter<"VitalSigns"> | number
    bloodPressure?: StringFilter<"VitalSigns"> | string
    heartRate?: IntFilter<"VitalSigns"> | number
    respiratoryRate?: IntFilter<"VitalSigns"> | number
    oxygenSaturation?: IntFilter<"VitalSigns"> | number
    additionalNotes?: StringNullableFilter<"VitalSigns"> | string | null
    createdAt?: DateTimeFilter<"VitalSigns"> | Date | string
    updatedAt?: DateTimeFilter<"VitalSigns"> | Date | string
    triage?: XOR<TriageScalarRelationFilter, TriageWhereInput>
  }

  export type VitalSignsOrderByWithRelationInput = {
    id?: SortOrder
    triageId?: SortOrder
    temperature?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    additionalNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    triage?: TriageOrderByWithRelationInput
  }

  export type VitalSignsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VitalSignsWhereInput | VitalSignsWhereInput[]
    OR?: VitalSignsWhereInput[]
    NOT?: VitalSignsWhereInput | VitalSignsWhereInput[]
    triageId?: IntFilter<"VitalSigns"> | number
    temperature?: FloatFilter<"VitalSigns"> | number
    bloodPressure?: StringFilter<"VitalSigns"> | string
    heartRate?: IntFilter<"VitalSigns"> | number
    respiratoryRate?: IntFilter<"VitalSigns"> | number
    oxygenSaturation?: IntFilter<"VitalSigns"> | number
    additionalNotes?: StringNullableFilter<"VitalSigns"> | string | null
    createdAt?: DateTimeFilter<"VitalSigns"> | Date | string
    updatedAt?: DateTimeFilter<"VitalSigns"> | Date | string
    triage?: XOR<TriageScalarRelationFilter, TriageWhereInput>
  }, "id">

  export type VitalSignsOrderByWithAggregationInput = {
    id?: SortOrder
    triageId?: SortOrder
    temperature?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    additionalNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VitalSignsCountOrderByAggregateInput
    _avg?: VitalSignsAvgOrderByAggregateInput
    _max?: VitalSignsMaxOrderByAggregateInput
    _min?: VitalSignsMinOrderByAggregateInput
    _sum?: VitalSignsSumOrderByAggregateInput
  }

  export type VitalSignsScalarWhereWithAggregatesInput = {
    AND?: VitalSignsScalarWhereWithAggregatesInput | VitalSignsScalarWhereWithAggregatesInput[]
    OR?: VitalSignsScalarWhereWithAggregatesInput[]
    NOT?: VitalSignsScalarWhereWithAggregatesInput | VitalSignsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VitalSigns"> | number
    triageId?: IntWithAggregatesFilter<"VitalSigns"> | number
    temperature?: FloatWithAggregatesFilter<"VitalSigns"> | number
    bloodPressure?: StringWithAggregatesFilter<"VitalSigns"> | string
    heartRate?: IntWithAggregatesFilter<"VitalSigns"> | number
    respiratoryRate?: IntWithAggregatesFilter<"VitalSigns"> | number
    oxygenSaturation?: IntWithAggregatesFilter<"VitalSigns"> | number
    additionalNotes?: StringNullableWithAggregatesFilter<"VitalSigns"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"VitalSigns"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VitalSigns"> | Date | string
  }

  export type TriageCreateInput = {
    patientId: number
    nurseId: number
    isActive?: boolean
    urgencyLevel: number
    initialObservations: string
    createdAt?: Date | string
    updatedAt?: Date | string
    vitalSigns?: VitalSignsCreateNestedManyWithoutTriageInput
  }

  export type TriageUncheckedCreateInput = {
    id?: number
    patientId: number
    nurseId: number
    isActive?: boolean
    urgencyLevel: number
    initialObservations: string
    createdAt?: Date | string
    updatedAt?: Date | string
    vitalSigns?: VitalSignsUncheckedCreateNestedManyWithoutTriageInput
  }

  export type TriageUpdateInput = {
    patientId?: IntFieldUpdateOperationsInput | number
    nurseId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    urgencyLevel?: IntFieldUpdateOperationsInput | number
    initialObservations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitalSigns?: VitalSignsUpdateManyWithoutTriageNestedInput
  }

  export type TriageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    nurseId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    urgencyLevel?: IntFieldUpdateOperationsInput | number
    initialObservations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitalSigns?: VitalSignsUncheckedUpdateManyWithoutTriageNestedInput
  }

  export type TriageCreateManyInput = {
    id?: number
    patientId: number
    nurseId: number
    isActive?: boolean
    urgencyLevel: number
    initialObservations: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageUpdateManyMutationInput = {
    patientId?: IntFieldUpdateOperationsInput | number
    nurseId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    urgencyLevel?: IntFieldUpdateOperationsInput | number
    initialObservations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    nurseId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    urgencyLevel?: IntFieldUpdateOperationsInput | number
    initialObservations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VitalSignsCreateInput = {
    temperature: number
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    triage: TriageCreateNestedOneWithoutVitalSignsInput
  }

  export type VitalSignsUncheckedCreateInput = {
    id?: number
    triageId: number
    temperature: number
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VitalSignsUpdateInput = {
    temperature?: FloatFieldUpdateOperationsInput | number
    bloodPressure?: StringFieldUpdateOperationsInput | string
    heartRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: IntFieldUpdateOperationsInput | number
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    triage?: TriageUpdateOneRequiredWithoutVitalSignsNestedInput
  }

  export type VitalSignsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    triageId?: IntFieldUpdateOperationsInput | number
    temperature?: FloatFieldUpdateOperationsInput | number
    bloodPressure?: StringFieldUpdateOperationsInput | string
    heartRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: IntFieldUpdateOperationsInput | number
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VitalSignsCreateManyInput = {
    id?: number
    triageId: number
    temperature: number
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VitalSignsUpdateManyMutationInput = {
    temperature?: FloatFieldUpdateOperationsInput | number
    bloodPressure?: StringFieldUpdateOperationsInput | string
    heartRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: IntFieldUpdateOperationsInput | number
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VitalSignsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    triageId?: IntFieldUpdateOperationsInput | number
    temperature?: FloatFieldUpdateOperationsInput | number
    bloodPressure?: StringFieldUpdateOperationsInput | string
    heartRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: IntFieldUpdateOperationsInput | number
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VitalSignsListRelationFilter = {
    every?: VitalSignsWhereInput
    some?: VitalSignsWhereInput
    none?: VitalSignsWhereInput
  }

  export type VitalSignsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TriageCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    isActive?: SortOrder
    urgencyLevel?: SortOrder
    initialObservations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TriageAvgOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    urgencyLevel?: SortOrder
  }

  export type TriageMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    isActive?: SortOrder
    urgencyLevel?: SortOrder
    initialObservations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TriageMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    isActive?: SortOrder
    urgencyLevel?: SortOrder
    initialObservations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TriageSumOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    nurseId?: SortOrder
    urgencyLevel?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type TriageScalarRelationFilter = {
    is?: TriageWhereInput
    isNot?: TriageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VitalSignsCountOrderByAggregateInput = {
    id?: SortOrder
    triageId?: SortOrder
    temperature?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    additionalNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VitalSignsAvgOrderByAggregateInput = {
    id?: SortOrder
    triageId?: SortOrder
    temperature?: SortOrder
    heartRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
  }

  export type VitalSignsMaxOrderByAggregateInput = {
    id?: SortOrder
    triageId?: SortOrder
    temperature?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    additionalNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VitalSignsMinOrderByAggregateInput = {
    id?: SortOrder
    triageId?: SortOrder
    temperature?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    additionalNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VitalSignsSumOrderByAggregateInput = {
    id?: SortOrder
    triageId?: SortOrder
    temperature?: SortOrder
    heartRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type VitalSignsCreateNestedManyWithoutTriageInput = {
    create?: XOR<VitalSignsCreateWithoutTriageInput, VitalSignsUncheckedCreateWithoutTriageInput> | VitalSignsCreateWithoutTriageInput[] | VitalSignsUncheckedCreateWithoutTriageInput[]
    connectOrCreate?: VitalSignsCreateOrConnectWithoutTriageInput | VitalSignsCreateOrConnectWithoutTriageInput[]
    createMany?: VitalSignsCreateManyTriageInputEnvelope
    connect?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
  }

  export type VitalSignsUncheckedCreateNestedManyWithoutTriageInput = {
    create?: XOR<VitalSignsCreateWithoutTriageInput, VitalSignsUncheckedCreateWithoutTriageInput> | VitalSignsCreateWithoutTriageInput[] | VitalSignsUncheckedCreateWithoutTriageInput[]
    connectOrCreate?: VitalSignsCreateOrConnectWithoutTriageInput | VitalSignsCreateOrConnectWithoutTriageInput[]
    createMany?: VitalSignsCreateManyTriageInputEnvelope
    connect?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VitalSignsUpdateManyWithoutTriageNestedInput = {
    create?: XOR<VitalSignsCreateWithoutTriageInput, VitalSignsUncheckedCreateWithoutTriageInput> | VitalSignsCreateWithoutTriageInput[] | VitalSignsUncheckedCreateWithoutTriageInput[]
    connectOrCreate?: VitalSignsCreateOrConnectWithoutTriageInput | VitalSignsCreateOrConnectWithoutTriageInput[]
    upsert?: VitalSignsUpsertWithWhereUniqueWithoutTriageInput | VitalSignsUpsertWithWhereUniqueWithoutTriageInput[]
    createMany?: VitalSignsCreateManyTriageInputEnvelope
    set?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    disconnect?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    delete?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    connect?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    update?: VitalSignsUpdateWithWhereUniqueWithoutTriageInput | VitalSignsUpdateWithWhereUniqueWithoutTriageInput[]
    updateMany?: VitalSignsUpdateManyWithWhereWithoutTriageInput | VitalSignsUpdateManyWithWhereWithoutTriageInput[]
    deleteMany?: VitalSignsScalarWhereInput | VitalSignsScalarWhereInput[]
  }

  export type VitalSignsUncheckedUpdateManyWithoutTriageNestedInput = {
    create?: XOR<VitalSignsCreateWithoutTriageInput, VitalSignsUncheckedCreateWithoutTriageInput> | VitalSignsCreateWithoutTriageInput[] | VitalSignsUncheckedCreateWithoutTriageInput[]
    connectOrCreate?: VitalSignsCreateOrConnectWithoutTriageInput | VitalSignsCreateOrConnectWithoutTriageInput[]
    upsert?: VitalSignsUpsertWithWhereUniqueWithoutTriageInput | VitalSignsUpsertWithWhereUniqueWithoutTriageInput[]
    createMany?: VitalSignsCreateManyTriageInputEnvelope
    set?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    disconnect?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    delete?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    connect?: VitalSignsWhereUniqueInput | VitalSignsWhereUniqueInput[]
    update?: VitalSignsUpdateWithWhereUniqueWithoutTriageInput | VitalSignsUpdateWithWhereUniqueWithoutTriageInput[]
    updateMany?: VitalSignsUpdateManyWithWhereWithoutTriageInput | VitalSignsUpdateManyWithWhereWithoutTriageInput[]
    deleteMany?: VitalSignsScalarWhereInput | VitalSignsScalarWhereInput[]
  }

  export type TriageCreateNestedOneWithoutVitalSignsInput = {
    create?: XOR<TriageCreateWithoutVitalSignsInput, TriageUncheckedCreateWithoutVitalSignsInput>
    connectOrCreate?: TriageCreateOrConnectWithoutVitalSignsInput
    connect?: TriageWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type TriageUpdateOneRequiredWithoutVitalSignsNestedInput = {
    create?: XOR<TriageCreateWithoutVitalSignsInput, TriageUncheckedCreateWithoutVitalSignsInput>
    connectOrCreate?: TriageCreateOrConnectWithoutVitalSignsInput
    upsert?: TriageUpsertWithoutVitalSignsInput
    connect?: TriageWhereUniqueInput
    update?: XOR<XOR<TriageUpdateToOneWithWhereWithoutVitalSignsInput, TriageUpdateWithoutVitalSignsInput>, TriageUncheckedUpdateWithoutVitalSignsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type VitalSignsCreateWithoutTriageInput = {
    temperature: number
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VitalSignsUncheckedCreateWithoutTriageInput = {
    id?: number
    temperature: number
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VitalSignsCreateOrConnectWithoutTriageInput = {
    where: VitalSignsWhereUniqueInput
    create: XOR<VitalSignsCreateWithoutTriageInput, VitalSignsUncheckedCreateWithoutTriageInput>
  }

  export type VitalSignsCreateManyTriageInputEnvelope = {
    data: VitalSignsCreateManyTriageInput | VitalSignsCreateManyTriageInput[]
    skipDuplicates?: boolean
  }

  export type VitalSignsUpsertWithWhereUniqueWithoutTriageInput = {
    where: VitalSignsWhereUniqueInput
    update: XOR<VitalSignsUpdateWithoutTriageInput, VitalSignsUncheckedUpdateWithoutTriageInput>
    create: XOR<VitalSignsCreateWithoutTriageInput, VitalSignsUncheckedCreateWithoutTriageInput>
  }

  export type VitalSignsUpdateWithWhereUniqueWithoutTriageInput = {
    where: VitalSignsWhereUniqueInput
    data: XOR<VitalSignsUpdateWithoutTriageInput, VitalSignsUncheckedUpdateWithoutTriageInput>
  }

  export type VitalSignsUpdateManyWithWhereWithoutTriageInput = {
    where: VitalSignsScalarWhereInput
    data: XOR<VitalSignsUpdateManyMutationInput, VitalSignsUncheckedUpdateManyWithoutTriageInput>
  }

  export type VitalSignsScalarWhereInput = {
    AND?: VitalSignsScalarWhereInput | VitalSignsScalarWhereInput[]
    OR?: VitalSignsScalarWhereInput[]
    NOT?: VitalSignsScalarWhereInput | VitalSignsScalarWhereInput[]
    id?: IntFilter<"VitalSigns"> | number
    triageId?: IntFilter<"VitalSigns"> | number
    temperature?: FloatFilter<"VitalSigns"> | number
    bloodPressure?: StringFilter<"VitalSigns"> | string
    heartRate?: IntFilter<"VitalSigns"> | number
    respiratoryRate?: IntFilter<"VitalSigns"> | number
    oxygenSaturation?: IntFilter<"VitalSigns"> | number
    additionalNotes?: StringNullableFilter<"VitalSigns"> | string | null
    createdAt?: DateTimeFilter<"VitalSigns"> | Date | string
    updatedAt?: DateTimeFilter<"VitalSigns"> | Date | string
  }

  export type TriageCreateWithoutVitalSignsInput = {
    patientId: number
    nurseId: number
    isActive?: boolean
    urgencyLevel: number
    initialObservations: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageUncheckedCreateWithoutVitalSignsInput = {
    id?: number
    patientId: number
    nurseId: number
    isActive?: boolean
    urgencyLevel: number
    initialObservations: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TriageCreateOrConnectWithoutVitalSignsInput = {
    where: TriageWhereUniqueInput
    create: XOR<TriageCreateWithoutVitalSignsInput, TriageUncheckedCreateWithoutVitalSignsInput>
  }

  export type TriageUpsertWithoutVitalSignsInput = {
    update: XOR<TriageUpdateWithoutVitalSignsInput, TriageUncheckedUpdateWithoutVitalSignsInput>
    create: XOR<TriageCreateWithoutVitalSignsInput, TriageUncheckedCreateWithoutVitalSignsInput>
    where?: TriageWhereInput
  }

  export type TriageUpdateToOneWithWhereWithoutVitalSignsInput = {
    where?: TriageWhereInput
    data: XOR<TriageUpdateWithoutVitalSignsInput, TriageUncheckedUpdateWithoutVitalSignsInput>
  }

  export type TriageUpdateWithoutVitalSignsInput = {
    patientId?: IntFieldUpdateOperationsInput | number
    nurseId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    urgencyLevel?: IntFieldUpdateOperationsInput | number
    initialObservations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TriageUncheckedUpdateWithoutVitalSignsInput = {
    id?: IntFieldUpdateOperationsInput | number
    patientId?: IntFieldUpdateOperationsInput | number
    nurseId?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    urgencyLevel?: IntFieldUpdateOperationsInput | number
    initialObservations?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VitalSignsCreateManyTriageInput = {
    id?: number
    temperature: number
    bloodPressure: string
    heartRate: number
    respiratoryRate: number
    oxygenSaturation: number
    additionalNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VitalSignsUpdateWithoutTriageInput = {
    temperature?: FloatFieldUpdateOperationsInput | number
    bloodPressure?: StringFieldUpdateOperationsInput | string
    heartRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: IntFieldUpdateOperationsInput | number
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VitalSignsUncheckedUpdateWithoutTriageInput = {
    id?: IntFieldUpdateOperationsInput | number
    temperature?: FloatFieldUpdateOperationsInput | number
    bloodPressure?: StringFieldUpdateOperationsInput | string
    heartRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: IntFieldUpdateOperationsInput | number
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VitalSignsUncheckedUpdateManyWithoutTriageInput = {
    id?: IntFieldUpdateOperationsInput | number
    temperature?: FloatFieldUpdateOperationsInput | number
    bloodPressure?: StringFieldUpdateOperationsInput | string
    heartRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: IntFieldUpdateOperationsInput | number
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}